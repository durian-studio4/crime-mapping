import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Laporan from "../Laporan/Laporan";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

// import ProtectedRoute from "./Protected";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/Dashboard/Laporan-Kejahatan" component={Laporan} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
