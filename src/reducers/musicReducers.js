const defaultProfileState = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    refresh_token: null,
    spotify_profile: null,
    image: null,
    token: null
}
const defaultGenreSongs = {
    genre: null,
    tracks: [],
}
const defaultRecommend = {
    // email: null,
    // username: null,
    // track: null
    songs: [{
        email: null,
        username: null,
        track: null
    }]
}

const recommendReducer = (state=defaultRecommend, action) => {
    switch (action.type) {
        case "createRecommend":
            //console.log(`state of initialstate: ${typeof(state.songs)}`)
            //console.log(`Song type: ${typeof(action.songs)}`)
            return action.songs
        default:
            return state    
    }
}
const changeRecommends = (songs) => {
    return({
        type: "createRecommend",
        songs
    })
}
const profileReducer = (state=defaultProfileState, action) => {
    switch (action.type) {
        case "create":
            return action.profile
        default:
            return state
    }
}
const newProfileAction = profile => {
    return({
        type: "create",
        profile
    })
}
const exploreReducer = (state=defaultGenreSongs, action) => {
    switch(action.type){
        case "changeGenre":
            return action.genre
        default:
            return state
    }
}
const changeGenre = genre => {
    return({
        type: "changeGenre",
        genre
    })
}
// const loginReducer = (state=defaultLoginState, action) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// }

export { recommendReducer, changeRecommends, newProfileAction, profileReducer, exploreReducer, changeGenre }