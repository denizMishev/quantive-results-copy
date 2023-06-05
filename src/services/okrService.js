import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/okrs';

export const getAll = () => request.get(baseUrl);

export const create = (okrData) => request.post(baseUrl, okrData);