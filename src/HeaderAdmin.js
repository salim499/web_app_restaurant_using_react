import firebase from './FireStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal} from 'react-bootstrap'
import ModalAjoutRecette from './Component/ModalAjoutRecette'
import ModalAjoutCategorie from './Component/ModalAjoutCategorie'

function App(props) {

  function deconnexionBDD(){
    firebase.auth().signOut().then(
      console.log("Deconnecxion")
    )
  }

  function changeAffichage(e){
    props.changeAffichage(e.target.name)
}

  function ouvrirModalAjoutRecette(e){
      setShowAjoutRecette(true)
  }
  
  function fermerModalAjoutRecette(){
      setShowAjoutRecette(false)
  }
  function ouvrirModalAjoutCategorie(e){
    setShowAjoutCategorie(true)
}
  function fermerModalAjoutCategorie(){
    setShowAjoutCategorie(false)
  }
  const [showAjoutRecette, setShowAjoutRecette]=useState(false)
  const [showAjoutCategorie, setShowAjoutCategorie]=useState(false)
  return (
<React.Fragment>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Espace Admin</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home" name="utilisateurs" onClick={changeAffichage}>Utilisateurs</Nav.Link>
      <Nav.Link href="#link" name="recettes" onClick={changeAffichage}>Recettes</Nav.Link>
      <Nav.Link href="#link" name="emails" onClick={changeAffichage}>Emails</Nav.Link>
      <Nav.Link href="#link"  onClick={ouvrirModalAjoutRecette}>Ajouter Recette</Nav.Link>
      <Nav.Link href="#link"  onClick={ouvrirModalAjoutCategorie}>Ajouter Categorie</Nav.Link>
      <Nav.Link href="#link"  onClick={deconnexionBDD}>Quitter Admin</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
<Modal show={showAjoutRecette} style={{height:"1000px"}}>
   <ModalAjoutRecette fermerModalAjoutRecette={fermerModalAjoutRecette}></ModalAjoutRecette>
   <ModalAjoutCategorie fermerModalAjoutCategorie={fermerModalAjoutCategorie}></ModalAjoutCategorie>
</Modal>
<Modal show={showAjoutCategorie} style={{height:"1000px"}}>

   <ModalAjoutCategorie fermerModalAjoutCategorie={fermerModalAjoutCategorie}></ModalAjoutCategorie>
</Modal>
</React.Fragment>
  );
}

export default App;
