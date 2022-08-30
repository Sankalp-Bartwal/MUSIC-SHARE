import ResultCard from "./resultCard"
const ResultBox = ({searchResult}) => {
    console.log(`ResultBox: ${searchResult[0].name}`)
    return(
        <div className="resultBox">
            {
                searchResult.map( track => <ResultCard track={track} />)
            }   
        </div>
    )
}
export default ResultBox