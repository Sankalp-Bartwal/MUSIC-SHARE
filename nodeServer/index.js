const express = require("express")
const dotenv = require("dotenv")
const axios = require("axios")
const mysql = require("mysql")
const bodyParser = require("body-parser")

dotenv.config()
const jsonParser = bodyParser.json()

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const sql_host_name = process.env.SQL_HOST_NAME
const sql_user = process.env.SQL_USER
const sql_password = process.env.SQL_PASSWORD
const sql_port = process.env.SQL_PORT

const sql_connection = mysql.createConnection({
    host: sql_host_name,
    user: sql_user,
    password: sql_password,
    port: sql_port,
    database: "my_db"
})

sql_connection.connect(err=> {
    if(err){
        console.log(`Got an error when connecting to aws sql server:\n${err}`)
        return
    }
    console.log(`Connected to the server`)
})

const port = 5000

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

//global.access_token = ""

const app = express()

app.get("/api/auth/login", (req, res) => {
    console.log("Runs")
    const scope = "streaming \
                   user-read-email \
                   user-read-private \
                   ugc-image-upload \
                   user-modify-playback-state \
                   user-read-recently-played \
                   user-read-playback-position \
                   playlist-read-collaborative \
                   user-read-playback-state \
                   user-read-currently-playing \
                   "
    const state = generateRandomString(16)

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:3000/api/auth/callback",
        state: state
    })
    res.redirect(`https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`)
})
app.get("/api/auth/callback", (req, res) => {
    console.log("callback runs")
    const code = req.query.code

    console.log("code runs")
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        params: {
            client_id: spotify_client_id,
            client_secret: spotify_client_secret,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/api/auth/callback",
        },
        postHeaders: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        // headers: {
        //     "Authorization": "Basic" + (Buffer.from(spotify_client_id+ ":" + spotify_client_secret).toString("base64")),
        //     "Content-type": "application/x-www-form-urlencoded"
        // },
    }
    axios(authOptions)
        .then(tokenResponse => {
            console.log(`Axios works. Token: ${tokenResponse.data.access_token}`)
            const redirectUrl = new URLSearchParams(
                {
                    access_token: tokenResponse.data.access_token,
                    refresh_token: tokenResponse.data.refresh_token
                }
            )
            res.redirect(`/createAccount?${redirectUrl}`)
        })
})
app.post("/api/refreshToken", jsonParser, (req, res)=> {
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        params: {
            client_id: spotify_client_id,
            client_secret: spotify_client_secret,
            grant_type: "refresh_token",
            refresh_token: req.body.refresh_token
        },
        postHeaders: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    axios(authOptions)
        .then(response => {
            console.log(Object.keys(response.data))
            res.json({
                token: response.data
            })
        })
        .catch( err => {
            res.json({
                error: `Error when getting the token using refresh token ${err}`
            })
        })

})
app.post("/api/createUser", jsonParser, (req, res) => {
    const sql = `INSERT INTO users (fname, lname, username, email, password, refresh_token, image, spotify_profile) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.username}', '${req.body.email}', "${req.body.password}", "${req.body.refresh_token}", "${req.body.profile_image}", "${req.body.spotify_profile}")`
    sql_connection.query(sql, (err, result) => {
        if(err){
            console.log(`Error while inserting new user ${err}`)
            if(err == `Error: ER_DUP_ENTRY: Duplicate entry '${req.body.email}' for key 'users.PRIMARY'`){
                res.json({
                    isEmailUsed: true
                })
            } else {
                res.json({
                    error: err
                })
            }
        } else {
            console.log(result)
            res.json(req.body)
        }
    })
})
app.post("/api/login", jsonParser, (req, res) => {
    const sql = `SELECT * FROM users WHERE email='${req.body.email}'`
    sql_connection.query(sql, (err, result) => {
        if(err){
            console.log(`Error when getting the user: ${err}`)
            res.json({
                error: err
            })
            // res.json({ error: `Error when fetching details from server: ${err}`})
        } else {
            if(result === {}){
                // console.log(`No user found with email: ${req.body.email}`)
                res.json({
                    found: false
                })
            } else {
                // console.log(`Got data for user: ${Object.keys(result[0])}`)
                // console.log(`username: ${result[0].username}`)
                if(req.body.password === result[0].password){
                    res.json({
                        ...result[0],
                        match: true,
                        found: true
                    })
                } else{
                    res.json({
                        match: false,
                        found: true
                    })
                }
            }
        }
    })
})
app.post("/api/createRecommend", jsonParser, (req, res)=> {
    // console.log(`${JSON.stringify(req.body.track)}`)
    // console.log(`${typeof(req.body.track)}`)
    const sql = `INSERT INTO recommend VALUES ('${req.body.email}', '${req.body.username}',`+"'"+JSON.stringify(req.body.track)+"')"
    // console.log(`Query: ${sql}`)
    sql_connection.query(sql, (err, result) => {
        if (err){
            console.log(`Got error when inserting data in recommend: ${err}`)
            res.json({
                error: err
            })
        } else{
            res.json({
                error: null
            })
        }
    })
})
app.get("/api/getRecommend", (req, res)=>{
    const sql = `SELECT * FROM recommend`
    sql_connection.query(sql, (err, result) => {
        if(err){
            console.log(`Error when getting recommend from aws ; ${err}`)
            res.json({
                error: err
            })
        } else {
            if(result === {}){
                res.json({})
            } else {
                //console.log(`Get recommend: ${JSON.stringify(result[1])}`)
                console.log(`${result.length}`)
                console.log(`${typeof(result)}`)
                console.log(`Result without Stringify:${result}`)
                console.log(`${JSON.stringify(result)}`)
                res.json(result)
            }
        }
    })
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})