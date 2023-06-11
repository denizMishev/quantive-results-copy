import { Link } from 'react-router-dom';

export function Okr({ okr }) {
    return (
        <div className="okr-card">
            <div className="okr-header">
                <p>{okr.okrTitle}</p>
            </div>
            <div className="okr-container">
                <p>Some random texts</p>
                <Link to={`/okrs/${okr._id}`}>Details</Link>
            </div>
        </div>
    );
};