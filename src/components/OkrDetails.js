import { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { OkrContext } from "../contexts/OkrContext";

export function OkrDetails() {
    
    const { okrId } = useParams();
    const { selectOkr } = useContext(OkrContext);

    const okr = selectOkr(okrId);
    
    return (
        <div id="details-modal" action="">
            <div>OKR Title</div>
            <input type="text" defaultValue={okr.okrTitle} />
            <div>Owner</div>
            <input type="text" defaultValue={okr.okrOwners.join(', ')} />
            <Link to={`/okrs/${okrId}/edit`}>Edit OKR</Link>
        </div>
    );
};