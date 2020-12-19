import React, { useState } from 'react'
import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Modal} from 'react-bootstrap'
import firebase from '../FireStore'
import './Utilisateurs.css'
import ModificationRecette from './ModalModificationRecette'
function App() {
  function ouvrirModalAjoutRecette(e){
    let recetteChoix=recettes.find(recette=>(
      recette.id===e.target.name
    ))
    setRcetteModifiable(recetteChoix)
    setShowAjoutRecette(true)
}

function fermerModalAjoutRecette(){
    setShowAjoutRecette(false)
}


function suppressionRecette(e){
      let doc=firebase.firestore().collection("Recettes")
      .doc(e.target.name).delete()
      .then(result=>console.log(result))
        //a.delete().then(e=>console.log(e.message)).catch(e=>console.log(e.message))
        //let b=utilisateurs.find(e=>{return e.docs.id===a})
    }
    const [showAjoutRecette, setShowAjoutRecette]=useState(false)
    const [recettes, setRecettes]=useState([])
    const [recetteChoisi, setRcetteModifiable]=useState()
    useEffect(()=>{
        firebase.firestore().collection("Recettes")
        .onSnapshot(querySnapshot=>{
            let tabRecettes=[]
            querySnapshot.forEach(function(doc) {
              console.log(doc)
                // doc.data() is never undefined for query doc snapshots
                tabRecettes.push(
                    {
                    id:doc.id,
                    data:doc.data()
                    }
                    )
        })
        setRecettes(tabRecettes)
        })
},[])
  return (
<div className="Table">
<Table striped bordered hover variant="dark" responsive="xl">
  <thead>
    <tr>
      <th>#</th>
      <th>Nom recette</th>
      <th>Chef recette</th>
      <th>Poids</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {recettes.map((recette,index)=>(
    <tr key={recette.id} name={recette.id}>
    <td>{index}</td>
    <td>{recette.data.nom}</td>
    <td>{recette.data.chef}</td>
    <td>{recette.data.poid}</td>
    <td>
      <button name={recette.id} onClick={suppressionRecette}>supprimer</button>
      <button name={recette.id} onClick={ouvrirModalAjoutRecette}>modifier</button>
    </td>
  </tr>
      ))}
  </tbody>
</Table> 
<Modal show={showAjoutRecette}>
<ModificationRecette 
fermerModalAjoutRecette={fermerModalAjoutRecette}
recetteChoisi={recetteChoisi}
>  
</ModificationRecette> 
</Modal>
</div>
  );
}

export default App;