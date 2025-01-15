import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import io from 'socket.io-client';

export const AdminSession = () => {

    const socket = io("http://localhost:4000");

    const { code } = useParams();

    const [ players, setPlayers ] = useState([]);
    const [ adminJoin, setAdminJoin ] = useState(false);

    useEffect(() => {

        if(!adminJoin){
            socket.emit('admin_session_join', [code]);
            setAdminJoin(adminJoin)
        }

        socket.on('player_list', (playerList) => {
            setPlayers(playerList);
        })

        return () => {
            socket.off('player_list');
        }
    }, [code])



    return(
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
    )  
}