import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/okrs";

export const getAll = () => request.get(baseUrl);

export const create = (okrData) => request.post(baseUrl, okrData);

export const edit = (okrId, okrData) =>
  request.put(`${baseUrl}/${okrId}`, okrData);

export const getOne = (okrId) => request.get(`${baseUrl}/${okrId}`);
