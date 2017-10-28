import * as React from 'react';
import { Button, Menu, MenuItem } from 'material-ui';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { UserMenuProps } from './';
import { MoreVert } from 'material-ui-icons';

interface State {
  anchorEl: HTMLButtonElement;
  open: boolean;
}

export class UserMenu extends Component<UserMenuProps, State> {
  constructor(props: UserMenuProps) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (callback?: () => void) => () => {
    this.setState({ open: false }, callback);
  };

  render() {
    const { handleClick, handleRequestClose, state: { anchorEl, open }, props: { name, onLogout } } = this;
    return (
      <div style={{ textAlign: 'right' }}>
        <Button
          aria-owns={open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={handleClick}
          color='contrast'
        >
          {name} <MoreVert />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onRequestClose={handleRequestClose()}
          PaperProps={{
            style: {
              right: '24px'
            }
          }}
        >
          <MenuItem onClick={handleRequestClose(onLogout)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
};

