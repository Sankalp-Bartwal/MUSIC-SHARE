import { getRecommend } from "../services/music_services"
import { useEffect, useState } from "react"
import { changeRecommends } from "../reducers/musicReducers"
import RecommendCard from "./recommendCard"
import { useDispatch, useSelector } from "react-redux"
const Recommend = () => {
    const dispatch = useDispatch()
    const recommendList  = useSelector(state=>Object.values(state.recommended))

    useEffect(()=>{
        getRecommend()
            .then( res => {
                dispatch(changeRecommends(res))
            })
    },[])
    return(
        <div className="recommendContainer">
            {
                recommendList.track === null
                    ? console.log(`recommended state is in initial state`)
                    //: console.log(`${JSON.stringify(recommendList)}`)
                    //:console.log(`${recommendList}`)
                    : console.log(`${typeof(recommendList)}`)
                    //:recommendList.map(recommend => {<RecommendCard recommended={recommend}/>})
            }
        </div>
    )
}
// const Recommend = () => {
//     const [recommendList, setRecommendList] = useState(null)

//     useEffect(()=>{
//         getRecommend()
//             .then( res => {
//                 setRecommendList(res)
//             })
//     },[])
//     return(
//         <div className="recommendContainer">
//             {
//                 recommendList
//                     ?  recommendList.map(recommend => {<RecommendCard recommended={recommend}/>})
//                     :  console.log(`Empty state`)
//             }
//         </div>
//     )
// }
export default Recommend