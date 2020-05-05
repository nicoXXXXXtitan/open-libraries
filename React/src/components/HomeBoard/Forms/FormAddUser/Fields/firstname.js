import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Firstname = ({
  firstnameValue,
  handleChangeInput,
  errorFirstname,
  handleClick,
  handleBlur,
}) => {
  return (
    <>
      {errorFirstname.length > 0 && <span className="login-error">{errorFirstname}</span>}
      <Form.Group>
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          className="book-title"
          placeholder="Prénom de l'utilisateur"
          value={firstnameValue}
          onChange={handleChangeInput}
          autoComplete="on"
          onClick={handleClick}
          onBlur={handleBlur}
          required
        />
      </Form.Group>
    </>
  );
};


Firstname.propTypes = {
  firstnameValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorFirstname: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default Firstname;
