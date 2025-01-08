import { useRef } from "react";


export const User = () => {
  
  const name = useRef();

  const getIdentifyInput = () => {
    sessionStorage.setItem("name", name.current.value)
    console.log(name.current.value);
  }

  return (
    <>
      <main>

        <input className="identify" placeholder="Identificate" ref={name}/>

        <button className="enterButton" onClick={() => {getIdentifyInput()}}>
            Ingresar
        </button>

      </main>
    </>
  )
}
