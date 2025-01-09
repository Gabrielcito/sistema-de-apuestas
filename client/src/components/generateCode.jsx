import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const GenerateCode = () => {
    const [ code, setCode ] = useState("");

    const navigate = useNavigate();
    
    const getCode = async () => {
        const codeRes = await fetch("https://sistema-de-apuestas-server.onrender.com/getCode", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
    
        const codeJson = await codeRes.json();
    
        setCode(codeJson.code)
    
    }

    const joinSession = () => {
        navigate(`/admin/admin-session/${code}`);
    }
    
    
    return (
        <>

        <input className="code" readOnly={true} value={code}/>

        <button className="enterButton" onClick={() => {getCode()}}>
            Generar codigo
        </button> 

        
        <button className="enterButton" onClick={() => {joinSession()}}>
            Ingresar a la sala
        </button>      
        
        </>
    )
}