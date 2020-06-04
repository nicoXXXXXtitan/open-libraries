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

  switch (action.type) {
    // cette action me permet d'avoir en permanence toutes les données présentes sur les pages de l'appli
    // c'est à chaque refresh que cette action est enclenché dans le componentDidMount de App.
    case GET_ALL_DATAS:
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
            // liste des livres empruntés par le user
            axios.get('http://localhost:8001/api/user/booking/borrowed', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((bookBorrowed) => {
                const getBookBorrowed = bookBorrowed.data;
                store.dispatch(getBorrowedBooks(getBookBorrowed));
                store.dispatch(isLogged());

                // liste de livres de l'utilisateur mise à dispo à l'emprunt
                axios.get('http://localhost:8001/api/booking/list', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((bookLend) => {
                    const getBookLend = bookLend.data;
                    store.dispatch(getBookILend(getBookLend));

                    // Les 2 derniers livres mise à disposition à l'emprunt
                    axios.get('http://localhost:8001/api/book/latest', {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((responseLatestBook) => {
                        const latestBook = responseLatestBook.data;
                        store.dispatch(getLatestBook(latestBook));

                        // Liste des catégories de livres présente en bdd
                        axios.get('http://localhost:8001/api/book/list/type', {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                          .then((response) => {
                            const types = response.data;
                            store.dispatch(setTypes(types));

                            //  j'ai écrit en dur le nom de la catégorie pour l'afficher au démarrage de l'appli. 
                            //  c'est à modifier et à ameliorer
                            axios.get('http://localhost:8001/api/book/list/Design', {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((response3) => {
                                const listBooksCategoryInitApp = response3.data;
                                // je stock la liste de livres dans le state
                                store.dispatch(listBookByOneCategoryInitApp(listBooksCategoryInitApp));
                                store.dispatch(stopLoader());
                              })
                              .catch((error6) => {
                                // console.log(6eme requette , Liste des livres de la catégorie Design. Erreur : 'error6);
                              });
                          })
                          .catch((error5) => {
                            // console.log('5eme requette , Liste des catégories de livres présente en bdd. Erreur : ', error5);
                          });
                      })
                      .catch((error4) => {
                        // console.log('RoleUser, 4eme requete,Les 2 derniers livres mise à disposition à l'emprunt. Erreur : ', error4);
                      });
                  })
                  .catch((error3) => {
                    // console.log('Role User, 3eme requete,liste de livres de l'utilisateur mise à dispo à l'emprunt. Erreur :  ', error3);
                  });
              })
              .catch((error2) => {
                // console.log('RoleUser : 2eme requete, Affiche tous les livres empruntés par le user connecté. Erreur : ', error2);
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
          localStorage.removeItem('token');
          // console.log('1eme requete: demande l\'objet user ,erreur ;', error1);
        });

      break;
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default getAllDatasMiddleware;
