import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Lastname = ({ lastnameValue, handleChangeInput }) => {
  return (
    <Form.Group>
      <Form.Label>Nom</Form.Label>
      <Form.Control
        type="text"
        name="lastname"
        className="author-firstname"
        placeholder="Nom de l'utilisateur"
        value={lastnameValue}
        onChange={handleChangeInput}
        // autoComplete="on"
        required
      />
    </Form.Group>
    // {errors.lastname.length > 0 && <span className="login-error">{errors.lastname}</span>}
  );
};

Lastname.propTypes = {
  lastnameValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export default Lastname;
