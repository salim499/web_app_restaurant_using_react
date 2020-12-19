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
    const [imageSrc, setImageSrc]= useState('https://firebasestorage.googleapis.com/v0/b/mesrecettes-89f73.appspot.com/o/images%2F2020-10-19%20at%2012-35-38.png?alt=media&token=b1246017-b292-4ae0-aa26-705568a678f4')
    const [categories, setCategories]= useState([])
    const [ingredients, setIngredients]= useState([])
    const [chefs, setChefs]= useState([])
    const nomRecetteRef=useRef([])
    const nombrePersonneRef=useRef()
    const categorieRecetteRef=useRef()
    const ingredientsRef=useRef()
    const descriptionRef=useRef()
    const chefRef=useRef()
   
    function fermerModalAjoutRecette(){
         props.fermerModalAjoutRecette() 
    }

    function ajoutRecetteFonction(){
  
      let tabIngredientsIds=[]
      ingredientsRef.current.state.value.forEach(ingredient=>{
         tabIngredientsIds.push(ingredient.id)
      })
              let stockageImage=firebase.storage().ref(`images/${image.name}`).put(image);
              stockageImage.on('state_changed',
              snapshot=>{},
              err=>{console.log(err)},
              ()=>{
                firebase.storage()
                .ref(`images`)
                .child(image.name)
                .getDownloadURL()
                .then((url)=>{
                  setImageSrc(url)
                  firebase.firestore().collection('Recettes')
                  .add({
                   nom:nomRecetteRef.current.value,
                   nombrePersonnes:nombrePersonneRef.current.value,
                   chef:chefRef.current.value,
                   categorie:categorieRecetteRef.current.value,
                   ingredients:tabIngredientsIds,
                   poid:0,
                   description:descriptionRef.current.value,
                   url:url
                  }).then(e=>{
                    setMessageRecette("Ajout avec succés")   
                    setCouleurMessageRecette("green")
                }).catch((e)=>{
                  setMessageRecette(e.message)              
                  setCouleurMessageRecette("red")
                })
                }
                  )
              }
              )
    }

    function chargerImage(e){
      if(e.target.files[0]){
        setImage(e.target.files[0])
      }
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
      firebase.firestore().collection("Ingredients")
      .onSnapshot(querySnapshot=>{
        //console.log(querySnapshot)
          let tabIngredients=[]
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              tabIngredients.push(
                  {
                  id:doc.id,
                  value:doc.data().nom,
                  label:doc.data().nom
                  }
                  )
      })
      setIngredients(tabIngredients)
      console.log(ingredients)
      })
      firebase.firestore().collection("Chefs")
      .onSnapshot(querySnapshot=>{
        //console.log(querySnapshot)
          let tabChefs=[]
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              tabChefs.push(
                  {
                  id:doc.id,
                  data:doc.data(),
                  }
                  )
      })
      setChefs(tabChefs)
      console.log(chefs)
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
    <Form.Group controlId="formGridAddress1">
    <Form.Control ref={nombrePersonneRef} placeholder="nombre de personnes" />
  </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Control ref={chefRef} as="select" defaultValue="Chefs">
        {
          chefs.map((chef,index)=>(
            <option name={chef.id}>{chef.data.nom}</option>
          ))
        }
      </Form.Control>
    </Form.Group><br/>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Control ref={categorieRecetteRef} as="select" defaultValue="Catégorie recette...">
        {
          categories.map((categorie,index)=>(
            <option name={categorie.id}>{categorie.id+"/"+categorie.data.type}</option>
          ))
        }
      </Form.Control>
    </Form.Group><br/>
  </Form.Row>
  <Form.Row>

<Form.Group as={Col} controlId="formGridState">
  <Form.Label>Ingrédients recette</Form.Label>
  <Select
ref={ingredientsRef}  
options={ingredients} 
closeMenuOnSelect={false}
components={animatedComponents}
isMulti
/>
</Form.Group><br/>
</Form.Row>
<Form.Row>
<Form.Group>
    <Form.File onChange={chargerImage} id="exampleFormControlFile1" label="Insérer image" />
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group  controlId="formGridAddress1">
      <textarea ref={descriptionRef} type="text" placeholder="description"/>
    </Form.Group>
    </Form.Row>
  <Form.Row>
<Form.Group>
<Button onClick={ajoutRecetteFonction}>Ajouter</Button>
  </Form.Group>
  </Form.Row>
  <Form.Row>
<Form.Group>
<Button onClick={fermerModalAjoutRecette} variant="primary" type="submit">
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