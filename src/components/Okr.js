export function Okr({ okr }) {
    return (
        <div class="okr-card">
            <div class="okr-header">
                <p>{okr.okrTitle}</p>
            </div>
            <div class="okr-container">
                <p>Some random texts</p>
                <button>click here</button>
            </div>
        </div>
    );
};