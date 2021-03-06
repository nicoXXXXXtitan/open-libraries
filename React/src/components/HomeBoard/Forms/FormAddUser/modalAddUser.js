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
      messFailureSubmit: '',
    },
  };

  // La validation des données du form se fait à l'aide d'un objet errors={}.
  // Si chaque propriétés de cet objet est vide:
  //  - il y a aucun message d'erreur qui s'affiche dans le formulaire.
  //  - Cela autorise  d'arriver dans la case SUBMIT_FORM_ADD_USER du addUserMiddleware
  validateData = (name, value) => {
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    // numéro de 10 chiffres sans virgule, sans espace, sans ponctuation et pas de signe + devant le nombre
    const phoneRegex = /^\d{10}$/;

    const { errors } = this.state;
    const { emailValue, passwordValue } = this.props;

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
              email: 'champ obigatoire',
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
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              confirmEmail: 'champ obigatoire',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              confirmEmail: (value !== emailValue) ? 'Votre email doit être identique' : '',
            },
          });
        }
        break;
      case 'password':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              password: 'champ obigatoire',
            },
          });
        } else if (value.length < 8) {
          this.setState({
            errors: {
              ...errors,
              password: 'Votre mot de passe doit comporter au moins 8 caractères !',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              password: '',
            },
          });
        }
        break;
      case 'confirmPassword':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              confirmPassword: 'champ obigatoire',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              confirmPassword: (value !== passwordValue) ? 'Votre mot de passe doit être identique' : '',
            },
          });
        }
        break;
      case 'phone':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              phone: 'champ obigatoire',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              phone: phoneRegex.test(value) ? '' : 'Le numéro de téléphone soit comporter 10 chiffres',
            },
          });
        }
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

  validateForm = (errors) => {
    let valid = true;
    // Si aucun message d'erreurs dans mon objet alors valid = true
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false )
    );
    return valid;
  };

  handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    const { onValueChange, clearConfirmEmail, clearConfirmPassword } = this.props;
    onValueChange(name, value);
    if (name === 'email') {
      clearConfirmEmail();
    } else if (name === 'password') {
      clearConfirmPassword();
    }
  };

  displayMessFailureSubmit = () => {
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        messFailureSubmit: 'Il y a des erreurs dans le formulaire, corrigez les svp',
      },
    });
  }

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
    this.clearMessagesErrors(errors);
  };

  clearMessagesErrors = (errors) => {
    this.setState({
      errors: {
        ...errors,
        firstname: '',
        lastname: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        messFailureSubmit: '',
      },
    });
  };

  clearMessErrorFormWrong = (errors) => {
    this.setState({
      errors: {
        ...errors,
        messFailureSubmit: '',
      },
    });
  };

  handleClick = () => {
    const { clearMessageErrorFormEmpty } = this.props;
    const { errors } = this.state;
    clearMessageErrorFormEmpty();
    this.clearMessErrorFormWrong(errors);
  }

  //  La validation se fait à chaque changement de champ
  handleBlur = (evt) => {
    const { name, value } = evt.target;
    this.validateData(name, value);
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { errors } = this.state;
    const formValid = this.validateForm(errors);
    if (formValid) {
      onSubmit();
    } else {
      this.displayMessFailureSubmit();
    }
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
      messageErrorFormEmpty,
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
                    handleClick={this.handleClick}
                    handleBlur={this.handleBlur}
                  />
                  <Lastname
                    lastnameValue={lastnameValue}
                    handleChangeInput={this.handleChangeInput}
                    errorLastname={errors.lastname}
                    handleClick={this.handleClick}
                    handleBlur={this.handleBlur}
                  />
                  <Email
                    emailValue={emailValue}
                    confirmEmailValue={confirmEmailValue}
                    handleChangeInput={this.handleChangeInput}
                    errorEmail={errors.email}
                    errorConfirmEmail={errors.confirmEmail}
                    handleClick={this.handleClick}
                    handleBlur={this.handleBlur}
                  />
                  <Password
                    passwordValue={passwordValue}
                    confirmPasswordValue={confirmPasswordValue}
                    handleChangeInput={this.handleChangeInput}
                    errorPassword={errors.password}
                    errorConfirmPassword={errors.confirmPassword}
                    handleClick={this.handleClick}
                    handleBlur={this.handleBlur}
                  />
                  <Phone
                    phoneValue={phoneValue}
                    handleChangeInput={this.handleChangeInput}
                    errorPhone={errors.phone}
                    handleClick={this.handleClick}
                    handleBlur={this.handleBlur}
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
                    handleBlur={this.handleBlur}

                  />
                  <Row className="justify-content-md-center">
                    <Col className="text-center" sm={6}>
                      <h2 className="login-error">{messageErrorFormEmpty}</h2>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col className="text-center" sm={6}>
                      <h2 className="login-error mb-2">{errors.messFailureSubmit}</h2>
                    </Col>
                  </Row>
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
  clearConfirmEmail: PropTypes.func.isRequired,
  clearConfirmPassword: PropTypes.func.isRequired,
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
  messageErrorFormEmpty: PropTypes.string.isRequired,
  clearMessageErrorFormEmpty: PropTypes.func.isRequired,
};

export default ModalAddUser;
