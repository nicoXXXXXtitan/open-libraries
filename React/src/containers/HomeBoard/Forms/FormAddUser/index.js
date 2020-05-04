import { connect } from 'react-redux';

import formAddUser from 'src/components/HomeBoard/Forms/FormAddUser/modalAddUser';

import {
  changeInputAddUser,
  submitFormAddUser,
  onKeyPress,
  searchAPIaddress,
  changeAddressFromToAPI,
  clearInputAddress,
  closeModalAddUser,
  clearTheInputs,
  clearConfirmEmailInput,
  clearConfirmPasswordInput,
 } from 'src/store/actions';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    firstnameValue: state.formAddUser.firstname,
    lastnameValue: state.formAddUser.lastname,
    emailValue: state.formAddUser.email,
    confirmEmailValue: state.formAddUser.confirmEmail,
    passwordValue: state.formAddUser.password,
    confirmPasswordValue: state.formAddUser.confirmPassword,
    addressValue: state.formAddUser.address,
    phoneValue: state.formAddUser.phone,
    addressesAPI: state.formAddUser.addressesAPI,
    showInputApi: state.formAddUser.showInputApi,
    cities: state.formAddUser.cities,
    showModalAddUser: state.formAddUser.showModalAddUser,
    messageErrorFormEmpty: state.formAddUser.messageErrorFormEmpty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (name, value) => {
    const action = changeInputAddUser(name, value);
    dispatch(action);
  },
  clearConfirmEmail: () => {
    dispatch(clearConfirmEmailInput());
  },
  clearConfirmPassword: () => {
    dispatch(clearConfirmPasswordInput());
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
