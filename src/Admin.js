import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import Utilisateur from './Component/Utilisateurs'
import Recettes from './Component/Recettes'
import Emails from './Component/email'
import {useState} from 'react'
function App() {

  function changeAffichage(e){
        setAffichage(e)
  }

  const [affichage, setAffichage]=useState("utilisateurs")
 
  return (
    <div>
<HeaderAdmin changeAffichage={changeAffichage}></HeaderAdmin>
{
  affichage==="utilisateurs"?
  <Utilisateur></Utilisateur>
  :affichage==="recettes"?
<Recettes></Recettes>
:<Emails></Emails>
}
</div>
  
  );
}

export default App;