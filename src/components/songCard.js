import "./songCard.css"
import Heart from "./heart"
import {useRef} from "react"
import {useSelector} from "react-redux"
import { createRecommend } from "../services/music_services"

const SongCard = ({track}) => {
    const email = useSelector(state => state.user.email)
    const username = useSelector(state=>state.user.username)
    const recommendRef = useRef()

    const onClickRecommend = (event)=> {
        createRecommend(email, track, username)
            .then(response => {
                if (!response.error)
                {    console.log(`Created the recommend`)
                    recommendRef.current.innerHTML = `recommended`
                    recommendRef.current.onClick = () => {
                        alert(`Already recommended`)
                }} else {
                    console.log(`Error when creating the recommend ${response.error}`)
                }
            })
    }
    return(
        <div className="songCard">
            <div className="songCardImageCont">
                <img src={track.album.images[0].url} className="songCardImage"/>
            </div>
            <div className="songCardInfoCont">
                <div className="songCardTitle">
                    {track.name}
                </div>
                <hr></hr>
                <div className="songCardArtist">
                    {track.album.artists[0].name}
                </div>
            </div>
            <div className="songCardOptionsCont">
                <div className="songCardOption">play</div>
                <div className="songCardOption" onClick={onClickRecommend} ref={recommendRef}>recommend</div>
            </div>
            
        </div>
    )
}
export default SongCard