import React from 'react';
import { useTranslation } from "react-i18next";
import { Button, Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { routes } from  "./../../App"
import { handleSignout } from '../../actions';
import  IconLogo from "./../../assets/icons/logo.png"

const { Header: HeaderAntd } = Layout;

export default function Header(props) {
  const { t:translation } = useTranslation()
  const history = useHistory()
  const stationsLogo = useSelector((state) => state.setting ? state.setting.stationsLogo : "")
  const dispatch = useDispatch()

  // const pathName = props.location.pathname

  const _onClick = (href) => {
    history.push(href)
  }

  return (
    <HeaderAntd className="header">
      <div className="container">
      <Menu
        mode="horizontal"
        selectedKeys={[routes.home.path]}
      >
        <div className={`d-flex justify-content-center w-100 `}>
        <Menu.Item className="header__logo" onClick={() => history.replace("/")}>{stationsLogo !== ""  && stationsLogo ? (<img src={stationsLogo} className="logo" alt="logo" />) : <img src={IconLogo} className="logo" alt="logo"/> }</Menu.Item>

        <Menu.Item
          className="header__button"
          
        >      
            <Button type="primary" onClick={() => _onClick('/')}>{translation("header.login")}</Button>
            <Button type="primary" onClick={() => dispatch(handleSignout())}>{translation('header.logout')}</Button>
        </Menu.Item>
        </div>
      </Menu>
        </div>
    </HeaderAntd>
  );
}
