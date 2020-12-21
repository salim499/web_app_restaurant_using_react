import React, { useEffect, useState } from 'react';
import {useRef} from 'react'
import emailjs from 'emailjs-com';
import firebase from "./FireStore";
import './contact.css'

export default function ContactUs() {
   
  const objet=useRef()
  const message=useRef()
  const destination=useRef()

  const [nom,setNom]=useState(null)
  const [email,setEmail]=useState(null)
  const [id,setId]=useState(null)
  function sendEmail(e) {
    e.preventDefault();  
      emailjs.sendForm('service_5xpvx7j', 'template_i8s4p2e', e.target, 'user_NoRd9oVA83LpLXfI8Y5ET')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
        firebase.firestore().collection('Emails')
        .add({
         id:id,
         nomUtilisateur:nom,
         email:email,
         destination:destination.current.value,
         objet:objet.current.value,
         message:message.current.value,
         heure:new Date().toString()
        })
  }
  useEffect(()=>{
    let user=firebase.auth().currentUser
    let doc=firebase.firestore().collection("utilisateurs").doc(user.uid).get()
     .then((data)=>{
       setNom(data.data().name)
       if(user===null){

       }else{
        setEmail(user.email)
        setId(user.uid)
       }
     })
  },[])
  return (
    <form className="contact-form" onSubmit={sendEmail} className="div">
      <textarea className="inputs" name="message" placeholder="Message" ref={message}/>
      <input className="inputs" type="text" placeholder="Objet" name="subject" ref={objet}/>
      <input className="inputs" type="text" placeholder="Nom utilisateur" name="user_name" value={nom}/>
      <input className="inputs" type="email" placeholder="Email" name="user_email" value={email}/>
      <input className="inputs" type="email" placeholder="Email destination" name="user_email2" ref={destination} required/>
      <input className="inputs" type="submit" value="Envoyer" />
    </form>
  );
}