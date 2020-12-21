/*
    useEffect(()=>{
      firebase.firestore().collection('times').add(
          {
              nom:"salim",
              prenom:"salim"
          }
      )
    },[])
*/

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useEffect, useState } from "react";
import {
  Modal,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import firebase from "./FireStore";
import "./Header.css";
import ModalConnection from "./Component/ModalConnection";
import ModalInscription from "./Component/ModelInscription";
import ModalCompte from "./Component/ModelCompte";

function App(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        setColorConnexion("red");
        setConnexionDeconnexion(true);
        setShowIncription(false);
      } else {
        setColorConnexion("green");
        setConnexionDeconnexion(false);
      }
    });
  }, []);

  const [categories, setCategories]= useState([])
  const [ingredients, setIngredients]= useState([])
  const [chefs, setChefs]= useState([])

  const [showCompte, setShowCompte] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [showInscription, setShowIncription] = useState(false);
  const [colorConnexion, setColorConnexion] = useState("red");
  const [connexionDeconnexion, setConnexionDeconnexion] = useState(true);
  function ouvrirModalConnection() {
    setShowConnection(true);
  }
  function fermerModalConnection() {
    setShowConnection(false);
  }
  function ouvrirModalInscription() {
    setShowIncription(true);
  }
  function fermerModalInscription() {
    setShowIncription(false);
  }
  function ouvrirModalCompte() {
    setShowCompte(true);
  }
  function fermerModalCompte() {
    setShowCompte(false);
  }
  function deconnexionBDD() {
    firebase.auth().signOut().then(console.log("Deconnecxion"));
  }
  /////////////////////////////////////////
  function filterCategorie(e){
    props.filterCategorie(e.target.name)
  }
  function filterChef(e){
    props.filterChef(e.target.name)
  }
  /////////////////////////////////////////
  function navigationFunction(e){
    props.navigationFunction(e.target.name)
  }
  function navigationFunctionVoice(e){
    props.navigationFunction(e)   
  }
  ///////////////////////////////////////////////////////////////////////////////////

  const inscrire = "inscrire";
  const connection = "connecter";
  const deconnection = "déconnecter";
  const moncompte = "compte";

  function readOutLoad(e) {
    let Speech = new SpeechSynthesisUtterance(e);
    Speech.volume = 1; // 0 to 1
    Speech.rate = 1; // 0.1 to 10
    Speech.pitch = 1.5; //0 to 2
    Speech.lang = "fr-FR";
    window.speechSynthesis.speak(Speech);
  }

  const SpeechRegognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRegognition();

  recognition.continuous = false;

  recognition.onstart = function () {
    console.log("en ecoute");
  };

  recognition.onresult = function (e) {
    console.log(e.results[0][0]["transcript"])
    if (connexionDeconnexion) {
      if (
        e.results[0][0]["transcript"].includes(inscrire) ||
        inscrire.includes(e.results[0][0]["transcript"])
      ) {
        setShowIncription(true);
      } else if (
        e.results[0][0]["transcript"].includes(connection)
      ) {
        setShowConnection(true);
      } else if (e.results[0][0]["transcript"].includes("connexion")) {
        setShowConnection(false);
      } else if (e.results[0][0]["transcript"].includes("inscription")) {
        setShowIncription(false);
      } else if (e.results[0][0]["transcript"].includes("fermer")) {
        setShowCompte(false);
      }
    } else {
      if (
        e.results[0][0]["transcript"].includes(deconnection) 
      ) {
        firebase
          .auth()
          .signOut()
          .then(readOutLoad("vous etes déconnecté avec succés"));
      } else if (
        e.results[0][0]["transcript"].includes(moncompte) ||
        moncompte.includes(e.results[0][0]["transcript"])
      ) {
        setShowCompte(true);
      } else if (e.results[0][0]["transcript"].includes("connexion")) {
        setShowConnection(false);
      } else if (e.results[0][0]["transcript"].includes("inscription")) {
        setShowIncription(false);
      } else if (
        e.results[0][0]["transcript"].includes("fermer")
      ) {
        setShowCompte(false);
      }
      else if(e.results[0][0]["transcript"].includes("viande")){
        let categorie=categories.find(e=>e.data.type.includes("viande")).id
        console.log(categorie)
        props.filterCategorie(categorie)
      }
      else if(e.results[0][0]["transcript"].includes("salé")){
        let categorie=categories.find(e=>e.data.type.includes("salé")).id
        console.log(categorie)
        props.filterCategorie(categorie)
      }
      else if(e.results[0][0]["transcript"].includes("Sucré")){
        let categorie=categories.find(e=>e.data.type.includes("sucré")).id
        console.log(categorie)
        props.filterCategorie(categorie)
      }
      else if(e.results[0][0]["transcript"].includes("pâte")){
        let categorie=categories.find(e=>e.data.type.includes("pâtes")).id
        console.log(categorie)
        props.filterCategorie(categorie)
      }
      else if(e.results[0][0]["transcript"].includes("végétarienne" || "végan")){
        let categorie=categories.find(e=>e.data.type.includes("végétarienne")).id
        console.log(categorie)
        props.filterCategorie(categorie)
      }
      else if(e.results[0][0]["transcript"].includes("Samira")){
        let chef=chefs.find(e=>e.data.nom.includes("samira"))
        console.log(chef)
        props.filterChef(chef.data.nom)
      }
      else if(e.results[0][0]["transcript"].includes("Salim")){
        let chef=chefs.find(e=>e.data.nom.includes("hassounasalim"))
        console.log(chef)
        props.filterChef(chef.data.nom)
      }
      else if(e.results[0][0]["transcript"].includes("tout")){
        props.filterCategorie("tout")
      }
      else if(e.results[0][0]["transcript"].includes("contacter")){
        navigationFunctionVoice("contact")
      }
      else if(e.results[0][0]["transcript"].includes("propos")){
        navigationFunctionVoice("about")
      }
      else if(e.results[0][0]["transcript"].includes("accueil")){
        navigationFunctionVoice("accueil")
      }
      else{
        recognition.stop()
        recognition.onend=function(){recognition.start()}
      }
    }
  };
  recognition.start();
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
  })
},[])
  return (
   /* <div class="bodyHome">
      <nav className="navheader">
        <div class="menu-icon">
          <span class="fas fa-bars"></span>
        </div>
        <div class="logo">Acceuil</div>
        <div class="nav-items">
          {connexionDeconnexion ? (
            <React.Fragment>
              <li onClick={ouvrirModalInscription}>
                <a href="#">S'inscrire</a>
              </li>
              <li onClick={ouvrirModalConnection}>
                <a href="#">Se connecter</a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li onClick={ouvrirModalCompte}>
                <a href="#">Mon compte</a>
              </li>
              <li onClick={deconnexionBDD}>
                <a href="#">Se deconnecter</a>
              </li>
            </React.Fragment>
          )}

          <li>
            <a href="#">
              <i
                style={{ color: colorConnexion, fontSize: "36px" }}
                class="fas fa-user"
              ></i>
            </a>
          </li>
        </div>
        <div class="search-icon">
          <span></span>
        </div>
        <div class="cancel-icon">
          <span class="fas fa-times"></span>
        </div>

      </nav>
      <Modal show={showConnection} className="html">
        <ModalConnection></ModalConnection>
        <button
          style={{ color: "black", backgroundColor: "white" }}
          onClick={fermerModalConnection}
        >
          FermerConnexion
        </button>
      </Modal>
      <Modal show={showInscription} className="html">
        <ModalInscription></ModalInscription>
        <button onClick={fermerModalInscription}>Fermer inscription</button>
      </Modal>
      <Modal show={showCompte} className="html">
        <ModalCompte></ModalCompte>
        <button
          style={{ color: "black", backgroundColor: "white" }}
          onClick={fermerModalCompte}
        >
          Fermer
        </button>
      </Modal>
    </div>*/
    <div className="body2">
      <nav>
        <div class="logo">Mes Recettes</div>
        <label for="btn" class="icon">
          <span class="fa fa-bars"></span>
        </label>
        <input className="input" type="checkbox" id="btn"></input>
        <ul>
          {connexionDeconnexion ? (
            <React.Fragment>
              <li onClick={ouvrirModalInscription}>
                <a href="#">S'inscrire</a>
              </li>
              <li onClick={ouvrirModalConnection}>
                <a href="#">Se connecter</a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li onClick={navigationFunction}>
                <a href="#" name="plan">Plan du site</a>
              </li>
              <li onClick={navigationFunction}>
                <a href="#" name="about">À propos de nous</a>
              </li>
              <li onClick={navigationFunction}>
                <a href="#" name="contact">Contacter administrateur</a>
              </li>
          <li>
            <label for="btn-1" class="show">Catégories +</label>
            <a href="#">Catégories</a>
            <input className="input" type="checkbox" id="btn-1"></input>
            <ul>
              {
                categories.map((categorie,key)=>(
                   <li onClick={filterCategorie}><a href="#" key={categorie.id} name={categorie.id}>{categorie.data.type}</a></li>
                ))
              }
                  <li onClick={filterCategorie}><a href="#" key="tout" name="tout">Toutes les recettes</a></li>
            </ul>
          </li>
          <li>
            <label for="btn-2" class="show">Chefs +</label>
            <a href="#">Chefs</a>
            <input className="input" type="checkbox" id="btn-2"></input>
            <ul>
              {
                chefs.map((chef,key)=>(
                  <li onClick={filterChef}><a href="#" key={chef.id} name={chef.data.nom}>{chef.data.nom}</a></li>
                ))
              }
            </ul>
          </li>
              <li onClick={ouvrirModalCompte}>
                <a href="#">Mon compte</a>
              </li>
              <li onClick={deconnexionBDD}>
                <a href="#">Se deconnecter</a>
              </li>
            </React.Fragment>
          )}
          <li>
            <a href="#">
              <i
                style={{ color: colorConnexion, fontSize: "36px" }}
                class="fas fa-user"
              ></i>
            </a>
          </li>
        </ul>
      </nav>
      <Modal show={showConnection} className="html">
        <ModalConnection></ModalConnection>
        <button
          style={{ color: "black", backgroundColor: "white" }}
          onClick={fermerModalConnection}
        >
          FermerConnexion
        </button>
      </Modal>
      <Modal show={showInscription} className="html">
        <ModalInscription></ModalInscription>
        <button onClick={fermerModalInscription}>Fermer inscription</button>
      </Modal>
      <Modal show={showCompte} className="html">
        <ModalCompte></ModalCompte>
        <button
          style={{ color: "black", backgroundColor: "white" }}
          onClick={fermerModalCompte}
        >
          Fermer
        </button>
      </Modal>
    </div>
  );
}

export default App;
