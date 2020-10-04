import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  const updateSpots = (initialState, remove = false) => {
    const state = { ...initialState };
    const day = state.days.find(day => day.name === state.day);
    
    if (remove) {
      day.spots--;
    } else {
      day.spots++;
    }
    
    return state.days
  }

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
        days: updateSpots(state, true)
      })
    })  
  }

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
        days: updateSpots(state)
      })
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
  
}