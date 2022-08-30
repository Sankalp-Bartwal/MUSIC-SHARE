import { getGenres, getGenreTracks } from "../services/music_services"
import GenreCard from "./genreCard"
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import "./genreList.css"
import { changeGenre } from "../reducers/musicReducers"

const GenreList = ({}) => {
    const [genreList, setGenreList] = useState([])
    const token = useSelector(state=>state.user.token)
    const dispatch = useDispatch()

    const onGenreChange = (event) => {
        getGenreTracks(token, event.target.value)
            .then( response=>{
                //console.log(`GenreTracks: ${JSON.stringify(response)}`)
                dispatch(changeGenre({
                    genre: event.target.value,
                    tracks: response.tracks
                }))
            })
    }

    useEffect(() => {
        if (token){
            getGenres(token)
                .then(genres => {
                console.log(JSON.stringify(genres))
                setGenreList(genres.genres)
            })
        } else {
            console.log("Token = None . In genre List")
        }
    }, [token])
    
    return(<>
        <div className="genreList">
            {
                genreList.map(genre => <GenreCard genre={genre} onGenreChange={onGenreChange} key={genre}/>)
            }            
        </div>
    </>)
}
export default GenreList