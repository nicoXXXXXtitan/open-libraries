import React from 'react';
import PropTypes from 'prop-types';
import './modallAddUser.scss';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
} from 'react-bootstrap';

import Firstname from './Fields/firstname';
import Lastname from './Fields/lastname';
import Email from './Fields/email';
import Password from './Fields/password';
import Phone from './Fields/phone';
import Address from './Fields/address';




const confirmEmail = (emailValue, confirmEmailValue, errors) => {

  let validEmail = false;
  if (emailValue === confirmEmailValue) {
    validEmail = true;
  } else {
    errors.confirmEmail = 'vos emails sont différents';
  }
  console.log("validEmail :", validEmail, 'confirmEmail : ', errors.confirmEmail )
  return validEmail;
};

const clearMessagesErrors = (errors) => {
  errors.firstname = '';
  errors.lastname = '';
  errors.email = '';
  errors.confirmEmail = '';
  errors.password = '';
  errors.confirmPassword = '';
  errors.phone = '';
  errors.address = '';
};

class ModalAddUser extends React.Component {

  // Grace au plugin babel : @babel/plugin-proposal-class-properties
  // on peut définir des propriétés directement dans la classe
  // ICI le this est disponible
  state = {
    errors: {
      firstname: '',
      lastname: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
  };

  // La validation des données du form se fait à l'aide d'un objet errors={}.
  // Si chaque propriétés de cet objet est vide, il y a aucun message d'erreur qui s'affiche dans le formulaire.
  validateData = (name, value) => {

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    // numéro de 10 chiffres sans virgule, sans espace, sans ponctuation et pas de signe + devant le nombre
    const phoneRegex = /^\d{10}$/;

    const { errors } = this.state;
    switch (name) {
      case 'firstname':
        this.setState({
          errors: {
            ...errors,
            firstname: (!value) ? 'champ obigatoire' : '',
          },
        });
        break;
      case 'lastname':
        this.setState({
          errors: {
            ...errors,
            lastname: (!value) ? 'champ obigatoire' : '',
          },
        });
        break;
      case 'email':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              email: (!value) ? 'champ obigatoire' : '',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              email: validEmailRegex.test(value) ? '' : 'Votre email est invalide ! ',
            },
          });
        }
        break;
      case 'confirmEmail':
        this.setState({
          errors: {
            ...errors,
            confirmEmail: (!value) ? 'champ obigatoire' : '',
          },
        });
        break;
      case 'password':
        this.setState({
          errors: {
            ...errors,
            password: (!value) ? 'champ obigatoire' : '',
          },
        });
        break;
      case 'confirmPassword':
        this.setState({
          errors: {
            ...errors,
            confirmPassword: (!value) ? 'champ obigatoire' : '',
          },
        });
        break;
      case 'phone':
        this.setState({
          errors: {
            ...errors,
            phone: phoneRegex.test(value) ? '' : 'Le numéro de téléphone soit comporter 10 chiffres',
          },
        });
        break;
      case 'address':
        this.setState({
          errors: {
            ...errors,
            address: !value ? 'champ obligatoire' : '',
          },
        });
        break;
      default:
        break;
    }

  };

  handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    const { onValueChange } = this.props;
    onValueChange(name, value);
    this.validateData(name, value);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit, emailValue, confirmEmailValue } = this.props;
    const { errors } = this.state;
    // confirmEmail(emailValue, confirmEmailValue, errors);
    // onSubmit();
  };

  handleKeyDown = () => {
    const { onKeyPress } = this.props;
    onKeyPress();
  };

  clickAddressAPI = (evt) => {
    const { changeAddressFromAPI } = this.props;
    changeAddressFromAPI(evt.target.value);
  };

  inputClear = () => {
    const { clearAdressInput } = this.props;
    clearAdressInput();
  };

  handleClose = () => {
    const { closeModal, clearInputs } = this.props;
    const { errors } = this.state;
    closeModal();
    clearInputs();
    clearMessagesErrors(errors);
  };

  render() {

    const {
      showModalAddUser,
      firstnameValue,
      lastnameValue,
      emailValue,
      confirmEmailValue,
      passwordValue,
      confirmPasswordValue,
      addressValue,
      phoneValue,
      addressesAPI,
      showInputApi,
    } = this.props;

    const { errors } = this.state;

    return (
      <Modal className="modal-add-book" show={showModalAddUser} onHide={this.handleClose}>
        <Modal.Header>
          <Container>
            <Row className="justify-content-md-center">
              <Col md={6}>
                <div className="panel panel-login">
                  <div className="panel-heading">
                    <Row>
                      <Col>
                        <a id="login-form-link" >Ajouter un utilisateur</a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                { /* le noValidate désactive les validations HTML5 par defaut au submit, comme ca
                    j'ai le controle sur l'aspect et la convivialité des messages d'erreurs */}
                <Form id="login-form" style={{ display: 'block' }} onSubmit={this.handleSubmit} noValidate>
                  <Firstname
                    firstnameValue={firstnameValue}
                    handleChangeInput={this.handleChangeInput}
                    errorFirstname={errors.firstname}
                  />
                  <Lastname
                    lastnameValue={lastnameValue}
                    handleChangeInput={this.handleChangeInput}
                    errorLastname={errors.lastname}
                  />
                  <Email
                    emailValue={emailValue}
                    confirmEmailValue={confirmEmailValue}
                    handleChangeInput={this.handleChangeInput}
                    errorEmail={errors.email}
                    errorConfirmEmail={errors.confirmEmail}
                  />
                  <Password
                    passwordValue={passwordValue}
                    confirmPasswordValue={confirmPasswordValue}
                    handleChangeInput={this.handleChangeInput}
                    errorPassword={errors.password}
                    errorConfirmPassword={errors.confirmPassword}
                  />
                  <Phone
                    phoneValue={phoneValue}
                    handleChangeInput={this.handleChangeInput}
                    errorPhone={errors.phone}
                  />
                  <Address
                    addressValue={addressValue}
                    handleChangeInput={this.handleChangeInput}
                    handleKeyDown={this.handleKeyDown}
                    inputClear={this.inputClear}
                    addressesAPI={addressesAPI}
                    clickAddressAPI={this.clickAddressAPI}
                    showInputApi={showInputApi}
                    errorAddress={errors.address}
                  />
                  <Form.Group>
                    <Row className="justify-content-md-center">
                      <Col className="text-center" sm={6}>
                        <Button type="submit" name="login-submit" id="login-submit" className="form-control btn btn-login">Ajouter l'utilisateur</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
ModalAddUser.propTypes = {
  showModalAddUser: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  firstnameValue: PropTypes.string.isRequired,
  lastnameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  addressValue: PropTypes.string.isRequired,
  phoneValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  confirmEmailValue: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  clearAdressInput: PropTypes.func.isRequired,
  showInputApi: PropTypes.string.isRequired,
  addressesAPI: PropTypes.array.isRequired,
  changeAddressFromAPI: PropTypes.func.isRequired,
  clearInputs: PropTypes.func.isRequired,
};

export default ModalAddUser;
