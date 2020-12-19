import React, {useEffect, useState} from 'react'
import './ModalCompte.css'
import firebase from '../FireStore'
function App() {
  const [emailUtilisateur, setEmailUtilisateur]= useState("")
  const [nomUtilisateur, setNomUtilisateur]= useState("")
  const [prenomUtilisateur, setPrenomUtilisateur]= useState("")
  useEffect(()=>{
   firebase.auth().onAuthStateChanged(user=>{
       if(user===null){

       }else {
        setEmailUtilisateur(user.email)
        firebase.firestore().collection('utilisateurs')
        .doc(user.uid).get()
        .then(dataUser=>{
        setNomUtilisateur(dataUser.data().name)
        setPrenomUtilisateur(dataUser.data().surname)
        })
       }

   })
  },[])
  return (
      <React.Fragment>
<form method="get" action="javascript: void(0);" id="login-form" class="login-form" autocomplete="off" role="main">
  <figure aria-hidden="true">
    <div class="person-body"></div>
    <div class="neck skin"></div>
    <div class="head skin">
      <div class="eyes"></div>
      <div class="mouth"></div>
    </div>
    <div class="hair"></div>
    <div class="ears"></div>
    <div class="shirt-1"></div>
    <div class="shirt-2"></div>
  </figure>
  <h2 className="h2">Nom    : {nomUtilisateur}</h2><br/>
  <h2 className="h2">Prénom : {prenomUtilisateur}</h2><br/>
  <h2 className="h2">Email  : {emailUtilisateur}</h2><br/>
</form>
</React.Fragment>
  );
}

export default App;