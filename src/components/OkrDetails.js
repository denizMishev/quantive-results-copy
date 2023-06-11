import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import * as okrService from '../services/okrService';

export function OkrDetails() {

    const [okr, setOkr] = useState({});
    const okrObj = useParams();
    const okrId = okrObj.okrId

    okrService.getOne(okrId)
        .then(okr => {
            setOkr(okr)
        })

    return (
        <div id="details-modal" action="">
            <div>OKR Title</div>
            <input type="text" defaultValue={okr.okrTitle} />
            <div>Owner</div>
            <input type="text" defaultValue="owner here" />
            <Link to={`/okrs/${okrId}/edit`}>Edit OKR</Link>
        </div>
    );
};