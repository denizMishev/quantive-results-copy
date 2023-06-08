import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as okrService from '../services/okrService';
import { OkrContext } from "../contexts/OkrContext";

export function EditOkr() {

    const [currentOkr, setCurrentOkr] = useState({});
    const { okrEdit } = useContext(OkrContext);
    const { okrId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        okrService.getOne(okrId)
            .then(okrData => {
                setCurrentOkr(okrData);
            })
            // eslint-disable-next-line
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const okrData = Object.fromEntries(new FormData(e.target));

        okrService.edit(okrId, okrData)
            .then(result => {
                okrEdit(okrId, result);
                navigate(`/`);
            });
    };

    return (
        <section>
            <form id="createForm" onSubmit={onSubmit}>
                <div>
                    <h1>Edit OKR</h1>
                </div>
                <div>
                    <i class="fa-solid fa-pencil"></i>
                    <label htmlFor="okrTitle">Edit OKR Title</label>
                    <input name="okrTitle" type="okrTitle" defaultValue={currentOkr.okrTitle} />
                </div>
                <div>
                    <button class="createBtn">Press Enter to submit editing</button>
                </div>
            </form>
        </section>
    );
};