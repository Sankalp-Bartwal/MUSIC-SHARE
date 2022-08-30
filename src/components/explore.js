import "./explore.css"
import GenreList from "./genreList"
import SongsDisplay from "./songDisplay"

const Explore = () => {
    
    
    return(
        <div className='exploreContainer'>
            <GenreList/>
            <SongsDisplay />
        </div>
    )
}
export default Explore