import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {

  const initialState = { 
  
    contacts : [
    {
      id: 1,
      name: 'Jill Johnson',
      email: 'jill@email.com',
      phone: '111-111-1111',
      type: 'personal'
    },
    {
      id: 2,
      name: 'Sara Watson',
      email: 'sara@email.com',
      phone: '222-222-2222',
      type: 'personal'
    },
    {
      id: 3,
      name: 'Hary White',
      email: 'hary@email.com',
      phone: '333-333-3333',
      type: 'professional'
    }
    ],
    current: null
};

const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = (Math.random() * 100);
    dispatch({ type: ADD_CONTACT, payload: contact });
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact});
  }

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        current: state.current,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      { props.children }
    </ContactContext.Provider>
  ) 
};

export default ContactState;