const ResultCard = ({track}) => {
    const cardOnClick = () => {
        alert(`Click on track ${track.name}`)
    }
    
    console.log(`From track: ${JSON.stringify(track)}`)
    return (
        <div className="resultCard" onClick={cardOnClick}>
            <div className="imageContainer">
                <img src={track.album.images[0].url} className="searchImage"/>
            </div>
            <div className="searchInfoContainer">
                <div className="titleContainer">
                    <p>{track.name}</p>
                    <hr className="horizontalSearch"/>
                    <p className="artistSearch">{track.album.artists[0].name}</p>
                </div>
            </div>
        </div>
    )
} 
export default ResultCard