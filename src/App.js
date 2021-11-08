
import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { SETTING } from './constants/setting'
import { connect } from "react-redux"
import Layout from './components/Layout'
import Home from "./../src/Page/Index"
import Login from "./../src/Page/Login"
import ForgetPass from "./../src/Page/ForgetPass"
import Register from "./../src/Page/Register"
import AddBooking from "./Page/AddBooking"
import CustomerSchedule from "./Page/Schedule"
import ListCustomer from './Page/ListCustomers'
import Accreditation from "./../src/Page/Accreditation"
import AccreditationPublic from "./../src/Page/AccreditationPublic"
import Setting from "./../src/Page/Setting"
import { useSelector } from 'react-redux'
import InspectionProcessService from "./services/inspectionProcessService"
import LoginService from "../src/services/loginService";
import NewPublic from "../src/Page/NewPublic";
import Statistical from "./Page/Statistical";
import 'antd/dist/antd.css'; 
import New from "../src/Page/New"
import './common.scss'
import './inputCommon.scss'
import './selectCommon.scss'
import './tableCommon.scss'
import './modalCommon.scss'
import './buttonCommon.scss'
import './dropDownCommon.scss'
import { notification } from "antd";

export const routes = {
  login: {
    path: "/login",
    component: Login,
    isAuth: false
  },
  public_new: {
    path: '/new-public',
    component: NewPublic,
    isAuth: false
  },
  forgotPass:  {
    path: "/forgot-password",
    component: ForgetPass,
    isAuth: false
  },
  bookingSchedule: {
    path: "/booking-schedule",
    component: AddBooking,
    isAuth: false
  },
  register: {
    path: "/register",
    component: Register,
    isAuth: false
  },
  customerSchedule: {
    path: '/schedules',
    component: CustomerSchedule,
    isAuth: true
  },
  listCustomer: {
    path: '/list-customers',
    component: ListCustomer,
    isAuth: true
  },
  accreditation: {
    path: "/accreditation",
    component: Accreditation,
    isAuth: true
  },
  setting: {
    path: "/setting",
    component: Setting,
    isAuth: true
  },
  news: {
    path: "/news",
    component: New,
    isAuth: true
  },
  statistical: {
    path: "/statistical",
    isAuth: true,
    component: Statistical
  }
}

routes.home = {
  path: "/",
  component: Accreditation,
  isAuth: true
}

function App(props) {
  const { member = {} } = props
  const dispatch = useDispatch()
  const { isUserLoggedIn } = member
  const user = useSelector((state) => state.member)
  const stationsColorset = useSelector((state) => state.setting ? state.setting.stationsColorset : "")

  useEffect(()=>{
    if(user.stationsId){
      InspectionProcessService.getDetailById({ id: user.stationsId }).then(result=>{
        if(result){
          dispatch({ type: SETTING, data: result})
        }
      })
    } else {
      const DOMAIN = window.origin.split('://')[1]
      LoginService.getDetailByUrl(DOMAIN).then(result => {
        if(result){
          dispatch({ type: SETTING, data: result})
        }
      })
    }
  },[user.stationsId])


  notification.config({
    closeIcon: () => {},
    duration: 1
  })

  return (
    <div className={stationsColorset}>
      <Router>
        <Switch>
          <Route path={"/accreditation-public"}  component={(props) =>  <AccreditationPublic {...props} />} /> 
          {Object.keys(routes).map((key, index)=>{
            if(isUserLoggedIn && routes[key].isAuth){
              return <Route key={index} extract path={routes[key].path} component={(props) => <Layout  {...props} Component={routes[key].component}  Features="HOME" />} />
            }else if( !routes[key].isAuth ){
              return <Route key={index} extract path={routes[key].path} component={(props) => <Layout  {...props} Component={routes[key].component} Features="LOGIN"/> }/> 
            }
          })}
          {isUserLoggedIn ? <Route component={(props) => <Layout  {...props} Component={Home} Features="HOME" />} />
            : <Route component={(props) =>  <Layout Features="LOGIN"  {...props} Component={Login}/>} /> }
        </Switch>
      </Router>

    </div>
  );
}
const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
