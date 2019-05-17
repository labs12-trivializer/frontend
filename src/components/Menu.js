import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  // Button 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


// STYLES
import {
  // MenuToggle,
  SideMenu
} from '../styles/menu.css';

const Menu = ({ auth }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  const logout = () => auth.logout();
  const isLoggedIn = auth.isAuthenticated();

  const styles = {
    Toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#8BC34A'
    }
  }

  return (
    <nav>
      {/* <MenuToggle onClick={toggleMenu} menu={menu}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </MenuToggle> */}

      <AppBar position="static" sm>
        <Toolbar style={styles.Toolbar}>
          <Typography variant="h5" color="inherit" >
            Trivializer
          </Typography>
          <IconButton onClick={toggleMenu} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SideMenu menu={menu} onClick={toggleMenu}>
        <h1>TVZ</h1>
        <div>
          <NavLink exact to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/games">Games</NavLink>
        </div>
        <div>
          <NavLink to="/billing">Billing</NavLink>
        </div>
        <div>
          <NavLink to="/profile">Profile</NavLink>
        </div>
        {isLoggedIn && (
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </SideMenu>
    </nav>
  );
};

export default Menu;
