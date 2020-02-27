import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

// les props recus viennent de redux (dossier : store/reducer/formLogin.js )
const ModalLogin = ({
  inputEmailValue,
  inputPasswordValue,
  onValueChange,
  onSubmit,
  loginFailureMessage,
}) => {
  const handleChangeInput = (evt) => {
    // je récupère le name pour changer dynamiquement en fonction du champ le state de mon reducer (dossier : reducer/formLogin)
    const { name, value } = evt.target;
    onValueChange(name, value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form id="login-form" style={{ display: 'block' }} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                className="email"
                type="email"
                name="email"
                placeholder="Email"
                // la value est dans le state de Redux
                value={inputEmailValue}
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="password"
                type="password"
                name="password"
                placeholder="Password"
                // la value est dans le state de Redux
                value={inputPasswordValue}
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Remember Me" name="remember" className="remember" />
            </Form.Group>
            <Form.Group>
              <Row className="justify-content-md-start">
                <Col className="mb-4 " sm={6}>
                  <p className="message-error-text">{loginFailureMessage}</p>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col className="text-center" sm={6}>
                  <Button type="submit" name="login-submit" id="login-submit" className="form-control btn btn-login">Log in</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ModalLogin.propTypes = {
  inputEmailValue: PropTypes.string.isRequired,
  inputPasswordValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loginFailureMessage: PropTypes.string.isRequired,
};

export default ModalLogin;
