import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Firstname = ({ firstnameValue, handleChangeInput }) => {
  return (
    <Form.Group>
      <Form.Label>Prénom</Form.Label>
      <Form.Control
        type="text"
        name="firstname"
        className="book-title"
        placeholder="Prénom de l'utilisateur"
        value={firstnameValue}
        onChange={handleChangeInput}
        // autoComplete="on"
        required
      />
    </Form.Group>
    // {errors.firstname.length > 0 && <span className="login-error">{errors.firstname}</span>}
  );
};


Firstname.propTypes = {
  firstnameValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export default Firstname;
