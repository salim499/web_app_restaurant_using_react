import Footer from "./Footer";
import Header from "./Header";
import AboutAs from "./aboutAsPage";
import firebase from "./FireStore";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Card, Carousel } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Contact from "./Component/email";
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
  function filterCategorie(e) {
    console.log(e);
    if (e === "tout") {
      setRecettes(recettesCopie);
    } else {
      let recettesCategories = recettesCopie.filter(
        (recette) => recette.recette.categorie.split("/")[0] === e
      );
      if (recettesCategories) setRecettes(recettesCategories);
    }
  }
  function filterChef(e) {
    console.log(e)
    let recettesChefs = recettesCopie.filter(
      (recette) => recette.recette.chef === e
    );
    if (recettesChefs) setRecettes(recettesChefs);
  }

  function navigationFunction(e) {
    setContent(e);
  }
  function recommandationChef(e){
    setShowDetail(false)
    filterChef(e.target.dataset.chef)
  }
  function recommandationCategorie(e){
    setShowDetail(false)
    firebase.firestore().collection("Categories")
    .get()
    .then(querySnapshot=>{
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
    let categorie=tabCategories.find(el=>el.data.type.includes(e.target.dataset.categorie)).id
    console.log(categorie)
    filterCategorie(categorie)
    })
  }
  function recommandationF(e){
    setShowDetail(false);
    filterChef(e.target.dataset.categorie)
    filterCategorie(e.target.dataset.chef)
  }
  function FermerContact(){
    setContent("accueil")
  }
  //////////////////////////////////////////
  const [recettesCopie, setRecettesCopie] = useState([]);
  const [recettes, setRecettes] = useState([]);
  const [datas, setDatas] = useState([]);
  const [recetteDetail, setRecetteDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [etatUser, setEtatUser] = useState("deconecter");
  const [content, setContent] = useState("accueil");

  const byValue = (a, b) => b.recette.poid - a.recette.poid;

  useEffect(() => {
    firebase
      .firestore()
      .collection("Recettes")
      .onSnapshot((data) => {
        let tabRecettes = [];
        data.forEach((recette) => {
          tabRecettes.push({
            id: recette.id,
            recette: recette.data(),
          });
        });
        const sorted = [...tabRecettes].sort(byValue);
        setRecettes(sorted);
        setRecettesCopie(sorted);
      });
    firebase
      .firestore()
      .collection("Ingredients")
      .onSnapshot((data) => {
        let tabIngredients = [];
        data.forEach((ingredient) => {
          tabIngredients.push({
            id: ingredient.id,
            ingredient: ingredient.data(),
          });
        });
        setIngredients(tabIngredients);
      });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        setEtatUser("deconnecter");
      } else {
        setEtatUser("connecter");
      }
    });
  }, []);

  function voirDetailFonction(e) {
    let a = recettes.find((recette) => recette.id === e.target.name).recette;
    setRecetteDetail(a);
    setShowDetail(true);
    firebase
      .firestore()
      .collection("Recettes")
      .doc(e.target.name)
      .update({ poid: a.poid + 1 });
  }

  function fermerDetail(e) {
    setShowDetail(false);
  }

  function enregistrerFonction(e){
    let user=firebase.auth().currentUser.uid
    console.log(user)  
    firebase
    .firestore()
    .collection("MesRecettes")
    .add({id:user, recette:e.target.name})  
  }
  function AfficherMesRecette(mesRecettes){
    let a=[]
    setRecettes([])
    mesRecettes.forEach(e=>{
    firebase.firestore().collection("Recettes")
    .doc(e)
    .get()
    .then((recette)=>{
      let res=recettesCopie.find(e=>e.id===recette.id)
      if(!recettes.includes(re=>re.id===res.id)){
        setRecettes(recettes=>[...recettes,res])
      }
      // setRecettes(recettes=>[...recettes,{id:recette.id, recette:recette.data()}])
    })
    })
  }
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="App-header">
        <Header
          filterCategorie={filterCategorie}
          filterChef={filterChef}
          navigationFunction={navigationFunction}
          AfficherMesRecette={AfficherMesRecette}
        ></Header>
      </div>
      <React.Fragment>
        <TransformWrapper>
          <TransformComponent>
            {etatUser === "connecter" ? (
              <React.Fragment>
                {content === "accueil" ? (
                  <div className="Body">
                    {recettes.map((recette, key) => (
                      <Card
                        border="secondary"
                        style={{
                          width: "405px",
                          margin: "1%",
                          alignItems: "center",
                          alignContent: "center",
                          boxShadow: "6px -6px -6px -6px teal",
                        }}
                        key={recette.id}
                      >
                        <TransformWrapper>
                          <TransformComponent>
                            <Card.Img
                              variant="top"
                              src={recette.recette.url}
                              style={{ width: "380px", height: "300px" }}
                            />
                          </TransformComponent>
                        </TransformWrapper>
                        <Card.Body style={{ textAlign: "center" }}>
                          <Card.Title>{recette.recette.nom}</Card.Title>
                          <h4>
                            {recette.recette.categorie.split("/")[1]}
                          </h4>
                          <Card.Link
                            name={recette.id}
                            onClick={voirDetailFonction}
                          >
                            Voir détails...
                        </Card.Link>
                        <Card.Link
                            name={recette.id}
                            onClick={enregistrerFonction}
                          >
                            Enregistrer...
                        </Card.Link>
                        </Card.Body>
                        <Card.Footer>
                          <StarRatingComponent
                            name="rate1"
                            starCount={6}
                            value={recette.recette.poid / 4}
                          />
                        </Card.Footer>
                      </Card>
                    ))}
                  </div>
                ) : content === "about" ? (
                  <AboutAs></AboutAs>
                ) : content === "contact" ? (
                  <React.Fragment>
                    <Contact FermerContact={FermerContact}></Contact>
                  </React.Fragment>
                ) : null}
                <Modal show={showDetail} className="html">
                  {recetteDetail ? (
                    <Card style={{ width: "100%" }}>
                      <Card.Header>
                        <Card.Title>{recetteDetail.nom}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Catégorie : {recetteDetail.categorie.split("/")[1]}
                        </Card.Title>
                        <br />
                        <Card.Title>Chef : {recetteDetail.chef}</Card.Title>
                        <br />
                        <Card.Title>
                          Nombre personne : {recetteDetail.nombrePersonnes}
                        </Card.Title>
                        <br />
                        <Card.Title>
                          Ingrédients :<br />
                          <ul>
                            <br />
                            {ingredients
                              .filter((ingredient) =>
                                recetteDetail.ingredients.includes(ingredient.id)
                              )
                              .map((ingredient, index) => (
                                <li key={index}>{ingredient.ingredient.nom}</li>
                              ))}
                          </ul>
                        </Card.Title>
                        <br />
                        <Card.Title>Préparation :</Card.Title>
                        <br />
                        <Card.Title>{recetteDetail.description}</Card.Title>
                      </Card.Body>
                        <a data-categorie={recetteDetail.categorie.split("/")[1]} onClick={recommandationCategorie}> <h2>Voir par ici les {recetteDetail.categorie.split("/")[1]}</h2></a>
                        <a data-chef={recetteDetail.chef} onClick={recommandationChef}><h2> Voir par ici les recettes de {recetteDetail.chef}</h2></a>
                        <a data-categorie={recetteDetail.categorie.split("/")[1]} data-chef={recetteDetail.chef} onClick={recommandationF}><h2> Voir par ici les recettes de {recetteDetail.chef.split("/")[1]}</h2></a>
                      <Card.Footer style={{ textAlign: "center" }}>   
                        <Card.Link onClick={fermerDetail}>Fermer</Card.Link>
                      </Card.Footer>
                    </Card>
                  ) : (
                      "Chargement en cours"
                    )}
                </Modal>
              </React.Fragment>
            ) : (
<Carousel style={{width:'1200px',marginLeft:'14%'}}>
  <Carousel.Item interval={1800}>
    <img style={{width:"500px"}}
      className="d-block w-100"
      src="/23918_w600.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
         <h4>Bienvenue !</h4>
      <h5>Connectez vous.</h5>
      <h5>Si vous n'avez pas de compte vous pouvez vous inscrire </h5>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1800}>
    <Carousel.Caption>
    <h4>Bienvenue !</h4>
      <h5>Connectez vous.</h5>
      <h5>Si vous n'avez pas de compte vous pouvez vous inscrire </h5>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1800}>
    <Carousel.Caption>
    <h4>Bienvenue !</h4>
      <h5>Connectez vous.</h5>
      <h5>Si vous n'avez pas de compte vous pouvez vous inscrire </h5>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1800}>
    <Carousel.Caption>
    <h4>Bienvenue !</h4>
      <h5>Connectez vous.</h5>
      <h5>Si vous n'avez pas de compte vous pouvez vous inscrire </h5>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1800}>
    <img style={{width:"500px"}}
      className="d-block w-100"
      src="/54701_w600.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h4>Bienvenue !</h4>
      <h5>Connectez vous.</h5>
      <h5>Si vous n'avez pas de compte vous pouvez vous inscrire </h5>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

              )}


          </TransformComponent>
        </TransformWrapper>
      </React.Fragment>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
