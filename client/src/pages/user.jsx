import { useRef, useState, cloneElement } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  
  const name = useRef();
  const code = useRef();

  const navigate = useNavigate();

  const [ userName, setUserName ] = useState("");
  const [ children, setChildren ] = useState([]);
  const [ counter, setCounter ] = useState(0);

  const userId = crypto.randomUUID();

  const getIdentifyInput = () => {
    sessionStorage.setItem("name", name.current.value);
    sessionStorage.setItem("userId", userId);
    setUserName(name.current.value);
  }


  const enterGameSession = () => {

    navigate(`/session/${code.current.value}`)

  }

  return (
    <>
      
      <div className="mainContainer">
        
        {
          !userName && 

          <>

            <input className="identify" placeholder="Identificate" ref={name}/>

            <button className="enterButton" onClick={() => {getIdentifyInput()}}>
                Ingresar
            </button>
        
          </>
        }


        {
          userName && 

          <>

            <div className="userNameContainer">

              Nombre: {userName}
    
            </div>

            <input className="identify" placeholder="Codigo de sala" ref={code}/>

            <button className="enterButton" onClick={() => {enterGameSession()}}>
                Ingresar
            </button>
        
          </>
        }
        
        <button className="enterButton" onClick={() => {showNotification()}}>
          notification test
        </button>

      </div>
    </>
  )
}
