import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  // Initial state(s) upon application load
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Updates state with actual data
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });

  }, []);

  // Called by DayList component
  const setDay = day => setState({ ...state, day });

  // Called when completing axios PUT and DELETE requests to manage the spots state
  const updateSpots = (state, id, appointment) => {
    const day = state.days.find(day => day.name === state.day);
    
    // if interview key is null (cancel interview), increase spot on axios action
    if (!appointment.interview) {
      day.spots++
      // if an interview does not exist for the specified appointment (booking interview), decrease spot on axios action. If interview does exist (update), no change.
    } else if (!state.appointments[id].interview) {
      day.spots--
    } 
    
    return state.days

  };

  // Enables the booking of appointments, manages the axios PUT request
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, id, appointment)
      })
    })

  }

  // Enables cancelling of appointments, manages the axios DELETE request
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, id, appointment)
      })
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
  
}