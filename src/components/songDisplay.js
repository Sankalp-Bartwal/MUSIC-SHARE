import {useSelector} from "react-redux"
import "./songDisplay.css"
import SongCard from "./songCard"

const SongsDisplay = ({}) => {
    const {genre, tracks} = useSelector(state => state.genre)
    console.log(`From song display the tracks are : ${JSON.stringify(tracks[0])}`)
    return(
        <div className="songDisplayContainer">
            {tracks.map(track=><SongCard track={track}/>)}
        </div>)
}
export default SongsDisplay