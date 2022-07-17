import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { Grid, Stack, Button, Popover, Typography, Card } from '@mui/material';


function NewMatch() {
    const dispatch = useDispatch();
    const history = useHistory();

    const matchNum = useSelector((store) => store.fetchNextMatchNumber);
    const nextNum = matchNum + 1;
    // Local state for new code
    const [matchCode, setMatchCode] = useState('');
    // String of usable characters for random code generator to use.
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // Using moment to grab the date.
    const date = moment().format("YYYY MM DD");
    const user = useSelector((store) => store.user);

    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        // Fetching the next match id number
        dispatch({
            type: 'FETCH_NEXT_MATCH_NUMBER'
        })
        // Executing the random code gen function.
        codeGen(10);
    },[]);

    // Random code generator
    const codeGen =(length) => {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setMatchCode(result);
    };


    // This creates a new match entry in the "match" table.
    const creatNewMatch = () => {
        // Combining random number and date into one object.
        const matchDetails = {
            nextNum,
            matchCode,
            date: date,
            creator: user.id
        };

        // Dispatching new match details.
        dispatch({
            type: 'CREATE_MATCH_DB',
            payload: matchDetails
        })

        history.push(`/lobby/${nextNum}`);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;
    const closePopover = () => {
        setAnchorEl(null);
      };

    function copyText(theCode) {
        navigator.clipboard.writeText(theCode)
        setAnchorEl("match_code");
        if(open === false) {
            setOpen(true);
        }
        else {
            setOpen(false);
        }
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
                    Create Match: #{nextNum}
                </Typography>
                <Typography
                    variant='h5'
                    sx={{
                        padding: '0em .5em',
                        borderBottom: '5px solid #73482F',
                        borderRadius: '5px'
                    }}
                >
                    {moment().format("MMM Do YYYY")}
                </Typography>
                <Typography
                    variant='h5'
                    sx={{
                        paddingTop: '2em'
                    }}
                >
                    Match Code:
                </Typography>
                <Card
                    elevation={4}
                    sx={{
                        padding: '.25em 1em',
                        marginTop: '5em',
                    }}
                >
                    <Typography 
                        variant='h4'
                        id="match_code" 
                        onClick={() => copyText(matchCode)}
                    >
                        {matchCode}
                    </Typography>
                </Card>
                {open &&
                    <Popover
                        id={id}
                        anchorEl={document.getElementById('match_code')}
                        open={open}
                        onClose={closePopover}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        sx={{
                            marginLeft: '1.5em',

                        }}
                    >
                        <Typography
                            sx={{
                                padding: ".25em"
                            }}
                        >
                            Copied!
                        </Typography>
                    </Popover>
                }
                <br/>
                <Button
                    onClick={() => creatNewMatch()}
                    variant="contained"
                    sx={{
                        marginTop: '2em',
                        backgroundColor: '#4F698C'
                    }}
                >
                    Create and Join Lobby
                </Button>
                <Button
                    onClick={() => history.push('/')}
                    variant="contained"
                    sx={{
                        backgroundColor: "#D99D55"
                    }}
                >
                    Back
                </Button>
            </Stack>
      </Grid>
    )
};
export default NewMatch;