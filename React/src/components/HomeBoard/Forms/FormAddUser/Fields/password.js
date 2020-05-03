import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Password = ({
  passwordValue,
  confirmPasswordValue,
  handleChangeInput,
  errorPassword,
  errorConfirmPassword,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="password"
          className="publication-date"
          placeholder="Mot de passe, minimum 8 caractères"
          value={passwordValue}
          onChange={handleChangeInput}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorPassword.length > 0 && <span className="login-error">{errorPassword}</span>}
      <Form.Group>
        <Form.Label>Confirmer votre mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          className="publication-date"
          placeholder="Mot de passe, minimum 8 caractères"
          value={confirmPasswordValue}
          onChange={handleChangeInput}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorConfirmPassword.length > 0 && <span className="login-error">{errorConfirmPassword}</span>}
    </>
  );
};
Password.propTypes = {
  passwordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorPassword: PropTypes.string.isRequired,
  errorConfirmPassword: PropTypes.string.isRequired,
};
export default Password;
