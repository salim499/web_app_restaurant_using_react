import React from 'react'
import './aboutAs.css'
function App(){
   return(
<div className="aboutContainer">
<div class="about-section">
  <h1>Présentation</h1>
  <p>Bonjour à toutes et à tous et bienvenue dans mon site de recettes de cuisine. Je m’appelle HASSOUNA SALIM, j’ai 24 ans et je suis passionnée de cuisine depuis tout petit. En 2005, sans savoir qu’il allait changer ma vie, j’ai créé ce site de recettes de cuisine sur lequel vous pouvez partager, consulter, et acheter des recettes quotidiennes ainsi que des découvertes gourmandes.</p>

</div>
<br/>
<h2 style={{textAlign:"center"}}>Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/salim.jpg" alt="Mike" style={{width:"100%", height:"700px"}}></img>
    </div>
  </div>

  <div class="column">
    <div class="card" style={{width:"100%", height:"700px"}}>
      <div class="container">
      <p><button class="button">
          <br/>
      <p>Ce site est destiné aux chefs de cuisine ainsi que pour le grand public.</p>
        <p>les chefs de cuisine peuvent me connecter via le site ou via mes coordonnées de contact</p>
        <p>les chefs de cuisine peuvent héberger sur ce site leur recettes de cuisines</p>
        <p>les utilisateurs normaux peuvent consulter, enregistrer, acheter des recettes de cuisines </p>
        <p>Email : hassounasalim842@gmail.com</p>
        <p>Numéro téléphone : 07 64 23 42 94</p>
          </button></p>
      </div>
    </div>
  </div>
</div> 
<br/><br/>         
</div>
   )
}

export default App