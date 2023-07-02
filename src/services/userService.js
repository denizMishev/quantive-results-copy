import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/okrUsers";

export const addNewUser = (email, username) =>
  request.post(`${baseUrl}`, { email, username, okrs: [] });

export const getAllUsers = () => request.get(baseUrl);

export const getOne = (employeeId) => request.get(`${baseUrl}/${employeeId}`);
