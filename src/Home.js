import Footer from './Footer'
import Header from './Header'
import firebase from './FireStore'
import React, { useState } from 'react'
import {useEffect, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, Card, Carousel} from 'react-bootstrap'
import StarRatingComponent from 'react-star-rating-component'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//import * as handTrack from 'handtrackjs';

function App() {
  
/*const img = useRef();

// Load the model.
handTrack.load().then(model => {
  // detect objects in the image.
  console.log("model loaded")
  model.detect(img.current).then(predictions => {
    console.log('Predictions: ', predictions); 
  });
});*/
  //////////////////////////////////////////
  function filterCategorie(e){  
    console.log(e)
    if(e==="tout"){
       setRecettes(recettesCopie)
    }else{
      let recettesCategories=recettesCopie.filter((recette)=>recette.recette.categorie.split("/")[0]===e)
      if(recettesCategories)setRecettes(recettesCategories)
    }

  }
  function filterChef(e){
    let recettesChefs=recettesCopie.filter((recette)=>recette.recette.chef===e)
    if(recettesChefs)setRecettes(recettesChefs)
  }
  //////////////////////////////////////////
  const [recettesCopie, setRecettesCopie]=useState([])
  const [recettes, setRecettes]=useState([])
  const [recetteDetail, setRecetteDetail]=useState(null)
  const [showDetail, setShowDetail]=useState(false)
  const [ingredients ,setIngredients]=useState([])
  const [etatUser, setEtatUser]=useState("deconecter")

  const byValue = (a,b) => b.recette.poid - a.recette.poid

  useEffect(()=>{
    firebase.firestore().collection("Recettes")
    .onSnapshot((data)=>{
      let tabRecettes=[]
     data.forEach((recette)=>{
       tabRecettes.push(
         {
           id:recette.id,
           recette:recette.data()
         }
       )
     })
     const sorted = [...tabRecettes].sort(byValue)
     setRecettes(sorted)
     setRecettesCopie(sorted)
  })
  firebase.firestore().collection("Ingredients")
  .onSnapshot((data)=>{
    let tabIngredients=[]
    data.forEach((ingredient)=>{
       tabIngredients.push({
         id:ingredient.id,
         ingredient:ingredient.data()
       })
    })
    setIngredients(tabIngredients)
  })
  },[])
  

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if (user===null){
        setEtatUser("deconnecter")
      } else {
        setEtatUser("connecter")
      }
    })
  },[])

  function voirDetailFonction(e){
    let a=recettes.find(recette=>recette.id===e.target.name).recette
     setRecetteDetail(a)
     setShowDetail(true)
     firebase.firestore().collection("Recettes")
     .doc(e.target.name).update(
       {poid:a.poid+1}
     )   
  }

  function fermerDetail(e){
    setShowDetail(false)
  }
  ///////////////////////////////////////////////////////////////////////////////

  return (
<div>
<div className="App-header">
<Header filterCategorie={filterCategorie} filterChef={filterChef}></Header>
</div>
<TransformWrapper>
    <TransformComponent>
{
  etatUser==="connecter"?
  <div className="Body">
{
  recettes.map((recette,key)=>(
  <Card border="secondary" style=
  {{
    width:"405px",margin:"1%",alignItems:"center",alignContent:"center",
    boxShadow: "6px -6px -6px -6px teal"
  }}
  key={recette.id}>
          <TransformWrapper>
        <TransformComponent>
        <Card.Img variant="top" src={recette.recette.url} style={{width:"380px", height:"300px"}}/>
        </TransformComponent>
        </TransformWrapper>
    <Card.Body style={{textAlign:"center"}}>
      <Card.Title>{recette.recette.nom}</Card.Title>
      <Card.Text>
        {recette.recette.categorie.split("/")[1]}
        </Card.Text>
      <Card.Link name={recette.id} onClick={voirDetailFonction}>
        Voir détails...
      </Card.Link>
    </Card.Body>
    <Card.Footer>
    <StarRatingComponent 
          name="rate1" 
          starCount={6}
          value={recette.recette.poid/4}
        />

    </Card.Footer>
  </Card>
  ))
}
</div>
:
<div style={{height:"500px",color:"white"}} className="stripe-text">
<Carousel style={{marginBottom:"20%",marginTop:"8%"}}>
  <Carousel.Item interval={2500}>
      <h3 style={{
        color:"red",
        marginLeft:"5%",
        marginBottom:"10%",
        fontSize: "62px",
        textShadow: "-1px -1px #0c0, 1px 1px #060, -3px 0 4px #000",
        fontFamily:"Arial, Helvetica, sans-serif",
        color: "#090",
        padding:"46px",
        fontWeight:"lighter",
        textAlign:"center",
        display:"block"
        }}>
          Bienvenue chez nous !</h3>
  </Carousel.Item>
  <Carousel.Item interval={2500}>
  <h3 style={{
        color:"red",
        marginLeft:"3%",
        marginBottom:"10%",
        fontSize: "62px",
        textShadow: "-1px -1px #0c0, 1px 1px #060, -3px 0 4px #000",
        fontFamily:"Arial, Helvetica, sans-serif",
        padding:"46px",
        fontWeight:"lighter",
        textAlign:"center",
        display:"block"
        }}>
    Mes recettes</h3>
  </Carousel.Item>
  <Carousel.Item interval={2500}>
  <h3 style={{
        marginLeft:"3%",
        marginBottom:"10%",
        fontSize: "62px",
        textShadow: "-1px -1px #0c0, 1px 1px #060, -3px 0 4px #000",
        fontFamily:"Arial, Helvetica, sans-serif",
        color: "#009",
        padding:"46px",
        fontWeight:"lighter",
        textAlign:"center",
        display:"block"
        }}>
    Soyez heureux</h3>
  </Carousel.Item>
</Carousel>
</div>
}

<Modal show={showDetail} className="html">
{recetteDetail?
<Card style={{ width: '100%'}}>
  <Card.Header><Card.Title>{recetteDetail.nom}</Card.Title></Card.Header>
  <Card.Body>
    <Card.Title>Catégorie : {recetteDetail.categorie.split("/")[1]}</Card.Title><br/>
    <Card.Title>Chef      : {recetteDetail.chef}</Card.Title><br/>
    <Card.Title>Nombre personne      : {recetteDetail.nombrePersonnes}</Card.Title><br/>
    <Card.Title>Ingrédients :<br/>
    <ul><br/>
    {ingredients.filter(ingredient=>recetteDetail.ingredients.includes(ingredient.id))
      .map((ingredient,index)=>(
      <li key={index}>{ingredient.ingredient.nom}</li>
    ))}
    </ul>
    </Card.Title><br/>
    <Card.Title>Préparation :</Card.Title><br/>
    <Card.Text>
      {recetteDetail.description}
    </Card.Text>
  </Card.Body>
  <Card.Footer style={{textAlign:"center"}}>
  <Card.Link onClick={fermerDetail}>Fermer</Card.Link>
  </Card.Footer>
</Card>
:"Chargement en cours"
}
</Modal>
</TransformComponent>
          </TransformWrapper>
</div>

  );
}

export default App;
