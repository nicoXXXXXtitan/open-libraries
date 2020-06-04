import React from 'react';
import PropTypes from 'prop-types';
import 'src/components/HomeUser/PageHome/NavCategory/navCategory.scss';
import { Nav } from 'react-bootstrap';

const NavCategory = ({ listTypes, getCategory }) => {

  const onClick = (evt) => {
    evt.preventDefault();
    getCategory(evt.target.name);
  };

  return (
    <Nav className="navCategory mt-2 ">
      {listTypes && listTypes.map((item) => (
        <Nav.Item>
          <Nav.Link
            className="navItems"
            key={item.type}
            name={item.type}
            onClick={onClick}
          >
            {item.type}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

NavCategory.propTypes = {
  listTypes: PropTypes.array.isRequired,
  getCategory: PropTypes.func.isRequired,
};

export default NavCategory;
