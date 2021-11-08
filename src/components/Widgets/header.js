import React from 'react';
import { useTranslation } from "react-i18next";
import { Button, Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { routes } from  "./../../App"
import { handleSignout } from '../../actions';
import  IconLogo from "./../../assets/icons/logo.png"

const { Header: HeaderAntd, Sider } = Layout;

export default function Header(props) {
  const { t:translation } = useTranslation()
  const history = useHistory()
  const stationsLogo = useSelector((state) => state.setting ? state.setting.stationsLogo : "")
  const { Features } = props
  const dispatch = useDispatch()

  const pathName = props.location.pathname

  const FEATURE = {
    login: [
        {
            name: translation('header.new'),
            href: routes.public_new.path
        },
        {
            name: translation("header.makeAnAppointment"),
            href: routes.bookingSchedule.path
        }
    ],
    home: [
      {
        name: translation("header.accreditation"),
        href: routes.accreditation.path,
      },
      {
        name: translation('header.customers'),
        href: routes.listCustomer.path,
      },
      {
        name: translation('header.schedule'),
        href: routes.customerSchedule.path,
      },
      {
        name: translation("listCustomers.statistical"),
        href: routes.statistical.path
      },
      {
        name: translation('header.new'),
        href: routes.news.path,
        isNoHref: false
      },
      {
        name: translation('header.establish'),
        href: routes.setting.path,
      }
    ]
  }

  const _onClick = (href) => {
    history.push(href)
  }

  return (
    <HeaderAntd className="header">
      <div className="container">
      <Menu
        mode="horizontal"
        selectedKeys={[routes.accreditation.path]}
      >
        <div className={`d-flex justify-content-center w-100 ${Features !== "LOGIN" ? 'header__container' : ''}`}>
          <Menu.Item className="header__logo" onClick={() => history.replace("/")}>{stationsLogo !== ""  && stationsLogo ? (<img src={stationsLogo} className="logo" alt="logo" />) : <img src={IconLogo} className="logo" alt="logo"/> }</Menu.Item>

        <div className="d-flex w-100 justify-content-center header_content">
        {
          Features === "LOGIN" ? FEATURE.login.map((item, index) => (
              <Menu.Item className={pathName === item.href ? 'active' : '' } onClick={() => _onClick(item.href)} key={item.href}>{item.name}</Menu.Item>
          )) : FEATURE.home.map((item, i) => (
            <>
              <Menu.Item
                  className={pathName === item.href ? 'active' : '' }
                  onClick={() => {
                  if( !item.isNoHref){
                    _onClick(item.href)
                  }
                }} 
                key={item.href}
              >
                {item.name}
              </Menu.Item>
            </>
          ))
        }
        </div>
        <Menu.Item
          className="header__button"
          style={{paddingRight: Features === "LOGIN" ? 0 : 20 }}
        >
          {
            Features === "LOGIN" ?
              <Button type="primary" onClick={() => _onClick('/')}>{translation("header.login")}</Button>
            : <Button type="primary" onClick={() => dispatch(handleSignout())}>{translation('header.logout')}</Button>
          }
        </Menu.Item>
        </div>
      </Menu>
        </div>
    </HeaderAntd>
  );
}
