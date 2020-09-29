import React from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const placeholderText = props.name ? props.name : "Enter Student Name";
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder={placeholderText}
        /*
          This must be a controlled component
        */
      />
    </form>
    {props.interviewer
    ? <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer.id} setInterviewer={props.setInterviewer} />
    : <InterviewerList interviewers={props.interviewers} setInterviewer={props.setInterviewer} />
    }
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>
  )
}