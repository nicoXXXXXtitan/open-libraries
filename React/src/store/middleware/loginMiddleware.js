import axios from 'axios';

import {
  SUBMIT_FORM_LOGIN,
  setProfilUser,
  isLogged,
  stopLoader,
  displayLoader,
  setUsers,
  getBorrowedBooks,
  getBookILend,
  loginFailureMessage,
  setAllBooks,
  getLatestBook,
  setTypes,
  listBookByOneCategoryInitApp,
  deleteInput,
} from 'src/store/actions';

const loginMiddleware = (store) => (next) => (action) => {
  const datasFormLogin = {
    // JWT expects 2 properties named "username" and "password". This is its internal working
    username: store.getState().formLogin.email,
    password: store.getState().formLogin.password,
  };

  switch (action.type) {
    case SUBMIT_FORM_LOGIN:
 
      // I request a token from the server using the lexik JWT bundle,
      axios.post('http://localhost:8001/api/login_check', datasFormLogin)
        .then((response1) => {
          const { token } = response1.data;
          window.localStorage.setItem('token', token);
          store.dispatch(displayLoader());
          // I request the object User to display it on the HomeUser or the Board page.
          return axios.get('http://localhost:8001/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response2) => {
              const dataUser = response2.data;
              const roleUser = dataUser.roles[0];
              // I store in the state the object User and the role.
              // The role allows me to manage redirections.
              store.dispatch(setProfilUser(dataUser, roleUser));

              const { typeUser } = store.getState().user;

              if (typeUser === 'ROLE_USER') {
                // The last 2 books made available for borrowing
                return axios.get('http://localhost:8001/api/book/latest', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((responseLatestBook) => {
                    const latestBook = responseLatestBook.data;
                    store.dispatch(getLatestBook(latestBook));

                    // I hardcoded the category name to display it when the app starts. 
                    // it needs to be modified and improved.
                    return axios.get('http://localhost:8001/api/book/list/Design', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((response3) => {
                        const listBooksbyCategory = response3.data;
                        // I store in the state
                        store.dispatch(listBookByOneCategoryInitApp(listBooksbyCategory));

                        // list of books borrowed by the user
                        return axios.get('http://localhost:8001/api/user/booking/borrowed', {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((bookBorrowed) => {
                            const getBookBorrowed = bookBorrowed.data;
                            // I store in the state
                            store.dispatch(getBorrowedBooks(getBookBorrowed));

                            // list of user's books available for borrowing
                            return axios.get('http://localhost:8001/api/booking/list', {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((bookLend) => {
                                const getBookLend = bookLend.data;
                                // I store in the state
                                store.dispatch(getBookILend(getBookLend));
                                // I change the state "isLogged" to true to allow access to certain routes.
                                store.dispatch(isLogged());
                                store.dispatch(stopLoader());

                                // List of book categories present in bdd
                                return axios.get('http://localhost:8001/api/book/list/type', {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((response) => {
                                    const types = response.data;
                                    store.dispatch(setTypes(types));
                                  });
                              });
                          });
                      });
                  })
                  // several types of errors possible with Axios (https://github.com/axios/axios#handling-errors)
                  .catch((error) => {
                    localStorage.removeItem('token');
                    // console.log('error response :', error.response);
                    // console.log('error request :', error.request);
                    // console.log('error message :', error.message);
                    // console.log('error config :', error.config);
                  });
              }

              // I just got out of IF so ROLE_ADMIN...
              // list of all users
              return axios.get('http://localhost:8001/api/board/users/list', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((responseUserBoard) => {
                  const usersBoard = responseUserBoard.data;
                  store.dispatch(setUsers(usersBoard));
                  // list of all books
                  return axios.get('http://localhost:8001/api/book/all', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((responseAllBooks) => {
                      const { data } = responseAllBooks;
                      store.dispatch(setAllBooks(data));
                      store.dispatch(isLogged());
                      store.dispatch(stopLoader());
                    });
                });
            });
        })
        .catch((error) => {
          store.dispatch(loginFailureMessage());
          store.dispatch(deleteInput());
          // several types of errors possible with Axios (https://github.com/axios/axios#handling-errors)
        });

      break;
    default:
      // by default I'll let the action happen //
      next(action);
  }
};

export default loginMiddleware;
