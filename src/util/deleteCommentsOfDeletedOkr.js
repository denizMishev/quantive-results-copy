import * as commentService from "../services/commentService";

export function deleteCommentsOfDeletedOkr(deletedOkrId) {
  commentService.getAll().then((allComments) => {
    for (const comment of allComments) {
      if (comment.okrId === deletedOkrId) {
        commentService.remove(comment._id);
      }
    }
  });
}
