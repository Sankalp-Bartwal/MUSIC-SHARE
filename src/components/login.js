import "./createAccount.css"
import SignLoginSwitch from "./signLoginSwitch"
import LoginForm from "./loginform"
import LoginCredits from "./loginCredits"


const Login = () => {
    return(
        <div className='loginBackground'>
            <div className='blurLense'>
                <div className='container'>
                    <div className='card1'>
                        <SignLoginSwitch heading={"New here?"} button={"sign up"} navAddress={"./createAccount"}/>  
                        <LoginCredits />
                    </div>
                    <div className='card2'>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>)
}

export default Login