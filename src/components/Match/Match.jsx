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
        >
            {matchUsers &&
                <div>
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '1em'
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
                                            xs={4}
                                            elevation={4}
                                            sx={{
                                                padding: '1em',
                                                textAlign: 'center',
                                                marginBottom: '1em'
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Stack
                                                    direction="column"
                                                    justifyContent="space-evenly"
                                                    alignItems="start"
                                                    spacing={1}
                                                >
                                                    <Typography
                                                        variant='h5'
                                                    >
                                                        {player.username}
                                                    </Typography>
                                                    <Typography
                                                        variant='h5'
                                                    >
                                                        {player.hp}
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
                                            <h4>posion: {player.poison}</h4>
                                            {commDamage.map((comm) => {
                                                if(comm.attacker_id === player.user_id && comm.defender_id === user.id) {
                                                    return (
                                                        <div key={comm.id}>
                                                            <Button 
                                                                onClick={() => addCommDmg(comm.id, comm.amount, comm.match_id)}
                                                                variant="outlined"
                                                            >
                                                                +
                                                            </Button>
                                                            <br/>
                                                            <h3>CMDR: {comm.amount}</h3>
                                                            <br/>
                                                            <Button
                                                                onClick={() => subCommDmg(comm.id, comm.amount, comm.match_id)}
                                                                variant="outlined"
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
                                    spacing={0}
                                >
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Button
                                            onClick={() => menu()}
                                            variant="contained"
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
                                            variant="outlined"
                                            onClick={() => addPoison(player.junction_id, player.poison, player.match_id)}
                                            sx={{
                                                marginBottom: '1em'
                                            }}
                                        >
                                        +
                                        </Button>
                                        <br/>
                                        <Typography 
                                            variant='h5'
                                        >
                                            Psn: {player.poison}
                                        </Typography>
                                        <br/>
                                        <Button
                                            variant="outlined"
                                            onClick={() => subPoison(player.junction_id, player.poison, player.match_id)}
                                        >
                                            -
                                        </Button>
                                    </Box>
                                    <Box
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => addLife(player.junction_id, player.hp, player.match_id)}
                                            sx={{
                                                marginBottom: '1em',
                                                width: 'container'
                                            }}
                                        >
                                        +
                                        </Button>
                                        <br/>
                                        <Typography
                                            variant='h5'
                                        >
                                            Life: {player.hp}
                                        </Typography>
                                        <br/>
                                        <Button 
                                            variant="outlined"
                                            onClick={() => subLife(player.junction_id, player.hp, player.match_id)}
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