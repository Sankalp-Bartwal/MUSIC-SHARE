const GenreCard = ({genre, onGenreChange}) => {
    // return(<div className="genreCard">
    //     <div>{genre}</div>
    // </div>)

    return(
        <label>
            <input type="radio" value={genre} name="genreRadio" onChange={onGenreChange}/>
            <div className="genreCard">{genre}</div>
        </label>
    )
}
export default GenreCard