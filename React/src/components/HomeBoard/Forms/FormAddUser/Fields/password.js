import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Password = ({
  passwordValue,
  confirmPasswordValue,
  handleChangeInput,
  errorPassword,
  errorConfirmPassword,
  handleClick,
  handleBlur,
}) => {
  return (
    <>
      {errorPassword.length > 0 && <span className="login-error">{errorPassword}</span>}
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="password"
          className="publication-date"
          placeholder="Mot de passe, minimum 8 caractères"
          value={passwordValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          onBlur={handleBlur}
          autoComplete="on"
          required
        />
      </Form.Group>
      {errorConfirmPassword.length > 0 && <span className="login-error">{errorConfirmPassword}</span>}
      <Form.Group>
        <Form.Label>Confirmer votre mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          className="publication-date"
          placeholder="Retaper votre mot de passe"
          value={confirmPasswordValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          onBlur={handleBlur}
          autoComplete="on"
          required
        />
      </Form.Group>
    </>
  );
};
Password.propTypes = {
  passwordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorPassword: PropTypes.string.isRequired,
  errorConfirmPassword: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Password;
