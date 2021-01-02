import React from 'react'
import './aboutAs.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
function App(){
   return(
<div className="aboutContainer">
<div class="about-section">
<div className="apropos">
<h2>Présentation</h2>
<h4>Bonjour à toutes et à tous et bienvenue dans mon site de recettes de cuisine. Je m’appelle HASSOUNA SALIM, j’ai 24 ans et je suis passionnée de cuisine depuis tout petit. En 2005, sans savoir qu’il allait changer ma vie, j’ai créé ce site de recettes de cuisine sur lequel vous pouvez partager, consulter, et acheter des recettes quotidiennes ainsi que des découvertes gourmandes.</h4>
</div> 
<br/><br/>
<div class="row">

  <div class="column">
    <div class="card" style={{width:"100%", height:"700px"}}>
      <div class="container">
      <button class="button">
          <br/>
     {/* <h4>Ce site est destiné aux chefs de cuisine ainsi que pour le grand public.</h4>
        <h4></h4>
        <h4>Numéro téléphone : 07 64 23 42 94</h4>
     <h4>Adresse admin : adminadmin@admin.com</h4>*/}
     <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/salim.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3> Gmail : </h3>
      <p>hassounasalim842@gmail.com</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/salim2.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Numéro mobile</h3>
      <p>07 64 23 42 94</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/salim3.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Adresse mail admin</h3>
      <p>adminadmin@admin.com</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</button>
      </div>
    </div>
  </div>
</div>
<br/><br/>
</div>
<br/>       
</div>
   )
}

export default App