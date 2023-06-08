import { Link } from 'react-router-dom';

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
            <Link to={`/okrs/${okr._id}/edit`}>Edit OKR</Link>
        </div>
    );
};