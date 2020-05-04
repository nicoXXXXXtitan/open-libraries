import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Phone = ({ phoneValue, handleChangeInput, errorPhone, handleClick }) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Téléphone</Form.Label>
        <Form.Control
          // type="number"
          name="phone"
          className="type"
          placeholder="N° de téléphone de l'utilisateur"
          value={phoneValue}
          onChange={handleChangeInput}
          onClick={handleClick}
          // autoComplete="on"
          required
        />
      </Form.Group>
      {errorPhone.length > 0 && <span className="login-error">{errorPhone}</span>}
    </>
  );
};

Phone.propTypes = {
  phoneValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorPhone: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Phone;
