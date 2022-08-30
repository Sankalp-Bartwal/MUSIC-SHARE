import "./searchBar.css"
import {useState, useEffect} from "react"
import ResultBox from "./resultBox"
import { searchService } from "../services/music_services"
import {useSelector} from "react-redux"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState(null)

    const token = useSelector(state=>state.user.token)
    
    const onSearchChange = event => {
        setSearchQuery(event.target.value)
    }
    useEffect(()=>{
            console.log(`From bar search query: ${searchQuery}`)
            if(searchQuery!==""){
                searchService(searchQuery, token)
                    .then(result => {
                        // console.log(`Result of the query: ${Object.entries(result.tracks.items[0])}`)
                        // console.log(`Result of the query: ${result.tracks.items[0].artists[0].name}`)
                        setSearchResult(result.tracks.items)
                    })
                    .catch(err=>{
                        console.log(`Error when getting the search query from spotify: ${err}`)
                    })
            }
    }, [searchQuery])
    return(
        <div className="searchContainer">
            <form className="searchBar">
                <input type={"text"} placeholder="search" className="searchInput" value={searchQuery} onChange={onSearchChange}></input>
                {/* <input type="submit" className="searchButton" value=""></input> */}
            </form>
            {
                searchResult && searchQuery !== ""
                    ? <ResultBox searchResult={searchResult}/>
                    : <></>
            }            
        </div>        
    )
} 

export default SearchBar