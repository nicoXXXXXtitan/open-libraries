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

const validateData = (name, value, errors) => {
  switch (name) {
    case 'firstname':
      if (!value) {
        errors.firstname = 'champ obligatoire';
      }
      else if (value.length < 3) {
        errors.firstname = 'Votre prénom doit comporter au moins 4 lettres !';
      }
      else {
        errors.firstname = '';
      }
      break;
    default:
      break;
  }
};

class ModalAddUser extends React.Component {

  // Grace au plugin babel : @babel/plugin-proposal-class-properties
  // on peut définir des propriétés directement dans la classe
  // ICI le this est disponible
  state = {
    errors: {
      firstname: '',
    },
  };

  handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    const { onValueChange } = this.props;
    const { errors } = this.state;

    onValueChange(name, value);
    validateData(name, value, errors);
  };

  handleBlur = () => {

  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
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
    closeModal();
    clearInputs();
  };

  render() {

    const {
      showModalAddUser,
      firstnameValue,
      lastnameValue,
      passwordValue,
      addressValue,
      phoneValue,
      emailValue,
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
                        <a id="login-form-link">Ajouter un utilisateur</a>
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
                <Form id="login-form" style={{ display: 'block' }} onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      className="book-title"
                      placeholder="Prénom de l'utilisateur"
                      value={firstnameValue}
                      onChange={this.handleChangeInput}
                      onBlur={this.handleBlur}
                      // autoComplete="on"
                      // required
                    />
                  </Form.Group>
                  {errors.firstname.length > 0 && <span className="login-error">{errors.firstname}</span>}
                  <Form.Group>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      className="author-firstname"
                      placeholder="Nom de l'utilisateur"
                      value={lastnameValue}
                      onChange={this.handleChangeInput}
                      // autoComplete="on"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="publication-date"
                      placeholder="Adresse email de l'utilisateur"
                      value={emailValue}
                      onChange={this.handleChangeInput}
                      // autoComplete="on"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      className="publication-date"
                      placeholder="Mot de passe, minimum 8 caractères"
                      value={passwordValue}
                      onChange={this.handleChangeInput}
                      // autoComplete="on"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      className="type"
                      placeholder="N° de téléphone de l'utilisateur"
                      value={phoneValue}
                      onChange={this.handleChangeInput}
                      // autoComplete="on"
                      required
                    />
                  </Form.Group>
                  <Form.Group>

                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      className="author-lastname"
                      placeholder="Commencer à taper votre adresse"
                      autoComplete="off"
                      value={addressValue}
                      onChange={this.handleChangeInput}
                      onKeyUp={this.handleKeyDown}
                      onClick={this.inputClear}
                    />

                    {addressesAPI
                      && addressesAPI.map((address) => (
                        <Form.Control
                          type="text"
                          name="address"
                          className="address-api"
                          readOnly 
                          value={address.properties.label}
                          key={address.properties.x}
                          onClick={this.clickAddressAPI}
                          style={{ display: showInputApi }}
                        />
                      ))}
                  </Form.Group>
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
  addressValue: PropTypes.string.isRequired,
  phoneValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  clearAdressInput: PropTypes.func.isRequired,
  showInputApi: PropTypes.string.isRequired,
  addressesAPI: PropTypes.array.isRequired,
  changeAddressFromAPI: PropTypes.func.isRequired,
  clearInputs: PropTypes.func.isRequired,
};

export default ModalAddUser;
