import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/teams";

export const create = (teamData) => request.post(baseUrl, teamData);

export const edit = (teamId, teamData) =>
  request.put(`${baseUrl}/${teamId}`, teamData);

export const getAll = () => request.get(baseUrl);

export const getOne = (teamId) => request.get(`${baseUrl}/${teamId}`);

export const remove = (teamId) => request.del(`${baseUrl}/${teamId}`);
