/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  ON_KEY_PRESS,
  SUBMIT_FORM_ADD_USER,
  setAddressAPI,
  displayMessageSuccess,
} from 'src/store/actions';

const addUserMiddleware = (store) => (next) => (action) => {
  const {
    address, firstname, lastname, email, phone, password,
  } = store.getState().formAddUser;

  const firstnameCleaned = firstname.trim();
  const lastnameCleaned = lastname.trim();
  const emailCleaned = email.trim();
  const phoneCleaned = phone.trim();
  const passwordCleaned = password.trim();

  switch (action.type) {
    case ON_KEY_PRESS:
      delete axios.defaults.headers['Authorization'];
      axios
        .get(`http://api-adresse.data.gouv.fr/search/?q=${address}`)
        .then((response) => {
          const { features } = response.data;
          const addressesAPI = [];


          features.forEach((feature) => {
            addressesAPI.push(feature);

          });

          store.dispatch(setAddressAPI(addressesAPI));
        })
        .catch((error) => {
          // console.log(error);
        });
      break;
    case SUBMIT_FORM_ADD_USER:

      const { addressesAPI } = store.getState().formAddUser;

      //  si il y a bien une recherche d'adresse qui a commencé à être tappé
      if (addressesAPI.length > 1) {

        const poscode = addressesAPI[0].properties.postcode;
        const poscodeToNumber = parseInt(poscode, 10);
        //  aucune vérif sont faites sur le formulaire
        const token2 = window.localStorage.getItem('token');
        axios({
          method: 'post',
          url: 'http://localhost:8001/api/board/user/add',
          data: {
            firstname: firstnameCleaned,
            lastname: lastnameCleaned,
            email: emailCleaned,
            phoneNumber: phoneCleaned,
            password: passwordCleaned,
            latitude: addressesAPI[0].geometry.coordinates[0],
            longitude: addressesAPI[0].geometry.coordinates[1],
            city: addressesAPI[0].properties.city,
            postalcode: poscodeToNumber,
            street: addressesAPI[0].properties.name,
          },
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              store.dispatch(displayMessageSuccess());
            }
  
          })
          .catch((error) => {
            // console.log(error);
          });
      }

      break;
    default:
      // par defaut je laise passer l'action
      next(action);
  }
};

export default addUserMiddleware;
