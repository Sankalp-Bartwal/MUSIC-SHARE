import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateForm from './createform';
import SignLoginSwitch from './signLoginSwitch';
import LoginCredits from './loginCredits';
import "./createAccount.css"

const CreateAccount = () => {
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get("access_token")
    const refresh_token = searchParams.get("refresh_token")

    return(
    <div className='loginBackground'>
        <div className='blurLense'>
            <div className='container'>
                <div className='card1'>
                    <SignLoginSwitch heading={"Not new?"} button={"log in"} navAddress={"/"} />  
                    <LoginCredits />
                </div>
                <div className='card2'>
                    <CreateForm aToken={access_token} rToken={refresh_token}/>
                </div>
            </div>
        </div>
    </div>)
}

export default CreateAccount