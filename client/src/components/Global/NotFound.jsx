import React from "react";

export default function NotFound() {
  return (
    <div className="NotFound">
      <h2>Ooops!</h2>
      <span>
        <strong>404:</strong>
      </span>
      <span> Page not Found!</span>
      <button onClick={() => window.history.go(-1)}>Go back!</button>
    </div>
  );
}
