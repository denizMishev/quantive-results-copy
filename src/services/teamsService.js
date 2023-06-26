import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/teams";

export const create = (teamData) => request.post(baseUrl, teamData);

export const getAll = () => request.get(baseUrl);

export const getOne = (teamId) => request.get(`${baseUrl}/${teamId}`);
