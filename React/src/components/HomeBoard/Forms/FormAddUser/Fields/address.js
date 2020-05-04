import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Address = ({
  addressValue,
  addressesAPI,
  showInputApi,
  handleChangeInput,
  handleKeyDown,
  inputClear,
  clickAddressAPI,
  errorAddress,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          type="text"
          name="address"
          className="author-lastname"
          placeholder="Commencer à taper votre adresse"
          autoComplete="off"
          value={addressValue}
          onChange={handleChangeInput}
          onKeyUp={handleKeyDown}
          onClick={inputClear}
        />

        {addressesAPI
          && addressesAPI.map((address) => (
            <Form.Control
              type="text"
              name="address"
              className="address-api"
              readOnly 
              value={address.properties.label}
              key={address.properties.x}
              onClick={clickAddressAPI}
              style={{ display: showInputApi }}
            />
          ))}
      </Form.Group>
      {errorAddress.length > 0 && <span className="login-error">{errorAddress}</span>}
    </>
  );
};

Address.propTypes = {
  addressValue: PropTypes.string.isRequired,
  addressesAPI: PropTypes.array.isRequired,
  showInputApi: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  inputClear: PropTypes.func.isRequired,
  clickAddressAPI: PropTypes.func.isRequired,
  errorAddress: PropTypes.string.isRequired,
};

export default Address;