import React, { useState } from 'react'
import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Modal, Card} from 'react-bootstrap'
import firebase from '../FireStore'
import './email.css'
import Contact from '../contact'
function App(props) {

  function voirMessage(e){
    setShowEmail(true)
    let a=emails.find(email=>email.id===e.target.name).data
    setEmailChoisi(a)
  }
  function fermerVoirMessage(e){
    setShowEmail(false)    
  }
  function ouvrirResponseForm(e){
    setShowEmail(false)
    setShowResponseForm(true)
  }
  function fermerResponseForm(e){
    setShowResponseForm(false)
  }
  function FermerContact(e){
    props.FermerContact()
  }

  const [emails, setEmails]=useState([])
  const [showEmail, setShowEmail]=useState(false)
  const [showResponseForm, setShowResponseForm]=useState(false)
  const [emailChoisi, setEmailChoisi]=useState(null)
  useEffect(()=>{
        firebase.firestore().collection("Emails")
        .onSnapshot(querySnapshot=>{
            let tabEmails=[]
            querySnapshot.forEach(function(doc) {
               let user=firebase.auth().currentUser
                // doc.data() is never undefined for query doc snapshots
                if(doc.data().destination===user.email){
                  tabEmails.push(
                    {
                    id:doc.id,
                    data:doc.data()
                    }
                    )
                }

        })
        setEmails(tabEmails)
        })
},[])
  return (
  <div className="containerEmail">
<div className="Table">
<div style={{marginLeft:"30%"}}>
<button style={{color:"white", cursor:"pointer",size:"20px", background:"green"}} onClick={ouvrirResponseForm}>Envoyer un message</button>
</div>
<br/>
<Table striped bordered hover variant="dark" responsive="xl">
  <thead>
    <tr>
      <th>#</th>
      <th>Nom utilisateur</th>
      <th>adresse mail</th>
      <th>action</th>
    </tr>
  </thead>
  <tbody>
      {emails.map((email,index)=>(
    <tr key={email.id} name={email.id}>
    <td>{index}</td>
    <td>{email.data.nomUtilisateur}</td>
    <td>{email.data.email}</td>
    <td>
      <button name={email.id} onClick={voirMessage}>voir détail..</button>
    </td>
  </tr>
      ))}
  </tbody>
</Table> 
<button onClick={FermerContact}>Fermer</button>
<Modal show={showEmail} style={{marginTop:"5%",marginBottom:"5%", color:"#000"}}>
   {
     emailChoisi?
     <Card  style={{ width: '100%'}}>
     <Card.Header>email : {emailChoisi.email}</Card.Header>
     <br/>
     <Card.Body style={{alignItems:"center" }}>
       <h4>nom utilisateur : {emailChoisi.nomUtilisateur}</h4>
       <br/>
       <h4>objet du message : {emailChoisi.objet}</h4>
       <br/>
      <h4>date et heure : {emailChoisi.heure}</h4>
      <br/>
       <h4>contenu :</h4>
       <Card.Title>{emailChoisi.message}</Card.Title>
     </Card.Body>
     <Card.Footer>
       <button onClick={fermerVoirMessage}>fermer</button>
       <button onClick={ouvrirResponseForm}>répondre</button>
     </Card.Footer>
   </Card>
     :
     null
   }
</Modal >
<Modal show={showResponseForm} style={{marginTop:"10%", color:"#000"}}>
<Contact></Contact>
<button onClick={fermerResponseForm}>fermer</button>
</Modal>
</div>
</div>
  );
}

export default App;