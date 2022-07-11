import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { Grid, Stack, Button } from '@mui/material';


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
            code: matchCode,
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

    return (
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
                <h2>Next Match: #{nextNum}</h2>
                <h3>Date: {moment().format("MMM Do YYYY")}</h3>
                <h3>Match Code: {matchCode}</h3>
                <Button
                    onClick={() => creatNewMatch()}
                    variant="contained"
                >
                    Create and Join Lobby
                </Button>
                <Button
                    onClick={() => history.goBack()}
                    variant="outlined"
                >
                    Back
                </Button>
            </Stack>
      </Grid>
    )
};
export default NewMatch;