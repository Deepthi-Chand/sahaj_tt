import React, { PropTypes } from 'react';

import { NavDropdown, MenuItem } from 'react-bootstrap';
import DropdownProfileCard from '../DropdownProfileCard/DropdownProfileCard';
import { links } from '../../shared/links';

const UserDropdownMenu = (props) => {
  const { name, picture, nickname } = props.user;

  return (
    <NavDropdown id="user-menu" title={name}>
      <li>
        <DropdownProfileCard picture={picture} name={name} nickname={nickname} />
      </li>
      <MenuItem divider />
      <li>
        <a onClick={props.logout}>logout</a>
      </li>
    </NavDropdown>
  );
};

UserDropdownMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserDropdownMenu;
