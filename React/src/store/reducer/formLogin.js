import { CHANGE_INPUT_VALUE_FORM_LOGIN, LOGIN_FAILURE_MESSAGE, EMPTY_INPUT_LOGIN } from 'src/store/actions';

// --- initial state
const initialState = {
  email: '',
  password: '',
  loginFailureMessage: '',
};

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE_FORM_LOGIN:
      return {
        ...state,
        // en fonction du nom du champ je mets à jour le bon state
        [action.name]: action.value,
        loginFailureMessage: '',
      };
    case LOGIN_FAILURE_MESSAGE:
      return {
        ...state,
        loginFailureMessage: 'Mauvais email ou mot de passe, veuillez réessayer svp',
      };
    case EMPTY_INPUT_LOGIN:
      return {
        ...state,
        email: '',
        password: '',
      };

    default: return state;
  }
};

// --- export
export default reducer;
