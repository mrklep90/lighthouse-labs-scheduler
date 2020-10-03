import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => {
        transition(SHOW);
      })
      
  }

  return (
  <article className="appointment">
    <Header 
    time={props.time}
    />
    { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    { mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
      )}
    { mode === SAVING && (
      <Status 
        message="Saving Appointment"
      />
    )}
    { mode === CREATE && (
    <Form
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
    />  
    )}
  </article>
  )
}