import axios from 'axios';

import {
  GET_ALL_DATAS,
  setProfilUser,
  isLogged,
  stopLoader,
  displayLoader,
  setUsers,
  getBorrowedBooks,
  getBookILend,
  setAllBooks,
  getLatestBook,
  setTypes,
  listBookByOneCategoryInitApp,
} from 'src/store/actions';

const getAllDatasMiddleware = (store) => (next) => (action) => {

  const token = window.localStorage.getItem('token');

  switch (action.type) {
    // this action allows me to always have all the data present on the pages of the application.
    // At each refresh, this action is called in the App componentDidMount.
    case GET_ALL_DATAS:
      store.dispatch(displayLoader());
      // I request the object User to display it on the HomeUser or the Board page.
      axios.get('http://localhost:8001/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response1) => {
          const dataUser = response1.data;
          const roleUser = dataUser.roles[0];
          // I store in the state the object User and the role.
          // The role allows me to manage redirections.
          store.dispatch(setProfilUser(dataUser, roleUser));

          const { typeUser } = store.getState().user;

          if (typeUser === 'ROLE_USER') {
            // list of books borrowed by the user
            return axios.get('http://localhost:8001/api/user/booking/borrowed', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((bookBorrowed) => {
                const getBookBorrowed = bookBorrowed.data;
                store.dispatch(getBorrowedBooks(getBookBorrowed));
                store.dispatch(isLogged());

                // list of user's books available for borrowing
                return axios.get('http://localhost:8001/api/booking/list', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((bookLend) => {
                    const getBookLend = bookLend.data;
                    store.dispatch(getBookILend(getBookLend));

                    // The last 2 books made available for borrowing
                    return axios.get('http://localhost:8001/api/book/latest', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((responseLatestBook) => {
                        const latestBook = responseLatestBook.data;
                        store.dispatch(getLatestBook(latestBook));

                        // List of book categories present in bdd
                        return axios.get('http://localhost:8001/api/book/list/type', {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((response) => {
                            const types = response.data;
                            store.dispatch(setTypes(types));

                            // I hardcoded the category name to display it when the app starts. 
                            // it needs to be modified and improved.
                            return axios.get('http://localhost:8001/api/book/list/Design', {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((response3) => {
                                const listBooksCategoryInitApp = response3.data;
                                store.dispatch(listBookByOneCategoryInitApp(listBooksCategoryInitApp));
                                store.dispatch(stopLoader());
                              });
                          });
                      });
                  });
              })
              .catch((error) => {
                // several types of errors possible with Axios (https://github.com/axios/axios#handling-errors)
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
              store.dispatch(isLogged());
              store.dispatch(stopLoader());
              // list of all books
              return axios.get('http://localhost:8001/api/book/all', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((responseAllBooks) => {
                  const { data } = responseAllBooks;
                  store.dispatch(setAllBooks(data));
                });
            });
        })
        .catch((error) => {
          localStorage.removeItem('token');
          // several types of errors possible with Axios (https://github.com/axios/axios#handling-errors)
        });

      break;
    default:
    // by default I'll let the action happen
      next(action);
  }
};

export default getAllDatasMiddleware;
