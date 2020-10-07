import React from "react";
import Confirm from "./Confirm"
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {

  // Modes
  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  // Destructuring imported hook, used to display initial mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // Function used in saving of appointment
  function save(name, interviewer) {

    // Constructs the interview object passed to bookInterview
    const interview = {
      student: name,
      interviewer
    };

    // Displays relevant mode to user
    transition(SAVING);

    // Axios PUT request
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(err => transition(ERROR_SAVE, true))

  }

  // Function used in deleting of appointment
  function deleteAppt() {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      // Axios DELETE request
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch(err => transition(ERROR_DELETE, true))
    } else {
      transition(CONFIRM);
    }
  }

  return (
    <article className="appointment" data-testid="appointment">
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
    { mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      />  
    )}
    { mode === EDIT && (
      <Form
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      />
    )}
    { mode === CONFIRM && <Confirm message="Delete appointment?" onCancel={back} onConfirm={deleteAppt} /> }
    { mode === SAVING && <Status message="Saving Appointment" /> }
    { mode === DELETING && <Status message="Deleting Appointment" /> }
    { mode === ERROR_SAVE && <Error message='Sorry, your appointment could not be saved at this time. Please try again later.' onClose={back} />}
    { mode === ERROR_DELETE && <Error message='Sorry, your appointment could not be deleted at this time. Please try again later.' onClose={back} />}
   </article>
  )

}