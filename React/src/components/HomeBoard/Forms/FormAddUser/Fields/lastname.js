import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Lastname = ({
  lastnameValue,
  handleChangeInput,
  errorLastname,
  handleClick,
  handleBlur,
}) => {
  return (
    <>
      {errorLastname.length > 0 && <span className="login-error">{errorLastname}</span>}
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
          onBlur={handleBlur}
          autoComplete="on"
          required
        />
      </Form.Group>
    </>
  );
};

Lastname.propTypes = {
  lastnameValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorLastname: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default Lastname;
