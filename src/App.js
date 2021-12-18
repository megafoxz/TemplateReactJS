
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import Layout from "./../src/components/Layout"
import Home from "./../src/Page/Index"
import Login from "./../src/Page/Login"
import 'antd/dist/antd.css'; 
export const routes = {
  login: {
    path: "/login",
    component: Login,
    isAuth: true
  }
}

routes.home = {
  path: "/",
  component: Home,
  isAuth: true
}

function App(props) {
  const { member = {} } = props
  const { isUserLoggedIn } = member

  return (
    <div>
      <Router>
        <Switch>      
          {Object.keys(routes).map((key, index)=>{
            if(isUserLoggedIn && routes[key].isAuth){
              return <Route key={index} extract path={routes[key].path} component={(props) => <Layout  {...props} Component={routes[key].component} />} />
            }else if( !routes[key].isAuth ){
              return <Route key={index} extract path={routes[key].path} component={(props) => <Layout  {...props} Component={routes[key].component} /> }/> 
            }
            return null
          })}
           <Route component={(props) => <Layout  {...props} Component={Home} Features="HOME" />} />
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
