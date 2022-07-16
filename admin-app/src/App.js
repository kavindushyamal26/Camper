import React, { useEffect } from "react";
import "./App.css";
//import { jumbotrone } from "react-bootstrap";
//import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getAllCategory, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders/index";
import Category from "./containers/Category/index";
import NewPage from "./containers/NewPage";
//import PowerBi from "./containers/PowerBi";
//import { getInitialData } from "./actions/initialData.action";
import Reports from "./components/Reports/index";
import PowerBi from "./components/PowerBi/index";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Reports} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/reports" component={Home} />
          <Route path="/powerbi" component={PowerBi} />
          {/* <Route path="/report" component={PowerBi} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
