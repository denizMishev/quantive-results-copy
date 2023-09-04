import * as request from "./requester";

const baseUrl = "http://localhost:3030/data/comments";

export const getAll = () => request.get(baseUrl);

export const create = (okrId, comment) =>
  request.post(baseUrl, { okrId, text: comment });

export const remove = (commentId) => request.del(`${baseUrl}/${commentId}`);

export const getOne = (commentId) => request.get(`${baseUrl}/${commentId}`);

export const updateComment = (commentId, okrId, text) =>
  request.put(`${baseUrl}/${commentId}`, { okrId, text });

export const getByOkrId = (okrId) => {
  const relations = encodeURIComponent(`user=_ownerId:users`);
  const search = encodeURIComponent(`okrId="${okrId}"`);

  return request.get(`${baseUrl}?where=${search}&load=${relations}`);
};
