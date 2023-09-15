import { useState, useEffect } from "react";

import { Okr } from "./Okr";
import { CreateModal } from "./CreateModal";
import { FilteringModal } from "./FilteringModal";

import * as okrService from "../services/okrService";

export function OkrsPage() {
  const [showCreateOkrModal, setShowCreateOkrModal] = useState(false);
  const [showFilteringModal, setShowFilteringModal] = useState(false);
  const [renderOkrs, setRenderOkrs] = useState([]);
  const [filterFor, setFilterFor] = useState([]);

  let renderOkrsArray = [];

  const retrieveFilterData = (data) => {
    setFilterFor(data);
  };

  useEffect(() => {
    okrService.getAll().then((allOkrs) => {
      for (const okr of allOkrs) {
        if (filterFor.length === 0) {
          renderOkrsArray.push(okr);
        } else {
          for (const okrOwner of okr.okrOwners) {
            if (filterFor.includes(okrOwner.okrOwnerId)) {
              renderOkrsArray.push(okr);
            }
          }
        }
      }
      setRenderOkrs([...new Set(renderOkrsArray)]);
    });
    // eslint-disable-next-line
  }, [filterFor, showCreateOkrModal]);

  return (
    <main id="main" className="main-content">
      <section className="home">
        <header className="section-header home-header">
          <div className="okrs-page-filter-btn-ctr">
            <h2>OKRs</h2>
            <button
              onClick={() => setShowFilteringModal(true)}
              className="okrs-page-filter-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                />
              </svg>
              <p>Filter</p>
            </button>
            <FilteringModal
              onClose={() => setShowFilteringModal(false)}
              retrieveData={retrieveFilterData}
              show={showFilteringModal}
            ></FilteringModal>
          </div>
          <div className="section-header-buttons-ctr">
            <div>
              <button
                className="create-button"
                onClick={() => setShowCreateOkrModal(true)}
              >
                Create OKR
              </button>
              <CreateModal
                type="okr"
                onClose={() => setShowCreateOkrModal(false)}
                show={showCreateOkrModal}
              />
            </div>
            <hr className="buttons-ctr-linebreak" />
            <div className="input-search-ctr">
              <input id="input-search" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
            </div>
          </div>
        </header>
        <section className="home-myokrs">
          <div className="myokrs-ctr">
            <ul className="myokrs-grid-content">
              <li
                style={{ gridAutoColumns: "1fr 1fr 1fr" }}
                id="okrs-list-li-header"
                className="myokrs-header"
              >
                <div className="okrs-page-table-titles-ctr">
                  <span>Title</span>
                </div>
                <div className="okrs-page-table-titles-ctr">
                  <span>Owners</span>
                </div>
                <div className="">
                  <span>Description</span>
                </div>
                {/* <div>
                  <span>OKR State</span>
                </div> */}
              </li>
              {renderOkrs.length > 0 ? (
                renderOkrs.map((okr) => (
                  <Okr key={okr._id} currentOkr={okr} page={"okrsPage"} />
                ))
              ) : (
                <li id="myokrs-no-content">
                  <button
                    onClick={() => setShowCreateOkrModal(true)}
                    className="create-button"
                  >
                    Create OKR
                  </button>
                  <h3>Get inspiration from OKR templates</h3>
                  <h3>Brainstorm your organization's vision and discuss it.</h3>
                </li>
              )}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
