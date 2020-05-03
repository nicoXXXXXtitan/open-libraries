import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';


const Email = ({ emailValue, confirmEmailValue, handleChangeInput }) => {
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
          // autoComplete="on"
          required
        />
      </Form.Group>
      {/* // {errors.email.length > 0 && <span className="login-error">{errors.email}</span>} */}
      <Form.Group>
        <Form.Label>Confirmer votre email</Form.Label>
        <Form.Control
          type="email"
          name="confirmEmail"
          className="publication-date"
          placeholder="Confirmer votre email"
          value={confirmEmailValue}
          onChange={handleChangeInput}
          // onBlur={this.HandleBlur}
          // autoComplete="on"
          required
        />
      </Form.Group>
    {/* // {errors.confirmEmail.length > 0 && <span className="login-error">{errors.confirmEmail}</span>} */}
    </>
  );
};

Email.propTypes = {
  emailValue: PropTypes.string.isRequired,
  confirmEmailValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};
export default Email;
