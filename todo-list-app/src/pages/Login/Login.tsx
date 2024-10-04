import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [loginForm, setLoginForm] = useState<boolean>(true);
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    const [newUserPassword, setNewUserPassword] = useState<string>('');
    const navigate = useNavigate();
    const startDate = new Date();
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); 
    const day = startDate.getDate().toString().padStart(2, "0");

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
                getUserInfo(data.user); 
            }
            else{
                setUserLogged(false);
                setShowErrorMsg(true);
            }                     
        });
    };

    const userToken = localStorage.getItem('authToken');

    const getUserInfo = (uid: string) => {
        const userData = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}` 
            },
            body: JSON.stringify({
                email: userEmail,
                supabase_uid: uid
            })
        };

        fetch('http://localhost:3000/api/getUser', userData)
        .then(response => response.json())
        .then(data => {
            if(data.status == 200){
                localStorage.setItem('user_id', data.id);
                localStorage.setItem('filter_date', `${year}-${month}-${day}`);
                navigate("/home");  
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

    const getRegisterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserEmail(e.target.value);
    };
    
    const getRegisterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(e.target.value);
    };

    const changeToRegistration = () => setLoginForm(!loginForm);


    const newClient = () => {
        const userData = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: newUserEmail,
                password: newUserPassword
            })
        };

        fetch('http://localhost:3000/api/register', userData)
        .then(response => response.json())
        .then(data => {
            if(data.status == 200){
                console.log(data); 
            }
            else{
                setShowErrorMsg(true);
            }                     
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="login">
            <div className="login-body">
                <div className="login-body-container">
                    <img src="logo-todo-list.png" alt="logo todo list" />
                    <h4>{loginForm ? 'Sign in' : 'Create an account'}</h4>
                    {loginForm ?
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
                        <p>Don't have an account? <span onClick={changeToRegistration}>Sign up</span></p>
                    </div>
                    :
                    <div className="login-form">
                        <label>Email</label>
                        <input type="email" value={newUserEmail} onChange={getRegisterEmail} />
                        <label>Password</label>
                        <input type="password" value={newUserPassword} onChange={getRegisterPassword} /> 
                        {showErrorMsg &&
                            <p className="error-label">Invalid credentials, please try again!</p>
                        }
                        <div className="button-block">
                            <button type="button" className="btn-login" onClick={newClient}>Sign up</button>
                        </div>
                        <hr />
                        <p>Already have an account? <span onClick={changeToRegistration}>Sign in</span></p>
                    </div>
                    }
                </div>    
            </div>
        </div>
    )
}

export default Login;
