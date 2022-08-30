import "./recommendCard.css"

const RecommendCard = ({recommended}) =>  {
    //const track = JSON.parse(recommended.track)
    console.log(`Recommended card here!`)
    return(
        <div className="recommendCard">
            <div className="recommendCardImageCont">
                <img src={recommended.track.album.images[0].url} className="recommendCardImage"/>
            </div>
            <div className="recommendCardInfoCont">
                <div className="recommendCardTitle">
                    {recommended.track.name}
                </div>
                <hr></hr>
                <div className="recommendCardArtist">
                    {recommended.track.album.artists[0].name}
                </div>
            </div>
            <div className="recommendCardOptionsCont">
                <div className="recommendCardOption">play</div>
            </div>
            
        </div>
    )
}
export default RecommendCard