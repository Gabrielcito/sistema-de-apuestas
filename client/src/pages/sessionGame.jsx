import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io("http://localhost:4000");

export const Session = () => {
    
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



    return(
        <div className="mainContainer">
            <h1>Código de sesión: {code}</h1>
            <div className="userNameContainer">
                <h2>Jugadores en la sala:</h2>
                <ul>
                    {players?.map((player, index) => (
                        <li key={index}>Jugador {index + 1} ({player.name})</li>
                    ))}
                </ul>
            </div>
        </div>
    )  
}