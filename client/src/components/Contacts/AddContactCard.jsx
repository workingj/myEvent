import React from "react";
import plus from "../../assets/plus.svg";

export default function AddContactCard({ handleAdd }) {
  return (
    <div name="ContactCard" className="ContactCard">
      <div className="vCenter">
        <button className="addContactBtn" onClick={handleAdd}>
          <img src={plus}/>
        </button>
      </div>
    </div>
  );
}
