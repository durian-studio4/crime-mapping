import React, { useState } from 'react';
//import './Register.scss';
import { useHistory } from "react-router-dom";
import Button from '../../../component/atoms/Button';
import { useSelector, useDispatch } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

const initialState = {
    email: "",
    password: "",
  };
  
  const Register = () => {
    const [{ email, password }, setState] = useState(initialState);
    const history = useHistory();
  
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();
  
    const registerAPI = (data) => dispatch(registerUserAPI(data));

    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setState((state) => ({ ...state, [id]: value }));
      };

    const handleRegisterSubmit = async () => {
        try{
        const res = await registerAPI({ email, password });
        setState({
            email: "",
            password: ""
        });
        history.push("/Login")
        console.log("REGIST SUCCESS", res)
        }catch (error) {
            console.log(error, "error");
            alert("REGISTER FAILED");
        }
    };

    return (
           <div className="auth-container" >
               <div className="auth-card">
                   <p className="auth-title">Register</p>
                   <input className="input" id="email" placeholder="Email" type="text" onChange={handleChangeText} value={email} />
                   <input className="input" id="password" placeholder="Password" type="password" onChange={handleChangeText} value={password} />
                   <Button onClick={handleRegisterSubmit} title="Create" loading={isLoading} />
               </div>
           </div>
    );
};
    


//const reduxState = (state) => ({
//    isLoading: state.isLoading
//});

//const reduxDispatch = (dispatch) => ({
//    registerAPI: (data) => dispatch(registerUserAPI(data))
//});

//export default connect(reduxState, reduxDispatch)(Register);

export default Register;