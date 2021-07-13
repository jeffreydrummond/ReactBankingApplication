/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { UserContext } from "../App";

function NavBar() {

    const [isLogin, setLogin] = useState(false)
    const ctx = React.useContext(UserContext);
    const history = useHistory()
    const confirmLogin = () => {
        setLogin(JSON.parse(localStorage.getItem("isLogin") || "false"));
    }

    useEffect(() => {
        console.log("login...")
        confirmLogin()
    });
    const handleClickLogout = (e) => {
        
        e.preventDefault();
        localStorage.removeItem("isLogin");
        console.log("logged in user in LOGOUT HANDLE: " + ctx.loggedInUser);
        confirmLogin()
        history.push('/');
    }

    return (
        <div > 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Drummond Bank</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { 
                            !isLogin ? <>
                            <li className="nav-item">
                                <a className="nav-link" href="#/createaccount/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Earn $100 just for opening an account!"
                                >Create Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/login/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Login"
                                >Login </a>
                            </li>
                            </> : <>
                            <li className="nav-item">
                                <a className="nav-link" href="#/deposit/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Make an account deposit"
                                >Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/withdraw/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Make an account withdrawal"
                                >Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/accountevents/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Review account activity"
                                >Account Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/"
                                data-toggle="tooltip" data-placement="top" title="Logout"
                                onClick={handleClickLogout}
                                >Logout</a>
                            </li>
                           </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}
export default NavBar;
