import * as okrService from "../services/okrService";

export function deletedOwnerOkrCleaner(deletedOwnerId) {
  okrService.getAll().then((allOkrs) => {
    for (const okr of allOkrs) {
      for (const okrOwner of okr.okrOwners) {
        if (okrOwner.okrOwnerId === deletedOwnerId) {
          let indexOfDeletedOwner = okr.okrOwners.indexOf(okrOwner);
          okr.okrOwners.splice(indexOfDeletedOwner, 1, {
            okrOwner: "Deleted team",
            okrOwnerId: "deleted-team",
            type: "deleted-team",
          });
          okrService.update(okr._id, {
            okrOwners: okr.okrOwners,
          });
        }
      }
    }
  });
  // eslint-disable-next-line
}
