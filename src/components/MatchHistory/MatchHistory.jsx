import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { Button, Stack, Typography, Grid, Card } from '@mui/material';

function MatchHistory() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const actualHistory = useSelector((store) => store.notesReducers.matchHistory)
    const allUsers = useSelector((store) => store.notesReducers.allUsers)

    useEffect(() => {
        dispatch({
            type: "FETCH_MATCH_HISTORY",
            payload: {
                user: user.id
            }
        })
        dispatch({
            type: 'FETCH_USERS'
        })
    },[])

    function matchNotes(matchId) {
        history.push(`/historyDetails/${matchId}`)
    }

    return (
        <>
                        <Button  
                onClick={() => history.push('/')}
                variant="contained"
                sx={{
                        position: 'fixed',
                        marginLeft: '.5em',
                        marginTop: '3.5em'
                    }}
            >
                Back
            </Button>

            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Card
                    elevation={4}
                    sx={{
                        marginLeft: '3em',
                        marginTop: '2em',
                        padding: '1em',
                        backgroundColor: 'crimson',
                        color: 'white'
                    }}
                >
                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Match History
                    </Typography>
                </Card>
 
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '2em',
                    }}
                >
                    {actualHistory &&
                        <>  
                            {actualHistory.matchHistory.map((match) => {
                                if(match.winner_id !== null) {
                                    {allUsers.map((player) => {
                                        if(player.id === match.winner_id) {
                                            return (
                                                <Card
                                                    key={match.id} onClick={() => matchNotes(match.id)}
                                                    elevation={4}
                                                    sx={{
                                                        margin: '.5em .25em',
                                                        padding: '.5em',
                                                    }}
                                                >
                                                    <Typography>Match id #{match.id}</Typography>
                                                    <Typography>Winner: {player.username}</Typography>
                                                    <Typography>{moment(match.date).format('MM/DD/YYYY')}</Typography>
                                                </Card>
                                            )
                                        }
                                    })}
                                }
                                else {
                                    return (
                                        <Card
                                            key={match.id} onClick={() => matchNotes(match.id)}
                                            elevation={4}
                                            sx={{
                                                margin: '.5em .25em',
                                                padding: '.5em',
                                                backgroundColor: 'skyblue',
                                                color: 'midnightblue'
                                            }}
                                        >
                                            <Typography>Match id #{match.id}</Typography>
                                            <Typography>Winner: TBD</Typography>
                                            <Typography>{moment(match.date).format('MM/DD/YYYY')}</Typography>
                                        </Card>
                                    )
                                }
                            })}
                        </>
                    }
                </Stack>
            </Grid>
        </>
    )
}

export default MatchHistory;