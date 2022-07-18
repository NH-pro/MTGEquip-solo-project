import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import './Match.css';
import { Button, Grid, Stack, Paper, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Match() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const matchUsers = useSelector(store => store.userMatchReducer);
    const matchId = useParams();
    const commDamage = useSelector(store => store.commDamageReducer);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: 'FETCH_MATCH_USERS',
                payload: matchId
            });
    
            dispatch({
                type: 'FETCH_COMMANDER_DMG_INFO',
                payload: matchId
            });

        }, 100);
        return () => clearInterval(interval);
        }, []);




    const menu = () => {
        history.push(`/matchMenu/${matchId.matchId}`);
    }

    const addLife = (junctionId, playerHp, matchId) => {
        playerHp ++;
        dispatch({
            type: 'EDIT_USER_HP',
            payload: {
                junctionId,
                playerHp,
                matchId
            }
        })
    }
    const subLife = (junctionId, playerHp, matchId) => {
        playerHp --;
        dispatch({
            type: 'EDIT_USER_HP',
            payload: {
                junctionId,
                playerHp,
                matchId
            }
        })
    }

    const addPoison = (junctionId, playerPoison, matchId) => {
        playerPoison ++;
        dispatch({
            type: 'EDIT_USER_POISON',
            payload: {
                junctionId,
                playerPoison,
                matchId
            }
        })
    }

    const subPoison = (junctionId, playerPoison, matchId) => {
        playerPoison --;
        dispatch({
            type: 'EDIT_USER_POISON',
            payload: {
                junctionId,
                playerPoison,
                matchId
            }
        })
    }

    const addCommDmg = (commId, amount, matchId) => {
        amount ++;
        dispatch({
            type: 'EDIT_COMM_DMG',
            payload: {
                commId,
                amount,
                matchId
            }
        })
    }

    const subCommDmg = (commId, amount, matchId) => {
        amount --;
        dispatch({
            type: 'EDIT_COMM_DMG',
            payload: {
                commId,
                amount,
                matchId
            }
        })
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '1em',
                marginBottom: '1em',
                backgroundColor: "#F2BF5E",
                padding: "1em",
                borderRadius: "10px"
            }}
        >
            {matchUsers &&
                <div>
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}
                    >
                        {matchUsers.map((player) => {
                            if(player.user_id !== user.id) {
                                return (
                                    <Stack
                                        key={player.user_id}
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                    >
                                        <Accordion
                                            elevation={4}
                                            sx={{
                                                padding: '.5em',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Stack
                                                    direction="column"
                                                    justifyContent="space-evenly"
                                                    alignItems="start"
                                                >
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {player.username}
                                                    </Typography>
                                                    <Typography
                                                        variant='h5'
                                                    >
                                                       Life: {player.hp}
                                                    </Typography>
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {matchUsers.map((opponent) => {
                                                if(opponent.user_id !== player.user_id) {
                                                    return (
                                                        <h4 key={opponent.user_id}>
                                                            {opponent.username}: {commDamage.map((comm) => {
                                                                if(comm.attacker_id === opponent.user_id && comm.defender_id === player.user_id) {
                                                                    return (
                                                                        comm.amount
                                                                    )
                                                                }
                                                            })}
                                                        </h4>
                                                    )
                                                }
                                            })}
                                            <h4>Psn: {player.poison}</h4>
                                            {commDamage.map((comm) => {
                                                if(comm.attacker_id === player.user_id && comm.defender_id === user.id) {
                                                    return (
                                                        <div key={comm.id}>
                                                            <Button 
                                                                onClick={() => addCommDmg(comm.id, comm.amount, comm.match_id)}
                                                                variant= 'contained'
                                                                sx={{
                                                                    backgroundColor: "#4F698C"
                                                                }}
                                                            >
                                                                +
                                                            </Button>
                                                            <h3>CMDR: {comm.amount}</h3>
                                                            <Button
                                                                onClick={() => subCommDmg(comm.id, comm.amount, comm.match_id)}
                                                                variant= 'contained'
                                                                sx={{
                                                                    backgroundColor: "#4F698C"
                                                                }}
                                                            >
                                                                -
                                                            </Button>
                                                        </div>
                                                    )
                                                }
                                            })}
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                );
                            }
                        })} 
                    </Stack>
                    
                {matchUsers.map((player) => {
                    if(player.user_id === user.id) {
                        return (
                            <Paper
                                elevation={4}
                                sx={{
                                    margin: '1em',
                                    padding: '1em',
                                    backgroundColor: 'floralwhite',
                                }}
                            >
                                <Stack
                                    key={player.user_id}
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Button
                                            onClick={() => menu()}
                                            variant='contained'
                                            sx={{
                                                backgroundColor: "#D99D55"
                                            }}
                                        >
                                            Menu
                                        </Button> 
                                    </Box>
                                    <Box
                                        sx={{
                                            textAlign: 'center'
                                         }}
                                    >
                                        <Button
                                            onClick={() => addPoison(player.junction_id, player.poison, player.match_id)}
                                            variant= 'contained'
                                            sx={{
                                                backgroundColor: "#87AD48"
                                            }}
                                        >
                                        +
                                        </Button>
                                        <br/>
                                        <Typography 
                                            variant='h5'
                                            sx={{
                                                paddingTop: ".5em"
                                            }}
                                        >
                                            Psn: {player.poison}
                                        </Typography>
                                        <br/>
                                        <Button
                                            onClick={() => subPoison(player.junction_id, player.poison, player.match_id)}
                                            variant= 'contained'
                                            sx={{
                                                backgroundColor: "#87AD48"
                                            }}
                                        >
                                            -
                                        </Button>
                                    </Box>
                                    <Box
                                    >
                                        <Button
                                            onClick={() => addLife(player.junction_id, player.hp, player.match_id)}
                                            variant= 'contained'
                                            sx={{
                                                backgroundColor: "#D93829"
                                            }}
                                        >
                                        +
                                        </Button>
                                        <br/>
                                        <Typography
                                            variant='h5'
                                            sx={{
                                                paddingTop: '.5em'
                                            }}
                                        >
                                            Life: {player.hp}
                                        </Typography>
                                        <br/>
                                        <Button 
                                            onClick={() => subLife(player.junction_id, player.hp, player.match_id)}
                                            variant= 'contained'
                                            sx={{
                                                backgroundColor: "#D93829"
                                            }}
                                        >
                                            -
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        )
                    }
                })} 
        </div>
        }
        </Grid>
    )
};
export default Match;