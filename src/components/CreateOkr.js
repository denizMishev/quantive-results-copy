export function CreateGame() {
    return (
        <section>
            <form id="createForm">
                <div>
                    <h1>Create OKR</h1>
                </div>
                <div>
                    <i class="fa-solid fa-plus"></i>
                    <label htmlFor="okrTitle">OKR Title</label>
                    <input name="okrTitle" type="okrTitle" placeholder="Enter your OKR Title here" />
                </div>
                <div>
                    <button class="createBtn">Press Enter to submit</button>
                </div>
            </form>
        </section>
    )
}