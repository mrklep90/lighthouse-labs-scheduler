//---------------------------------------------------------------------------------------
// getAppointmentsForDay
//---------------------------------------------------------------------------------------
export function getAppointmentsForDay(state, day) {

  const requestedDay = state.days.find(d => d.name === day);

  return requestedDay ? requestedDay.appointments.map(key => state.appointments[key]) : []

}
//---------------------------------------------------------------------------------------
// getInterviewersForDay
//---------------------------------------------------------------------------------------
export function getInterviewersForDay(state, day) {
  
  const requestedDay = state.days.find(d => d.name === day);

  return requestedDay ? requestedDay.interviewers.map(key => state.interviewers[key]) : []

}
//---------------------------------------------------------------------------------------
// getInterview
//---------------------------------------------------------------------------------------
export function getInterview(state, interview) {
  
  return interview ? {...interview, interviewer: state.interviewers[interview.interviewer]} : null

}