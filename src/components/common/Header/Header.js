import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import './header.scss';
import { pathKeys } from '../../../constants';
import images from '../../../images';

const Header = () => {
  const activeStyle = { color: 'white', fontWeight: 'bold' };
  const menuHeader = [
    {
      logo: images.logogenk,
      name: 'LOGO',
      pathName: pathKeys.ROOT,
      type: 'link',
    },
    {
      name: 'MOBILE',
      pathName: pathKeys.ABOUT,
      type: 'link',
    },
    {
      name: 'TIN ICT',
      pathName: pathKeys.ABOUT,
      type: 'link',
    },
    {
      name: 'INTERNET',
      pathName: pathKeys.ABOUT,
      type: 'link',
    },
    {
      name: 'KHÁM PHÁ',
      pathName: pathKeys.ABOUT,
      type: 'link',
    },
    {
      name: 'XEM-MUA-LUÔN',
      pathName: pathKeys.ABOUT,
      type: 'link',
    },
    {
      name: '',
      pathName: pathKeys.ABOUT,
      type: 'button',
    },

    // {
    //   name: 'Home',
    //   pathName: pathKeys.ROOT,
    // },
    // {
    //   name: 'Login',
    //   pathName: pathKeys.LOGIN,
    // },
    // {
    //   name: 'About',
    //   pathName: pathKeys.ABOUT,
    // },
  ];
  return (
    <AppBar position="static" className="header-wrapper">
      <Toolbar className="toolBar">
        {menuHeader.map((item, index) => {
          if (item.pathName === pathKeys.ROOT) {
            return (
              <NavLink exact to={item.pathName} className="item-menu" activeStyle={activeStyle} key={`${index}`}>
                <img src={item.logo} alt="Logo" />
              </NavLink>
            );
          } else {
            return (
              <NavLink exact to={item.pathName} className="item-menu" activeStyle={activeStyle} key={`${index}`}>
                {item.name}
              </NavLink>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
