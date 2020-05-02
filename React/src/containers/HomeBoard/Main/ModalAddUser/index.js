import { connect } from 'react-redux';

import formAddUser from 'src/components/HomeBoard/Main/modalAddUser';

import {
  changeInputAddUser,
  submitFormAddUser,
  onKeyPress,
  searchAPIaddress,
  changeAddressFromToAPI,
  clearInputAddress,
  closeModalAddUser,
  clearTheInputs,
 } from 'src/store/actions';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    firstnameValue: state.formAddUser.firstname,
    lastnameValue: state.formAddUser.lastname,
    passwordValue: state.formAddUser.password,
    addressValue: state.formAddUser.address,
    phoneValue: state.formAddUser.phone,
    emailValue: state.formAddUser.email,
    addressesAPI: state.formAddUser.addressesAPI,
    showInputApi: state.formAddUser.showInputApi,
    cities: state.formAddUser.cities,
    showModalAddUser: state.formAddUser.showModalAddUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (name, value) => {
    const action = changeInputAddUser(name, value);
    dispatch(action);
  },
  onSubmit: () => {
    const action = submitFormAddUser();
    dispatch(action);
  },
  onKeyPress: () => {
    const action = onKeyPress();
    dispatch(action);
  },
  changeAddressFromAPI: (newValueAddress) => {
    dispatch(changeAddressFromToAPI(newValueAddress));
  },
  clearAdressInput: () => {
    dispatch(clearInputAddress());
  },
  clearInputs: () => {
    dispatch(clearTheInputs());
  },
  closeModal: () => {
    dispatch(closeModalAddUser());
  },
});

const FormAddUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(formAddUser);

export default FormAddUserContainer;
