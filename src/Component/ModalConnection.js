import {useEffect, useRef} from 'react'
import './ModalConnection.css'
import firebase from '../FireStore'
function App() {

  const emailRef=useRef()
  const mdpRef=useRef()

  function connexionBDD(e){
     firebase.auth().signInWithEmailAndPassword(
       emailRef.current.value,
       mdpRef.current.value
     ).then(()=>{
      readOutLoad(`vous etes bien connecté en tant que ${emailRef.current.value.split('@')[0]}`)
    }).catch(()=>{
       readOutLoad(`echec de connexion essayer à nouveau`)
      })
     
  }
  ////////////////////////////////////////////////////////////////////////////////////////

  function readOutLoad(e){
    let Speech = new SpeechSynthesisUtterance(e)
    Speech.volume = 1 // 0 to 1
    Speech.rate = 1 // 0.1 to 10
    Speech.pitch = 1.5 //0 to 2
    Speech.lang = 'fr-FR'
    window.speechSynthesis.speak(Speech)
}

///////////////////////////////////////////////////////////////////////////////////////////
return (
<form method="get" action="javascript: void(0);" id="login-form" class="login-form" autocomplete="off" role="main">
  <h1 class="a11y-hidden">Login Form</h1>
  <div>
    <label class="label-email">
      <input ref={emailRef} type="email" class="text" name="email" placeholder="Email" tabindex="1" required />
    </label>
  </div>
  <input type="checkbox" name="show-password" class="show-password a11y-hidden" id="show-password" tabindex="3" />
  <label class="label-show-password" for="show-password">
    <span>Afficher mot de passe</span>
  </label>
  <div>
    <label class="label-password">
      <input ref={mdpRef} type="text" class="text" name="password" placeholder="Mot de passe" tabindex="2" required />
    </label>
  </div>
  <input type="submit" value="Se connecter" onClick={connexionBDD}/>

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
</form>
  );
}

export default App;