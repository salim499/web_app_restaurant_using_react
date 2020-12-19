import React, { useState } from 'react'
import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button} from 'react-bootstrap'
import firebase from '../FireStore'
import './Utilisateurs.css'
function App() {

    function supressionUtilisateur(e){
        let a=firebase.auth().currentUser
        console.log(a)
        //a.delete().then(e=>console.log(e.message)).catch(e=>console.log(e.message))
        //let b=utilisateurs.find(e=>{return e.docs.id===a})
    }

    const [utilisateurs, setUtilisateurs]=useState([])
    useEffect(()=>{
        firebase.firestore().collection("utilisateurs")
        .onSnapshot(querySnapshot=>{
            let tabUtilisateurs=[]
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                tabUtilisateurs.push(
                    {
                    docs:doc,
                    data:doc.data()
                    }
                    )
        })
        setUtilisateurs(tabUtilisateurs)
        })
},[])
  return (
<div className="Table">
<Table striped bordered hover variant="dark" responsive="xl">
  <thead>
    <tr>
      <th>#</th>
      <th>Nom</th>
      <th>Prenom</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
      {utilisateurs.map((utilisateur,index)=>(
    <tr key={index}>
    <td>{index}</td>
    <td>{utilisateur.data.name}</td>
    <td>{utilisateur.data.surname}</td>
    <td>{utilisateur.data.email}</td>
  </tr>
      ))}
  </tbody>
</Table>  
</div>
  );
}

export default App;