import React, { useState } from 'react';
import Post from './Post';
import Navbar from './Navbar';
import '../Feed.css';
import SideBar from "./SideBar"

function Feed(props) {

  return (
    <div className='feed'>
        <Navbar />
        <SideBar />
       {
         props.users.map(user => (
           <Post username={user.username} caption={user.caption} imgURL={user.imgURL} />
         ))
       }
    </div>
  )
}

export default Feed