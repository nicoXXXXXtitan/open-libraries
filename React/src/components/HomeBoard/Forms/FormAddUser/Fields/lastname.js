import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Lastname = ({ lastnameValue, handleChangeInput, errorLastname, handleClick }) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          className="author-firstname"
          placeholder="Nom de l'utilisateur"
          value={lastnameValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorLastname.length > 0 && <span className="login-error">{errorLastname}</span>}
    </>
  );
};

Lastname.propTypes = {
  lastnameValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorLastname: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Lastname;
