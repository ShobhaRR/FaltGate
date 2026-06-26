import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../services/api";

function LoginPage(){

    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const[emailError,setEmailError]=useState("");
    const[passwordError,setPasswordError]=useState("");

    const login=async()=>{

        setEmailError("");
        setPasswordError("");

        if(email===""){
            setEmailError("Email required");
            return;
        }

        if(password===""){
            setPasswordError("Password required");
            return;
        }

        try{

            const response=await api.post("/auth/login",{
                email,
                password
            });

            localStorage.setItem("token",response.data.token);

                    if(response.data.role==="ADMIN"){
            navigate("/admin-dashboard");
        }
        else if(response.data.role==="SECURITY"){
            navigate("/security-dashboard");
        }
        else{
            navigate("/dashboard");
        }
            

        }catch(e){

            alert("Invalid login");

        }

    }

    return(

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-title">
                    Login to your account
                </div>

                <div className="input-group">
                    <label>Email</label>

                    <input
                        className="input-box"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <div className="error">
                        {emailError}
                    </div>
                </div>

                <div className="input-group">

                    <label>Password</label>

                    <input
                        className="input-box"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <div className="error">
                        {passwordError}
                    </div>

                </div>

                <button
                    className="primary-btn"
                    onClick={login}
                >
                    Login
                </button>

                <div className="bottom-text">
                    Don't have an account?
                    <Link
                        className="bottom-link"
                        to="/register"
                    >
                        {" "}Register
                    </Link>
                </div>

            </div>

        </div>

    )

}

export default LoginPage;