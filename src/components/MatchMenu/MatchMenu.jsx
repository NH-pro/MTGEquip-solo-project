import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';


function MatchMenu() {
    const history = useHistory();
    const matchId = useParams();
    const user = useSelector((store) => store.user);
    const matchInfo = useSelector((store) => store.matchReducer);
    const matchUsers = useSelector(store => store.userMatchReducer);
    const dispatch = useDispatch();

    const [note, setNote] = useState('');


    useEffect(() => {
        dispatch({
            type: 'FETCH_MATCH_INFO',
            payload: matchId
        })
        dispatch({
            type: 'FETCH_MATCH_USERS',
            payload: matchId
        });

    },[])

    function submitAndExit() {
        for(let player of matchUsers) {
            if(player.user_id === user.id) {
                dispatch({
                    type: 'CREATE_MATCH_NOTE',
                    payload: {
                        note,
                        juncId: player.junction_id
                    }
                })

                history.push('/');
            }
        }
    }

    return (
        <>
            {matchInfo &&
                <h2>Match #{matchInfo.id}</h2>
            }
            <textarea 
                onChange={(event) => setNote(event.target.value)}
                rows="10"
                cols="40"
                maxLength="400"
            />
            <br/>
            <button  onClick={() => history.goBack()}>Back</button>
            <br/>
            <button onClick={() => submitAndExit()}>Submit</button>
        </>
    )
}
export default MatchMenu;