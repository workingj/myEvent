import "./Contact.css";
import { useState } from "react";

export function ContactForm({ contact, handleCancel, handleOk, userID }) {
  const [cTemp, setCTemp] = useState(
    contact
      ? contact // if contact is undefined create an empty contact object
      : {
          email: "",
          firstName: "",
          lastName: "",
          zipcode: "",
          city: "",
          street: "",
          dates: [],
          user: userID,
        }
  );

  return (
    <form
      onSubmit={(e) => {
        handleOk(e, cTemp);

        // handleCancel(e);
      }}
    >
      <span>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={cTemp ? cTemp.email : ""}
          onChange={(e) => setCTemp({ ...cTemp, email: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={cTemp ? cTemp.firstName : ""}
          onChange={(e) => setCTemp({ ...cTemp, firstName: e.target.value })}
          required
        />
      </span>
      <span>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={cTemp ? cTemp.lastName : ""}
          onChange={(e) => setCTemp({ ...cTemp, lastName: e.target.value })}
          required
        />
      </span>
      <span>
        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          name="zipcode"
          value={cTemp ? cTemp.zipcode : ""}
          onChange={(e) => setCTemp({ ...cTemp, zipcode: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={cTemp ? cTemp.city : ""}
          onChange={(e) => setCTemp({ ...cTemp, city: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          name="street"
          onChange={(e) => setCTemp({ ...cTemp, street: e.target.value })}
          value={cTemp ? cTemp.street : ""}
        />
      </span>
      <span className="hCenter">
        <strong>Dates</strong>
      </span>
      <hr />
      {cTemp.dates[0] &&
        cTemp.dates.map((date,i) => {
          <>
            <label>{date.title}</label>
            <input
              type="date"
              name={date.title}
              onChange={(e) =>
                console.log(i)
                // setCTemp({
                //   ...cTemp,
                //   dates: { ...cTemp.dates, birthday: e.target.value },
                // })
              }
              value={date.value}
            />
          </>;
        })}
      <span>
        <label>Marriage:</label>
        <input
          type="date"
          name="marriage"
          onChange={(e) =>
            setCTemp({
              ...cTemp,
              dates: { ...cTemp.dates, marriage: e.target.value },
            })
          }
          value={
            cTemp
              ? cTemp.dates.marriage
                ? cTemp.dates.marriage.slice(0, 10)
                : ""
              : ""
          }
        />
      </span>
      <span className="vSpace"></span>
      <span className="hCenter">
        <button type="submit" className="okBtn">
          Ok
        </button>
        <button className="cancelBtn" onClick={(e) => handleCancel(e)}>
          Cancel
        </button>
      </span>
    </form>
  );
}
