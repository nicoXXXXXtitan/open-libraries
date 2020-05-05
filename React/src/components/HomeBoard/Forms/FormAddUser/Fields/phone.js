import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Phone = ({
  phoneValue,
  handleChangeInput,
  errorPhone,
  handleClick,
  handleBlur,
}) => {
  return (
    <>
      {errorPhone.length > 0 && <span className="login-error">{errorPhone}</span>}
      <Form.Group>
        <Form.Label>Téléphone</Form.Label>
        <Form.Control
          type="number"
          name="phone"
          className="type"
          placeholder="N° de téléphone de l'utilisateur"
          value={phoneValue}
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

Phone.propTypes = {
  phoneValue: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  errorPhone: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Phone;
