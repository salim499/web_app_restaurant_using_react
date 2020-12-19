import 'bootstrap/dist/css/bootstrap.min.css'
import {Form,Col,Button} from 'react-bootstrap'
import firebase from '../FireStore'
import './ModalAjoutRecette.css'
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
function App(props) {

  const animatedComponents = makeAnimated();

    const [messageRecette, setMessageRecette]=useState("")
    const [couleurMessageRecette, setCouleurMessageRecette]=useState("white")
    const [image, setImage]= useState(null)
    const [categories, setCategories]= useState([])
    const [ingredients, setIngredients]= useState([])
    const [chefs, setChefs]= useState([])
    const nomRecetteRef=useRef([])
   
    function fermerModalAjoutCategorie(){
         props.fermerModalAjoutCategorie() 
    }

    function ajoutRecetteFonction(){
            
    firebase.firestore().collection('Categories')
    .add({
        type:nomRecetteRef.current.value,
    }).then(e=>{
         setMessageRecette("Ajout avec succés")   
         setCouleurMessageRecette("green")
    }).catch((e)=>{
         setMessageRecette(e.message)              
         setCouleurMessageRecette("red")
         })
    }


    useEffect(()=>{
      firebase.firestore().collection("Categories")
      .onSnapshot(querySnapshot=>{
        //console.log(querySnapshot)
          let tabCategories=[]
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              tabCategories.push(
                  {
                    id:doc.id,
                    data:doc.data()
                  }
                  )
      })
      setCategories(tabCategories)
      })
    },[])
    
  return (
/*<form method="get" action="javascript: void(0);" id="login-form" class="login-form" autocomplete="off" role="main">
  <div>
  <label class="label-email">
      <input ref={nomRecetteRef} type="text" class="text" name="name" placeholder="Nom" tabindex="3"  />
    </label>
    <label class="label-email">
      <input ref={categorieRecetteRef} type="text" class="text" name="surname" placeholder="Prenom" tabindex="3"  />
    </label>
    <label class="label-email">
      <input ref={IngredientsRecetteRef} type="email" class="text" name="email" placeholder="Email" tabindex="1" />
    </label>
    <label class="label-email">
      <input onChange={chargerImage} type="file" class="text" name="email" placeholder="Email" tabindex="1" />
    </label>
  </div>
<br/>
  <p style={{color:couleurMessageRecette}}>{messageRecette}</p>
  <input type="submit" value="S'inscrire" onClick={ajoutRecetteFonction}/>
  <input style={{backgroundColor:"black"}} type="submit" value="Fermer" onClick={fermerModalAjoutRecette}></input>
</form>*/
<React.Fragment>
<Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Control ref={nomRecetteRef} type="text" placeholder="Entrer nom" />
    </Form.Group>
    </Form.Row>
  <Form.Row>
<Form.Group>
<Button onClick={ajoutRecetteFonction}>Ajouter</Button>
  </Form.Group>
  </Form.Row>
  <Form.Row>
<Form.Group>
<Button onClick={fermerModalAjoutCategorie} variant="primary" type="submit">
    Fermer
  </Button>
  </Form.Group>
  </Form.Row>
  <Form.Row>
<Form.Group>
<p style={{color:couleurMessageRecette}}>{messageRecette}</p>
  </Form.Group>
  </Form.Row>
</Form>
  </React.Fragment>
  );
}

export default App;