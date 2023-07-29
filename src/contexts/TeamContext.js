import { createContext, useEffect, useReducer } from "react";

import * as teamsService from "../services/teamsService";
import { teamStateManagementCommands } from "../util/teamReducerCommands";

export const TeamContext = createContext();

const teamReducer = (state, action) => {
  switch (action.type) {
    case teamStateManagementCommands.getAll:
      return [...action.payload];
    case teamStateManagementCommands.add:
      return [...state, action.payload];
    case teamStateManagementCommands.remove:
      return state.filter((x) => x._id !== action.teamId);
    case teamStateManagementCommands.edit:
      return state.map((x) => (x._id === action.teamId ? action.payload : x));
    default:
      return state;
  }
};

export function TeamProvider({ children }) {
  const [teams, dispatch] = useReducer(teamReducer, []);

  useEffect(() => {
    teamsService.getAll().then((result) => {
      if (result.code === 404) {
        return;
      } else {
        const action = {
          type: teamStateManagementCommands.getAll,
          payload: result,
        };

        dispatch(action);
      }
    });
  }, []);

  const selectTeam = (teamId) => {
    return teams.find((x) => x._id === teamId) || {};
  };

  const teamAdd = (teamData) => {
    dispatch({
      type: teamStateManagementCommands.add,
      payload: teamData,
    });
  };

  const teamEdit = (teamId, teamData) => {
    dispatch({
      type: teamStateManagementCommands.edit,
      payload: teamData,
      teamId,
    });
  };

  const teamRemove = (teamId) => {
    dispatch({
      type: teamStateManagementCommands.remove,
      teamId,
    });
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        selectTeam,
        teamAdd,
        teamRemove,
        teamEdit,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
