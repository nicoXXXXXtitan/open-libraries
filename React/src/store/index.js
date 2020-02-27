import { createStore, applyMiddleware, compose } from 'redux';

// import middleware
import loginMiddleware from 'src/store/middleware/loginMiddleware';
import isbnMiddleware from './middleware/isbnMiddleware';
import searchBookMiddleware from './middleware/searchBookMiddleware';
import getAllDatasMiddleware from './middleware/getAllDatasMiddleware';
import addUserMiddleware from './middleware/addUserMiddleware';
import sendIdBookingMiddleware from './middleware/sendIdBookingMiddleware';
import getBooksByCategoryMiddleware from './middleware/getBooksByCategoryMiddleware';


// on importe le reducer qui combine les autres
import reducer from './reducer';

// eslint-disable-next-line no-underscore-dangle
// https://github.com/zalmoxisus/redux-devtools-extension
// code complexe : plomberie pour redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Améliorations pour le store
const enhancers = composeEnhancers(
  applyMiddleware(
    // add middleware
    // liste des middleware à utiliser dans l'ordre souhaité
    // l'ordre de déclaration (ici) définit l'ordre dans lequel les middleware vont s'enchainer
    loginMiddleware,
    getAllDatasMiddleware,
    isbnMiddleware,
    searchBookMiddleware,
    addUserMiddleware,
    sendIdBookingMiddleware,
    getBooksByCategoryMiddleware,
  ),
);

// Création du store
const store = createStore(
  reducer,
  enhancers,
);

export default store;
