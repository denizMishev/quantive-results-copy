import { useContext } from "react";

import { OkrContext } from "../contexts/OkrContext";
import * as okrService from '../services/okrService';

export function CreateGame() {

    const { okrAdd } = useContext(OkrContext);
    
    const onSubmit = (e) => {
        e.preventDefault();

        const okrData = Object.fromEntries(new FormData(e.target));
        console.log(okrData)

        okrService.create(okrData)
            .then(result => {
                okrAdd(result)
            });
    };

    return (
        <section>
            <form id="createForm" onSubmit={onSubmit}>
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
    );
};