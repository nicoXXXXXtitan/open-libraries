import axios from 'axios';

import {
  GET_ALL_DATAS,
  setProfilUser,
  // setBooksByCategory,
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

  // cette action me permet d'avoir en permanence toutes les données présentes sur les pages de l'appli
  // c'est à chaque refresh que cette action est enclenché dans le componentDidMount de App.
  switch (action.type) {
    case GET_ALL_DATAS:
      // J'affiche mon loader avant toutes mes requetes
      store.dispatch(displayLoader());
      // je demande l'objet User pour l'afficher sur la HomeUser ou la page Board.
      axios.get('http://localhost:8001/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response1) => {

          const dataUser = response1.data;
          const roleUser = dataUser.roles[0];
          // je stock dans le state l'objet User et le role. Le role me permet de gérer les redirections.
          store.dispatch(setProfilUser(dataUser, roleUser));

          const { typeUser } = store.getState().user;

          if (typeUser === 'ROLE_USER') {
            // 3ème : je demande la liste des livres classé par catégorie pour l'afficher sur la page HomeUser
            axios.get('http://localhost:8001/api/book/list', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response3) => {
                const listBooksByCategory = response3.data;
                // je stock la liste de livres dans le state
              // store.dispatch(setBooksByCategory(listBooksByCategory));
                // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                store.dispatch(isLogged());
                // je stoppe mon loader
                store.dispatch(stopLoader());
                // Affiche tous les livres dont le User connecté est l'emprunteur
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
                    // je stoppe mon loader
                    store.dispatch(stopLoader());

                    // les livres dont le User est le prorpiétaire
                    axios.get('http://localhost:8001/api/booking/list', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((bookLend) => {
                        const getBookLend = bookLend.data;
                        // console.log(getBookLend);
                        store.dispatch(getBookILend(getBookLend));
                        // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                        store.dispatch(isLogged());
                        // je stoppe mon loader
                        store.dispatch(stopLoader());

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
                            // je stoppe mon loader
                            store.dispatch(stopLoader());

                            axios.get('http://localhost:8001/api/book/list/type', {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((response) => {
                                const types = response.data;
                                store.dispatch(setTypes(types));

                                //  j'ai écrit en dur le nom de la catégory pour l'afficher au démarrage de l'appli. 
                                //  c'est à modifier
                                axios.get('http://localhost:8001/api/book/list/Design', {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((response3) => {
                                    const listBooksCategoryInitApp = response3.data;
                                    // je stock la liste de livres dans le state
                                    store.dispatch(listBookByOneCategoryInitApp(listBooksCategoryInitApp));
                                    // je passe le state "isLogged" à true pour permettre l'accès à certaines routes
                                    store.dispatch(isLogged());
                                    // je stoppe mon loader
                                    store.dispatch(stopLoader());
                                  })
                                  .catch((error5) => {
                                    // console.log(error5);
                                  });
                              })
                              .catch((error4) => {
                                // console.log('liste des types ;', error4);
                              });
                          })
                          .catch((error3) => {
                            // console.log('3eme requete, erreur ;', error3);
                          });
                      })
                      .catch((error4) => {
                        // console.log('Role User, 4eme requete,les livres dont le User est le propriétaire erreur ;', error4);
                      });
                  })
                  .catch((error3) => {
                    // console.log('RoleUser : 3eme requete, Affiche tous les livres dont le User connecté est l\' emprunteur,  erreur ', error3);
                  });
              })
              .catch((error2) => {
                // console.log('RoleUser: 2eme requete, livre classé par catégorie, erreur ;', error2);
              });
          } else {
            // liste de tous les users
            axios.get('http://localhost:8001/api/board/users/list', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((responseUserBoard) => {
                const usersBoard = responseUserBoard.data;
                // console.log(usersBoard);
                store.dispatch(setUsers(usersBoard));
                store.dispatch(isLogged());
                store.dispatch(stopLoader());
                //  liste de tous les livres
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
                  .catch((error3bis) => {
                    // console.log('Board ,3eme requete, liste de tous les vivres,erreur ;', error3bis);
                  });
              })
              .catch((error2bis) => {
                // console.log('Board ,2eme requete,liste de tous les users, erreur ;', error2bis);
              });
          }
        }).catch((error1) => {
          // console.log('1eme requete: demande l\'objet user ,erreur ;', error1);
        });

      break;
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default getAllDatasMiddleware;
