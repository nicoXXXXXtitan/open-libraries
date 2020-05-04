import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Email = ({
  emailValue,
  confirmEmailValue,
  handleChangeInput,
  errorEmail,
  errorConfirmEmail,
  handleClick,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          className="publication-date"
          placeholder="Adresse email de l'utilisateur"
          value={emailValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorEmail.length > 0 && <span className="login-error">{errorEmail}</span>}
      <Form.Group>
        <Form.Label>Confirmer votre email</Form.Label>
        <Form.Control
          type="email"
          name="confirmEmail"
          className="publication-date"
          placeholder="Confirmer votre email"
          value={confirmEmailValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          // onBlur={this.HandleBlur}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorConfirmEmail.length > 0 && <span className="login-error">{errorConfirmEmail}</span>}
    </>
  );
};

Email.propTypes = {
  emailValue: PropTypes.string.isRequired,
  confirmEmailValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorEmail: PropTypes.string.isRequired,
  errorConfirmEmail: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Email;
