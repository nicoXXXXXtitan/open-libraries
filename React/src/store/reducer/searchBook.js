import {
  CHANGE_VALUE_SEARCH,
  OPEN_MODAL_VALIDATE,
  CLOSE_MODAL_VALIDATE_BOOKING,
  MESSAGE_AFTER_BOOKING,
  DISPLAY_MESSAGE_ERROR_SEARCH_BOOK,
  CLOSE_MODAL_ERROR_SEARCH_BOOK,
} from 'src/store/actions';

const initialState = {
  inputSearchValue: '',
  showModalReserveBook: false,
  messageAfterBooking: '',
  displayMessageErrorSearchBook: '',
  showModalErrorSearchBook: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE_SEARCH:
      return {
        ...state,
        inputSearchValue: action.value,
      };
    case DISPLAY_MESSAGE_ERROR_SEARCH_BOOK:
      return {
        ...state,
        showModalErrorSearchBook: true,
        displayMessageErrorSearchBook: 'Désolé nous n\'avons pas trouvé votre livre, faites une nouvelle recherche.',
      };
    case OPEN_MODAL_VALIDATE:
      return {
        ...state,
        showModalReserveBook: true,
      };
    case CLOSE_MODAL_VALIDATE_BOOKING:
      return {
        ...state,
        showModalReserveBook: false,
      };
    case MESSAGE_AFTER_BOOKING:
      return {
        ...state,
        messageAfterBooking: action.messageAfterBooking,
      };
    case CLOSE_MODAL_ERROR_SEARCH_BOOK:
      return {
        ...state,
        showModalErrorSearchBook: false,
        inputSearchValue: '',
      };
    default: return state;
  }
};

export default reducer;
