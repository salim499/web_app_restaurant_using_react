
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from '../FireStore'
import './ModalInscription.css'
import { useRef, useState } from 'react'
function App() {

    const [messageInscription, setMessageInscription]=useState("")
    const [couleurMessageInscription, setCouleurMessageInscription]=useState("white")
    const nomRef=useRef()
    const prenomRef=useRef()
    const emailRef=useRef()
    const mdpRef=useRef()


    function inscriptionFonction(){
        firebase.auth().createUserWithEmailAndPassword(
            emailRef.current.value,
            mdpRef.current.value
            ).then(cred=>{
              firebase.firestore().collection('utilisateurs')
              .doc(cred.user.uid)
              .set({
                name:nomRef.current.value,
                surname:prenomRef.current.value
              }).then(e=>{
                setMessageInscription("Inscription avec succés")   
                setCouleurMessageInscription("green")
              })
            }).catch((e)=>{
              if(e.message==='The email address is already in use by another account.'){
                setMessageInscription(
                  "cette adresse mail est déjà prise par un autre utilisateur."
                  )
              } else if (e.message==='Password should be at least 6 characters'){
                setMessageInscription(
                  "Le mot de passe doit contenir au moins 6 charactères."
                )
              } else if (e.message==="The email address is badly formatted."){
                setMessageInscription("l'email saisi n'est pas dans le bon format.")
              }
              
              setCouleurMessageInscription("red")
            })
    }
    
  return (
<form method="get" action="javascript: void(0);" id="login-form" class="login-form" autocomplete="off" role="main">
  <div>
  <label class="label-email">
      <input ref={nomRef} type="text" class="text" name="name" placeholder="Nom" tabindex="3"  />
    </label>
    <label class="label-email">
      <input ref={prenomRef} type="text" class="text" name="surname" placeholder="Prenom" tabindex="3"  />
    </label>
    <label class="label-email">
      <input ref={emailRef} type="email" class="text" name="email" placeholder="Email" tabindex="1" />
    </label>
  </div>
  <input type="checkbox" name="show-password" class="show-password a11y-hidden" id="show-password" tabindex="3" />
  <label class="label-show-password" for="show-password">
    <span>Afficher mot de passe</span>
  </label>
  <div>
    <label class="label-password">
      <input ref={mdpRef} type="text" class="text" name="password" placeholder="Mot de passe" tabindex="2"/>
    </label>
  </div>
<br/>
  <p style={{color:couleurMessageInscription}}>{messageInscription}</p>
  <input type="submit" value="S'inscrire" onClick={inscriptionFonction}/>
</form>
  );
}

export default App;