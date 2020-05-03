import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Password = ({ passwordValue, confirmPasswordValue, handleChangeInput }) => {
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
      {/* {errors.password.length > 0 && <span className="login-error">{errors.password}</span>} */}
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
      {/* {errors.confirmPassword.length > 0 && <span className="login-error">{errors.confirmPassword}</span>} */}
    </>
  );
};
Password.propTypes = {
  passwordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};
export default Password;
