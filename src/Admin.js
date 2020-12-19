import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import Utilisateur from './Component/Utilisateurs'
import Recettes from './Component/Recettes'
import {useState, useEffect} from 'react'
function App() {

  function changeAffichage(e){
        setAffichage(e)
  }

  const [affichage, setAffichage]=useState("utilisateurs")
 /* useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if (user===null){
        console.log(user)
      } else {
        if(user.uid==="ioq5hhMHsZcbDYgkDusoyZ1ihf62"){
          setAdmin("admin")
        }else{
          setAdmin("client")
        }
      }
    })
  },[])*/
  return (
    <div>
<HeaderAdmin changeAffichage={changeAffichage}></HeaderAdmin>
{
  affichage==="utilisateurs"?
  <Utilisateur></Utilisateur>
  :
<Recettes></Recettes>
}
</div>
  
  );
}

export default App;