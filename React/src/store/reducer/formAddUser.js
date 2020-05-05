import {
  CHANGE_INPUT_VALUE_FORM_ADD_USER,
  SET_ADDRESS_API,
  CHANGE_ADDRESS_FROM_API,
  CLEAR_INPUT_ADDRESS,
  CLEAR_INPUT_FORM_LOGIN,
  DISPLAY_MESSAGE_SUCCESS_ADD_USER,
  SHOW_MODAL_ADD_NEW_USER,
  CLOSE_MODAL_ADD_NEW_USER,
  CLOSE_MODAL_SUCCESS_ADD_USER,
  CLEAR_INPUT_CONFIRM_EMAIL,
  CLEAR_INPUT_CONFIRM_PASSWORD,
  DISPLAY_MESSAGE_ERROR_FORM_EMPTY,
  CLEAR_MESS_ERROR_FORM_EMPTY,
} from 'src/store/actions';

// --- initial state
const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  address: '',
  phone: '',
  addressesAPI: [],
  messageErrorFormEmpty: '',
  showInputApi: 'block',
  showModalSuccessAddUser: false,
  showModalAddUser: false,

};

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MODAL_ADD_NEW_USER:
      return {
        ...state,
        showModalAddUser: true,
        showModalSuccessAddUser: false,
      };
    case CLOSE_MODAL_ADD_NEW_USER:
      return {
        ...state,
        showModalAddUser: false,
      };
    case CHANGE_INPUT_VALUE_FORM_ADD_USER:
      return {
        ...state,
        // en fonction du nom du champ je mets à jour le bon state
        [action.name]: action.value,
      };
    case CLEAR_INPUT_CONFIRM_EMAIL:
      return {
        ...state,
        confirmEmail: '',
      };
    case CLEAR_INPUT_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: '',
      };
    case SET_ADDRESS_API:
      return {
        ...state,
        addressesAPI: action.addressesAPI,
      };
    case CHANGE_ADDRESS_FROM_API:
      return {
        ...state,
        address: action.newAddressApi,
        showInputApi: 'none',
      };
    case CLEAR_INPUT_ADDRESS:
      return {
        ...state,
        address: '',
        messageErrorFormEmpty: '',
        addressesAPI: [],
        showInputApi: 'block',
      };
    case CLEAR_INPUT_FORM_LOGIN:
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        messageErrorFormEmpty: '',
      };
    case DISPLAY_MESSAGE_ERROR_FORM_EMPTY:
      return {
        ...state,
        messageErrorFormEmpty: 'Désolé, vous n\' avez pas rempli tous les champs !',
      };
    case CLEAR_MESS_ERROR_FORM_EMPTY:
      return {
        ...state,
        messageErrorFormEmpty: '',
      };
    case DISPLAY_MESSAGE_SUCCESS_ADD_USER:
      return {
        ...state,
        showModalSuccessAddUser: true,
        showModalAddUser: false,
      };
    case CLOSE_MODAL_SUCCESS_ADD_USER:
      return {
        ...state,
        showModalSuccessAddUser: false,
        showModalAddUser: false,
      };
    default: return state;
  };
};

// --- export
export default reducer;
