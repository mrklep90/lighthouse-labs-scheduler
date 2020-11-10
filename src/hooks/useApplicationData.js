import { useEffect, useReducer } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  // Updates state with actual data
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all.map(apiData => apiData.data) });
    });

  }, []);

  // Called by DayList component
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  // Called when completing axios PUT and DELETE requests to manage the spots state
  const updateSpots = (initialState, appointments) => {
    const state = { ...initialState };
    const days = state.days.map(day => {
      let number = 0;
      day.appointments.forEach(num => {
        if (!appointments[num].interview) {
          number++
        }
      })
      return {...day, spots: number}
    })
    return days;
  }

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
      dispatch({ type: SET_INTERVIEW, value: appointments });
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
      dispatch({ type: SET_INTERVIEW, value: appointments });
    })

  }

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.value[0], appointments: action.value[1], interviewers: action.value[2] };
      case SET_INTERVIEW:
        return { ...state, appointments: action.value, days: updateSpots(state, action.value) };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  // Initial state(s) upon application load
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  return { state, setDay, bookInterview, cancelInterview }
  
}