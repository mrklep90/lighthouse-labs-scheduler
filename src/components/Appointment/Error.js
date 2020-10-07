import React from "react";

export default function Error(props) {
  
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h3 className="text--light">Error</h3>
        <h1 className="text--semi-bold">{props.message}</h1>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  )

}