import axios from 'axios';

import {
  SUBMIT_FORM_LOGIN,
  setProfilUser,
  // setBooksByCategory,
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
    // JWT attends 2 propriétées nommées "username" et "password". C'est son fonctionnement interne.
    username: store.getState().formLogin.email,
    password: store.getState().formLogin.password,
  };

  switch (action.type) {
    case SUBMIT_FORM_LOGIN:
      // J'affiche mon loader avant toutes mes requetes
      store.dispatch(displayLoader());
      // 1ere : je demande un token au serveur grace au bundle lexik JWT,
      axios.post('http://localhost:8001/api/login_check', datasFormLogin)
        .then((response1) => {
          const { token } = response1.data;
          window.localStorage.setItem('token', token);

          // 2ème : je demande l'objet User pour l'afficher sur la HomeUser ou la page Board
          axios.get('http://localhost:8001/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response2) => {
              const dataUser = response2.data;
              const roleUser = dataUser.roles[0];
              // je stock dans le state l'objet User et le role.
              // Le role me permet de gérer les redirections.
              store.dispatch(setProfilUser(dataUser, roleUser));

              const { typeUser } = store.getState().user;

              if (typeUser === 'ROLE_USER') {
                // 3ème : je demande la liste des livres pour l'afficher sur la page HomeUser
                axios.get('http://localhost:8001/api/book/latest', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((responseLatestBook) => {
                    const latestBook = responseLatestBook.data;
                    store.dispatch(getLatestBook(latestBook));
                    // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                    store.dispatch(isLogged());
                    store.dispatch(stopLoader());
                    //  j'ai écrit en dur le nom de la catégorie pour l'afficher au démarrage de l'appli. 
                    axios.get('http://localhost:8001/api/book/list/Design', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((response3) => {
                        const listBooksbyCategory = response3.data;
                        // je stock la liste de livres dans le state
                        store.dispatch(listBookByOneCategoryInitApp(listBooksbyCategory));
                        // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                        store.dispatch(isLogged());
                        store.dispatch(stopLoader());

                        axios.get('http://localhost:8001/api/user/booking/borrowed', {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((bookBorrowed) => {
                            const getBookBorrowed = bookBorrowed.data;
    
                            store.dispatch(getBorrowedBooks(getBookBorrowed));
                            // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                            store.dispatch(isLogged());
                            store.dispatch(stopLoader());

                            axios.get('http://localhost:8001/api/booking/list', {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((bookLend) => {
                                const getBookLend = bookLend.data;
                                store.dispatch(getBookILend(getBookLend));
                                // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                                store.dispatch(isLogged());
                                store.dispatch(stopLoader());

                                axios.get('http://localhost:8001/api/book/list/type', {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((response) => {
                                    const types = response.data;
                                    store.dispatch(setTypes(types));
                                  })
                                  .catch((error5) => {
                                  });
                              })
                              .catch((error4) => {
                              });
                          })
                          .catch((error3) => {
                          });
                      })
                      .catch((error2) => {
                      });
                  })
                  .catch((error1) => {
                  });
              } else {
                axios.get('http://localhost:8001/api/board/users/list', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((responseUserBoard) => {
                    const usersBoard = responseUserBoard.data;
                    store.dispatch(setUsers(usersBoard));
                    store.dispatch(isLogged());
                    store.dispatch(stopLoader());

                    axios.get('http://localhost:8001/api/book/all', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((responseAllBooks) => {
                        const { data } = responseAllBooks;
                        store.dispatch(setAllBooks(data));
                        store.dispatch(isLogged());
                        store.dispatch(stopLoader());
                      })
                      .catch((error4) => {
                      });
                  })
                  .catch((error3) => {
                  });
              }
            })
            .catch((error2) => {
            });
        })
        .catch((error1) => {
          store.dispatch(loginFailureMessage());
          store.dispatch(deleteInput());
        });

      break;
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default loginMiddleware;
