export function TeamDetails() {
  return (
    <>
      <div id="teams-modal">
        <div id="teams-modal-titles">
          <label id="teams-modal-teamName" htmlFor="teams-modal-teamName">
            Team Name
          </label>
          <label id="teams-modal-teamManager" htmlFor="teams-modal-teamManager">
            Team Manager
          </label>
        </div>
        <div id="teams-modal-members">
          <label htmlFor="teams-modal-teamMember"></label>
          <ul id="teams-modal-membersList">
            <li>member1</li>
            <li>member1</li>
            <li>member1</li>
          </ul>
        </div>
      </div>
    </>
  );
}
