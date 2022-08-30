import axios from "axios"

const getUserSpotify = (token) => {
    return(
        axios
            .get("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response=>response.data)
    )
}
const createUserService = userObj => {
    // console.log(userObj)
    return(
        axios
            .post("http://localhost:3000/api/createUser", userObj)
            .then( response => response.data)
            .catch(err=>{
                console.log(`Server Error: Unable to create new user\nError: ${err}`)
            })
            
    )
}
const authUser = loginFormData => {
    return(
        axios
            .post("/api/login", loginFormData)
            .then( response => response.data)
            .catch( err => {
                console.log(`Error when making user login: ${err}`)
            })
    )    
}
const searchService = (searchQuery, token) => {
    console.log(`Searchservice: ${searchQuery}`)
    const urlParam = new URLSearchParams({
        query: `${searchQuery}`,
        type: "track",
        limit: 50
    })
    console.log(`From the service: https://api.spotify.com/v1/search?${urlParam}`)
    return(
        axios
            .get(`https://api.spotify.com/v1/search?${urlParam}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response=>response.data)
            .catch(err => {
                console.log(`Got error when searching at spotify: Error: ${err}`)
                if(err.response.status === 401){
                    console.log(`bad token`)
                }
            })
    )
}
const getNewToken = (refresh_token) => {
    return(
        axios
            .post("/api/refreshToken", {
                refresh_token
            })
            .then( response => {
                console.log(`From getNewToken: ${response.data.token.access_token}`)
                return (response.data.token.access_token)
            })
            .catch( err => {
                console.log(`Error received from node server when it was getting token from spotify`)
            })
    )
}
const getGenres = (token) => {
    return(
        axios
            .get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.data)
            .catch(err=> {
                console.log(`Error when getting the genre seeds from spotify: ${err}`)
            })

    )
}
const getGenreTracks = (token, genre) => {
    const urlParam = new URLSearchParams({
        seed_genres: genre,
        limit: 20
    })
    return(
        axios
            .get(`https://api.spotify.com/v1/recommendations?${urlParam}`, {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response=>response.data)
            .catch(err=>{
                console.log(`Error when getting songs from a genre: ${err}`)
            })
    )
}
const createRecommend = (email, track, username) => {
    return(
        axios
            .post(`/api/createRecommend`, {
                email,
                username,
                track
            })
            .then(response => response.data)
            .catch(err=>{
                console.log(`Error when creating recommend - music-services ${err}`)
            })
    )
}
const getRecommend = () => {
    return(
        axios
            .get(`/api/getRecommend`)
            .then(response=>response.data)
            .catch( err => {
                console.log(`Error Music Service when getting recommended: ${err}`)
            })
    )
}
export {createRecommend, getRecommend, getGenreTracks, getUserSpotify, createUserService, authUser, searchService, getNewToken, getGenres}