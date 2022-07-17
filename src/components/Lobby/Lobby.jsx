import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Button, Stack, Card, Typography } from '@mui/material';

function Lobby() {
    const history = useHistory();
    const dispatch = useDispatch();
    let matchId = useParams();
    const matchUsers = useSelector(store => store.userMatchReducer);
    const matchInfo = useSelector(store => store.matchReducer);
    const user = useSelector(store => store.user);

    useEffect(() => {
        const interval = setInterval(() => {

            dispatch({
                type: 'FETCH_MATCH_INFO',
                payload: matchId
            })
            dispatch({
                type: 'FETCH_MATCH_USERS',
                payload: matchId
            })
        }, 100);
        return () => clearInterval(interval);
    }, [])


    const launchMatch = () => {
        if(user.id === matchInfo.creator_id) {
            // Loop through every player in the match.
            for (let player of matchUsers) {
                // Loop through every player in the match again.
                for (let oppPlayer of matchUsers) {
                    // Exclude the original player from the first loop.
                    if(player.user_id !== oppPlayer.user_id) {
                        // Info being sent with dispatch.
                        let commanderDamageJunc = {
                            matchId: player.match_id,
                            attackerId: oppPlayer.user_id,
                            defenderId: player.user_id
                        };
                        // Dispatch to make new commander_damage_junction table rows
                        //  for each player and their opponent.                   
                        dispatch({
                            type: 'CREATE_COMMANDER_DMG_JUNCTIONS',
                            payload: commanderDamageJunc
                        })
                    }
                }
            }
        }
        history.push(`/match/${matchId.matchId}`);
    }

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '4em',
                marginBottom: '1em',
                backgroundColor: "#F2BF5E",
                padding: "2em",
                borderRadius: "10px"
            }}
        >
            <Stack 
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <Typography
                    variant='h4'
                    sx={{
                        backgroundColor: '#D93829',
                        color: 'white',
                        padding: '.5em',
                        borderRadius: '5px'
                    }}
                >
                    Players in Lobby
                </Typography>
                <Card
                    elevation={6}
                    sx={{
                    padding: "1em",
                    marginTop: "4.5em",
                    paddingBottom: "2em",
                    backgroundColor: 'white',
                    paddingLeft: '2em',
                    paddingRight: '2em'
                    }}
                >
                    {matchUsers.map(player => {
                        return (
                            <div key={player.junction_id}>
                                <h3 >{player.username}</h3>
                            </div>
                        )
                    })}
                    {matchUsers.length >= 2 &&
                        <Button 
                            onClick={() => launchMatch()}
                            variant="contained"
                            sx={{
                            backgroundColor: "#4F698C"
                            }}
                        >
                            Launch Game
                        </Button>
                    }
                </Card>
            </Stack>
            
        </Grid>
    )
}
export default Lobby;