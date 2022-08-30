import {useSelector} from "react-redux"
import "./homefeed.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Recommend from "./recommend"
import Explore from "./explore"
import SearchBar from "./searchBar"
import { useRef, useEffect } from "react"

const HomeFeed = () => {
    const user = useSelector(state=>state.user)
    console.log(`Homefeed state user: ${JSON.stringify(user)}`)
    const location = useLocation()
    const showRecommended = location.pathname === "/homefeed/recommended"
    const exploreTitleRef = useRef()
    const recommendTitleRef = useRef()
    const navigate = useNavigate()

    const switchToRecommend = () => {
        if(location.pathname !== "/homefeed/recommended"){
            console.log(`Switching to recommend`)
            navigate("../homefeed/recommended")
        }
    }
    const switchToExplore = () => {
        if(location.pathname !== "/homefeed/explore"){
            console.log(`Switching to explore`)
            navigate("../homefeed/explore")
        }
    }

    // useEffect(()=>{
    //     if(location.pathname === "/homefeed/recommended"){
    //         recommendTitleRef.current.style.fontSize = "90%" 
    //     }
    // })
    
    console.log(`User state in homefeed: ${user}`) 
    return(
        <div className="homeContainer">
            <div className="leftBar">
                
            </div>
            <div className="middleContainer">
                <div className="middleTop">
                    <div className="middleMenu">
                        {/* <label>
                            <input type="radio" value={"asd"} name="homeFeedMode" onChange={switchHomeFeed}/>
                            <h1 className="middleMenuOption">Recommeded</h1>
                        </label> */}
                        <h1 className="middleMenuOption" reference={recommendTitleRef} onClick={switchToRecommend} >Recommeded</h1>
                        <h1 className="middleMenuOption" reference={exploreTitleRef} onClick={switchToExplore}>Explore</h1>
                    </div>
                    <SearchBar />
                </div>
                <div className="contentContainer">
                    {
                        showRecommended
                            ? <Recommend />
                            : <Explore />
                    }
                </div>
            </div>
            <div className="rightBar">
                <div className="rightBarMenu">
                    <Link to="/homefeed"><div className="homeImage" ></div></Link>
                    <Link to="/notifications"><div className="notificationImage" /></Link>
                    <Link to="/bookmark"><div className="bookmarkImage" /></Link>
                </div>
                <div className="rightBarProfile">
                    <div className="profileButton"></div>
                    <div className="profileOptionsB"></div>
                </div>
            </div>
        </div>
    )
}
export default HomeFeed