import "./signLoginSwitch.css"
import { useNavigate } from "react-router-dom"

const SignLoginSwitch = ({heading, button, navAddress}) => {
    const navigate = useNavigate()
    const switchAddress = () => {
        navigate(navAddress)
    }
    
    return(
        <>
            <h1>{heading}</h1>
            <div className='loginButton' onClick={switchAddress}>
                {button}
            </div>
        </>
    )
}
export default SignLoginSwitch