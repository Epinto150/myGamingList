import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";



const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  let homePage = <LandingPage {...props} currentUser={currentUser} />

  if (currentUser) {
    homePage = <HomePage {...props} currentUser={currentUser} />
  }

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        {/* <Route exact path="/">
          <h2>Hello from react lol</h2>
        </Route> */}
         <Route 
          exact path="/" 
          render={(props) => homePage} 
         />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
