import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import Button from "../../../component/atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
//import { actionUsername } from '../../../config/redux/action';

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [{ email, password }, setState] = useState(initialState);
  const history = useHistory();

  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const loginAPI = (data) => dispatch(loginUserAPI(data));

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const handleLoginSubmit = async () => {
    try {
      const res = await loginAPI({ email, password });
      localStorage.setItem("userData", JSON.stringify(res));
      setState({
        email: "",
        password: "",
      });
      history.push("/Dashboard");
      console.log("LOGIN SUCCESS", res);
      return res;
    } catch (error) {
      console.log(error, "error");
      alert("LOGIN FAILED");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Welcome</p>
        <input
          className="input"
          id="email"
          placeholder="Email"
          type="text"
          onChange={handleChangeText}
          value={email}
        />
        <input
          className="input"
          id="password"
          placeholder="Password"
          type="password"
          onChange={handleChangeText}
          value={password}
        />
        <div className="auth-button">
          <Button
            onClick={handleLoginSubmit}
            title="Login"
            loading={isLoading}
          />
          <Button onClick={() => history.push("/Register")} title="Register" />
        </div>
      </div>
    </div>
  );
};

//const reduxState = (state) => ({
//    popupProps: state.popup,
//    userName: state.user
//})

//const reduxDispatch = (dispatch) => ({
//    changeUserName: () => dispatch(actionUsername())
//})

// const reduxState = (state) => ({
//   isLoading: state.isLoading,
// });

// const reduxDispatch = (dispatch) => ({
//   loginAPI: (data) => dispatch(loginUserAPI(data)),
// });

// export default connect(reduxState, reduxDispatch)(Login);

export default Login;
