import * as React from 'react';
import { Button, Menu, MenuItem, WithStyles, withStyles } from 'material-ui';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { UserMenuProps } from './';
import { MoreVert } from 'material-ui-icons';
import { Theme } from 'material-ui/styles';

interface State {
  anchorEl: HTMLButtonElement;
  open: boolean;
}

const styles = (theme: Theme) => ({
  menu: {
    right: '24px'
  },
  menuItem: {
    textAlign: 'right'
  }
});

type Props = UserMenuProps & WithStyles<'menu' | 'menuItem'>;

class UserMenuComponent extends Component<Props, State> {
  constructor(props: Props) {
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
    const { handleClick, handleRequestClose, state: { anchorEl, open }, props: { name, onLogout, classes } } = this;
    return (
      <div>
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
          PaperProps={{ className: classes.menu, style: { position: 'absolute' } }}
        >
          <MenuItem className={classes.menuItem} onClick={handleRequestClose(onLogout)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
};

export const UserMenu = withStyles(styles)(UserMenuComponent);
