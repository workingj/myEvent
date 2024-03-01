import React from "react";

export default function AddContactCard({ addHandler }) {
  return (
    <div name="ContactCard" className="ContactCard">
      <div className="vCenter">
        <button className="addContactBtn" onClick={addHandler}>
          <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <path
              id="lineAB"
              // d="M 10 35 l 15 -30"
              d="M 40 40 h 0 -30 q -10 10 0 20 h 30 0 v 0 30 q 10 10 20 0 v -30 0 h 30 0 q 10 -10 0 -20 h -30 0 v 0 -30 q -10 -10 -20 0 v 0 30"
              stroke="#aaa"
              fill="#dcdcdc"
              strokeWidth="1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
