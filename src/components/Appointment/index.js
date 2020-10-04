import React from "react";

import Confirm from "./Confirm"
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {

  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      
  }

  function deleteAppt() {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
    } else {
      transition(CONFIRM);
    }
  }

  return (
    <article className="appointment">
    <Header time={props.time} />
    { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    { mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(EDIT)}
      onDelete={deleteAppt}
      />
      )}
    { mode === SAVING && <Status message="Saving Appointment" /> }
    { mode === CONFIRM && <Confirm message="Delete appointment?" onCancel={back} onConfirm={deleteAppt} /> }
    { mode === DELETING && <Status message="Deleting Appointment" /> }
    { mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />  
    )}
    {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
  </article>
  )
}