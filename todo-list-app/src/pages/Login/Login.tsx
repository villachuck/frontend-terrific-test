import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
//import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const navigate = useNavigate();
    //const { setUserId } = useUser();

    const login = () => {
        const loginData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        };

        fetch('http://localhost:3000/api/login', loginData)
        .then(response => response.json())
        .then(data => {
            if(data.status == 200){
                setUserLogged(true);
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('isAuthenticated', 'true');
                getUserInfo(); 
            }
            else{
                setUserLogged(false);
                setShowErrorMsg(true);
            }                     
        });
    };

    const userToken = localStorage.getItem('authToken');
    const getUserInfo = () => {
        const userData = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}` 
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        };

        fetch('http://localhost:3000/api/getUser', userData)
        .then(response => response.json())
        .then(data => {
            if(data.status == 200){
                console.log(data);
                //setUserId(data.id);
                navigate(`/home/${data.id}`);  
            }
            else{
                setUserLogged(false);
                setShowErrorMsg(true);
            }                     
        });
    }

    const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    };
    
    const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    };

    return (
        <div className="login">
            <div className="login-body">
                <div className="login-body-container">
                    <img src="logo-todo-list.png" alt="logo todo list" />
                    <h4>Sign in</h4>
                    <div className="login-form">
                        <label>Email</label>
                        <input type="email" value={userEmail} onChange={getEmail} />
                        <label>Password</label>
                        <input type="password" value={userPassword} onChange={getPassword} /> 
                        {showErrorMsg &&
                            <p className="error-label">Invalid credentials, please try again!</p>
                        }
                        <div className="button-block">
                            <button type="button" className="btn-login" onClick={login}>Login</button>
                        </div>
                        <hr />
                        <p>Don't have an account? <span>Sign up</span></p>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Login;
