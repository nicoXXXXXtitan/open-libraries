import axios from 'axios';

import {
  SUBMIT_FORM_SEARCH,
  getBookBySearch,
  VALIDATE_BOOKING,
  messageAfterBooking,
  displayMessageErrorSearchBook,
  getBorrowedBooks,
} from 'src/store/actions';


const SearchBookMiddleware = (store) => (next) => (action) => {
  const search = store.getState().searchBook.inputSearchValue;
  const token = window.localStorage.getItem('token');

  switch (action.type) {
    case SUBMIT_FORM_SEARCH:
      axios
        .get(`http://localhost:8001/api/user/searchbook/title/${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const responseBook = response.data;
          store.dispatch(getBookBySearch(responseBook));
        })
        .catch((error) => {
          if (error) {
            store.dispatch(displayMessageErrorSearchBook());
          }
        });

      break;

    // Caution : The braces (after the :) allow not to have a variable range in the whole block.
    case VALIDATE_BOOKING: {
      const ownerId = store.getState().book.bookSearch.datasUsers[0].id;
      const libraryName = store.getState().book.bookSearch.datasUsers[0].name;
      const bookId = store.getState().book.bookSearch.bookInfos.id;

      if (libraryName) {
        axios
          .get(`http://localhost:8001/api/user/booking/add/library/${bookId}/${ownerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response1) => {
            const messageConfirmBooking = response1.data;
            store.dispatch(messageAfterBooking(messageConfirmBooking));

            return axios.get('http://localhost:8001/api/user/booking/borrowed', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((bookBorrowed) => {
                const getBookBorrowed = bookBorrowed.data;
                store.dispatch(getBorrowedBooks(getBookBorrowed));
              });
          })
          .catch((error) => {
          });
      } else {
        axios
          .get(`http://localhost:8001/api/user/booking/add/${bookId}/${ownerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response2) => {
            const messageConfirmBooking = response2.data;
            store.dispatch(messageAfterBooking(messageConfirmBooking));

            return axios.get('http://localhost:8001/api/user/booking/borrowed', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((bookBorrowed) => {
                const getBookBorrowed = bookBorrowed.data;
                store.dispatch(getBorrowedBooks(getBookBorrowed));
              });
          })
          .catch((error) => {
          });
      }
      break;
    }
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default SearchBookMiddleware;
