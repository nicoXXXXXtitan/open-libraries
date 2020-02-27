import axios from 'axios';

import { GET_THE_CATEGORY_ASKED, bookReceiveByCategory} from 'src/store/actions';

const getBooksByCategoryMiddleware = (store) => (next) => (action) => {

  const category = store.getState().book.categoryAsked;
  const token = window.localStorage.getItem('token');


  switch (action.type) {
    case GET_THE_CATEGORY_ASKED:
      axios
        .get(`http://localhost:8001/api/book/list/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { data } = response;
          store.dispatch(bookReceiveByCategory(data));
        })
        .catch((error) => {
          // console.log(error);
        });
      break;
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default getBooksByCategoryMiddleware;
