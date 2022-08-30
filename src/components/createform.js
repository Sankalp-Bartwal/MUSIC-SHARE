import {useRef} from "react"
import "./createform.css"
import { getUserSpotify, createUserService } from "../services/music_services"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { newProfileAction } from "../reducers/musicReducers"

const CreateForm = ({aToken, rToken}) => {
    const dispatch = useDispatch()
    const refEmail = useRef(null)
    const refUsername = useRef(null)
    const navigate = useNavigate()
    // const [spotifyDetails, setSpotifyDetails] = useState({
    //     image: null,
    //     spotify_profile: null
    // })
    let [image, spotify_profile] = [null, null]
    const spotifyLogin = () => {
        window.location.href="/api/auth/login"
    }
    console.log(`rendering`)
    // console.log(`spotify details: ${spotifyDetails}`)
    if(aToken){
        getUserSpotify(aToken)
            .then( spotifyData => {
                refEmail.current.value = spotifyData.email
                refEmail.current.readOnly = true
                refUsername.current.value = spotifyData.display_name
                refUsername.current.readOnly = true

                // const userObj = {
                //     image: spotifyData.images.url,
                //     spotify_profile: spotifyData.external_urls.spotify
                // }
                image = spotifyData.images.url
                spotify_profile = spotifyData.external_urls.spotify
                // setSpotifyDetails(userObj)
            })
            .catch(err=>{
                console.log(`Error when getting user's spotify details: ${err}`)
                navigate("/createAccount")
            })
    }
    const createNewUser = event => {
        event.preventDefault()
        if( event.target.password1.value !== event.target.password2.value){
            alert("The passwords don't match")
        } else {
            createUserService({
                first_name: event.target.fName.value,
                last_name: event.target.lName.value,
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password1.value,
                refresh_token: rToken,
                profile_image: image,
                spotify_profile: spotify_profile
            })
            .then(newUser => {
                if(newUser.isEmailUsed){
                    alert("Email is already used")
                } else if(newUser.error) {
                    alert(`Error: ${newUser.error}`)
                } else{
                    console.log(`${newUser.email}`)
                    dispatch(newProfileAction({
                        ...newUser,
                        password: null
                    }))
                    navigate("/homefeed")
                }        
            })
        }
    }
    return(
        <>
            <div className='signUpHeading'>
                <h1>Create Account</h1>
            </div>
            <div className='lineContainer'><hr className='line'/>Link your spotify account<hr className='line'/></div>
            <div>{
                    aToken
                        ? <div className="spotifyButton2">Spotify Linked</div>
                        : <div className='spotifyButton1' onClick={spotifyLogin}/>
                }
            </div>
            <form className='newUserForm' onSubmit={createNewUser}>
                <input placeholder="First Name" className='signUpInput'name="fName"/>
                <input placeholder="Last Name" className='signUpInput' name="lName"/>
                <input placeholder="username" className='signUpInput' name="username" ref={refUsername} required={true}/>
                <input placeholder="email" className='signUpInput' type="email" name="email" ref={refEmail} required={true}/>
                <input placeholder="password" className='signUpInput' type="password" name="password1" required={true}/>
                <input placeholder="confirm password" className='signUpInput' type="password" name="password2" required={true}/>
                <button type='submit' className="createButton">create</button>
            </form>
        </>
    )
}

export default CreateForm