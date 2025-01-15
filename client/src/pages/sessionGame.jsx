import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import io from 'socket.io-client';

export const Session = () => {

    const socket = io("http://localhost:4000");

    const { code } = useParams();

    const [ players, setPlayers ] = useState([]);
    const [ playerJoined, setPlayerJoined ] = useState(false);


    const name = sessionStorage.getItem("name");
    const userId = sessionStorage.getItem("userId");


    useEffect(() => {

        if(!playerJoined){
            socket.emit('session_join', [code, name, userId]);
            setPlayerJoined(playerJoined)
        }

        socket.on('player_list', (playerList) => {
            setPlayers(playerList);
            showNotification(players.at(-1).name)
        })

        window.addEventListener('beforeunload', () => {
            socket.emit('session_disconnect')
        })

        return () => {
            window.removeEventListener('beforeunload', () => {
                socket.emit('session_disconnect')
            })
            socket.off('player_list');
        }
    }, [code, name, userId, playerJoined])

    const showNotification = (name) => {

        const id = Date.now();
    
        const el =           
          <div className="notification fade-in slide-in-left">
            Conectado {name}
          </div>
    
        
        setChildren((prevChildren) => [...prevChildren, { id, element: el, isVisible: true }]);
    
        setTimeout(() => {
    
          setChildren((prevChildren) =>
            prevChildren.map((child) =>
              child.id === id
                ? { ...child, element: cloneElement(child.element, { className: "notification fade-out slide-out-left" }) }
                : child
            )
          );
    
          setTimeout(() => {
            setChildren((prevChildren) => prevChildren.filter((child) => child.id !== id));
          }, 300);
        }, 3000); 
      }
    

    return(

        <>
        
        <div className="notification-container">

            {children.map((child) => child.element)}

        </div>
        
    
        <div className="mainContainer">
            <h1>Código de sesión: {code}</h1>
            <div className="playersContainer">
                <h3 style={{textAlign: 'center'}}>Jugadores</h3>
                <ul>
                    {players?.map((player, index) => (
                        <li key={index}> {player.name} </li>
                    ))}
                </ul>
            </div>
        </div>

        </>

    )  
}