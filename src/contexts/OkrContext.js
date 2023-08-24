import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as okrService from "../services/okrService";
import { okrStateManagementCommands } from "../util/okrReducerCommands";

export const OkrContext = createContext();

const okrReducer = (state, action) => {
  switch (action.type) {
    case okrStateManagementCommands.getAll:
      return [...action.payload];
    case okrStateManagementCommands.add:
      return [...state, action.payload];
    case okrStateManagementCommands.edit:
      return state.map((x) => (x._id === action.okrId ? action.payload : x));
    case okrStateManagementCommands.remove:
      return state.filter((x) => x._id !== action.okrId);
    default:
      return state;
  }
};

export function OkrProvider({ children }) {
  const navigate = useNavigate();
  const [okrs, dispatch] = useReducer(okrReducer, []);

  useEffect(() => {
    okrService.getAll().then((result) => {
      if (result.code === 404) {
        return;
      } else {
        const action = {
          type: okrStateManagementCommands.getAll,
          payload: result,
        };

        dispatch(action);
      }
    });
  }, []);

  const selectOkr = (okrId) => {
    return okrs.find((x) => x._id === okrId) || {};
  };

  const okrAdd = (okrData) => {
    dispatch({
      type: okrStateManagementCommands.add,
      payload: okrData,
    });
  };

  const okrEdit = (okrId, okrData) => {
    dispatch({
      type: okrStateManagementCommands.edit,
      payload: okrData,
      okrId,
    });
  };

  const okrRemove = (okrId) => {
    dispatch({
      type: okrStateManagementCommands.remove,
      okrId,
    });
  };

  return (
    <OkrContext.Provider
      value={{
        okrs,
        okrAdd,
        okrEdit,
        selectOkr,
        okrRemove,
      }}
    >
      {children}
    </OkrContext.Provider>
  );
}
