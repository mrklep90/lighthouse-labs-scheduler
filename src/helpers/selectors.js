//OMG THIS IS TERRIBLE - MUST REFACTOR!!!!!!

export default function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  let requestedDay;
  for (const d of state.days) {
    if (d.name === day) {
      requestedDay = d;
    }
  }

  if (requestedDay === undefined) {
    return [];
  }

  const dayAppointments = requestedDay.appointments;
  let appointmentDetails = [];

  for (const appointment in state.appointments) {
    if (dayAppointments.includes(state.appointments[appointment].id)) {
      appointmentDetails.push(state.appointments[appointment]);
    }
  }

  return appointmentDetails;

}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;

  const interviewDetails = {

    "student": interview.student,
    "interviewer": state.interviewers[interviewerID]

  }

  return interviewDetails;

}