import React, { useState } from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Image from "../../../assets/img/thumbnail/Dashboard.png";

const Dashboard = () => {
  const [isRedirect, setRedirect] = useState(false);

  const logOut = () => {
    setRedirect(true);
    localStorage.clear();
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <h1 className="header">CRIME MAPPING</h1>
      <div className="list">
        <ul>
          <li>
            <Link to="/Dashboard/Laporan-Kejahatan">Laporan Kejahatan</Link>
          </li>
          <li onClick={logOut}>
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
      <img src={Image} alt="dashboard_image" width="100%" />
    </div>
  );
};

const reduxState = (state) => ({
  userData: state.user,
});

export default connect(reduxState)(Dashboard);
