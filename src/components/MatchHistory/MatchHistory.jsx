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

    useEffect(() => {
        dispatch({
            type: "FETCH_MATCH_HISTORY",
            payload: {
                user: user.id
            }
        })
    },[])

    function matchNotes(matchId) {
        history.push(`/historyDetails/${matchId}`)
    }

    return (
        <>
            <Button  
                onClick={() => history.goBack()}
                variant="contained"
                sx={{
                        position: 'fixed',
                        marginLeft: '.5em',
                        marginTop: '1em'
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
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                >
                    {actualHistory &&
                        <>
                            {actualHistory.matchHistory.map((match) => {
                                return (
                                    <Card
                                        key={match.id} onClick={() => matchNotes(match.id)}
                                    >
                                        <Typography>Match Id #{match.id}</Typography>
                                        <Typography>{moment(match.date).format('MM/DD/YYYY')}</Typography>
                                    </Card>
                                )
                            })}
                        </>
                    }
                </Stack>
            </Grid>
        </>
    )
}

export default MatchHistory;