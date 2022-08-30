import "./heart.css"
import heart from "./icons/heart.png"
const Heart = ({}) => {
    return(
        <div className="heartContainer">
            <img src={heart} className="heartImage"/>
        </div>
    )
}
export default Heart