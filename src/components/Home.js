import { useContext } from "react";

import { Okr } from "./Okr";

import { OkrContext } from "../contexts/OkrContext";

export function Home() {

    const { okrs } = useContext(OkrContext);

    return (
        <section id="homeSection">
            <div id="homePage">
                {okrs.length > 0 ? okrs.map(x => <Okr key={x._id} okr={x} />) : <span>You don't have any OKRs assigned to you yet.</span>}
            </div>
        </section>
    );

};