import "./loginform.css"
import {authUser, getNewToken} from "../services/music_services"
import { newProfileAction } from "../reducers/musicReducers"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginForm = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginSubmit = (event) => {
        event.preventDefault()
        authUser({
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then(result=>{
                if(result.error){
                    alert(`Error when searching for the user`)
                } else if (! result.found){
                    alert(`email not found`)
                } else if(!result.match) {
                    alert(`Password does not match`)
                } else if (result.match){
                    alert(`found`)
                    getNewToken(result.refresh_token)
                        .then( token => {
                            console.log(`From login componenet: token: ${token}`)
                            dispatch(newProfileAction({
                                first_name: result.fname,
                                last_name: result.lname,
                                username: result.username,
                                email: result.email,
                                password: null,
                                refresh_token: result.refresh_token,
                                spotify_profile: result.spotify_profile,
                                image: result.image,
                                token: token
                            }))
                        })
                    navigate("/homefeed/explore")
                }
            })
    }
    return(
        <>
            <div className='signInHeading'>
                <h1>MUSIC SHARE</h1>
            </div>
            <div className='lineContainer'><hr className='line'/>Welcome Back!<hr className='line'/></div>
            <form className='userForm' onSubmit={loginSubmit}>
                <input placeholder="email" className='signInInput' type="email" required={true} name="email"/>
                <input placeholder="password" className='signInInput' type="password" required={true} name="password"/>
                <button type='submit' className="logInButton">log in</button>
            </form>
        </>
    )
}
export default LoginForm