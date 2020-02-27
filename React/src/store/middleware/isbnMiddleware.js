import axios from 'axios';
import { SUBMIT_FORM_ISBN, responseBookIsbn, ADD_BOOK_IN_BOOKING, displayMessageError, updateBookInBooking } from 'src/store/actions';

const isbnMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case SUBMIT_FORM_ISBN:

      // Malgré l'erreur d'eslint je n'ai pas le choix de les mettre ici.
      // si je les mets au dessus du switch, erreur car si pas connecté,
      // on a ni l'isbn ni le token
      const { isbn } = store.getState().isbnForm;
      const token1  = window.localStorage.getItem('token');

      axios.get(`http://localhost:8001/api/book/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      })
        .then((response) => {
          const { data } = response;
          store.dispatch(responseBookIsbn(data));
        })
        .catch((error) => {
          // console.log(error);
          if (error) {
            store.dispatch(displayMessageError());

          }
        });

      break;

    case ADD_BOOK_IN_BOOKING:

      const addIsbnInBooking = store.getState().isbnForm.isbn;
      const token2  = window.localStorage.getItem('token');
 
      axios.get(`http://localhost:8001/api/book/${addIsbnInBooking}/add`, {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      })
        .then((response) => {
          const { data } = response;
          store.dispatch(updateBookInBooking(data));
          // console.log(data);
          // store.dispatch(confirmAddBook(data));
        })
        .catch((error) => {
          console.log(error);
        });

      break;

    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default isbnMiddleware;
