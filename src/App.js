import React from 'react'
import {useEffect, useState} from 'react'
import Home from './Home'
import Admin from './Admin'
import Footer from './Footer'
import firebase from './FireStore'
import './Home.css'
function App() {
  const [admin, setAdmin]=useState("client")
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if (user===null){
        setAdmin("client")
      } else {
        if(user.uid==="ioq5hhMHsZcbDYgkDusoyZ1ihf62"){
          setAdmin("admin")
        }else{
          setAdmin("client")
        }
      }
    })
  },[])
  return (
    <React.Fragment>
      {
        admin==="admin"?
        <Admin></Admin>
        :
        <div className="homeContainer">
        <div className="App-header">
 
        <Home></Home>
          </div>
          <Footer></Footer>
      </div>
      
      }
    </React.Fragment>
  );
}

export default App;
