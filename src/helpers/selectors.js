//---------------------------------------------------------------------------------------
// Retrieve appointments for the given day
//---------------------------------------------------------------------------------------
export function getAppointmentsForDay(state, day) {

  const requestedDay = state.days.find(d => d.name === day);

  return requestedDay ? requestedDay.appointments.map(key => state.appointments[key]) : []

}
//---------------------------------------------------------------------------------------
// Retrieve interviewers for the given day
//---------------------------------------------------------------------------------------
export function getInterviewersForDay(state, day) {
  
  const requestedDay = state.days.find(d => d.name === day);

  return requestedDay ? requestedDay.interviewers.map(key => state.interviewers[key]) : []

}
//---------------------------------------------------------------------------------------
// Returns an object with interview/interviewer details if applicable
//---------------------------------------------------------------------------------------
export function getInterview(state, interview) {
  
  return interview ? {...interview, interviewer: state.interviewers[interview.interviewer]} : null

}