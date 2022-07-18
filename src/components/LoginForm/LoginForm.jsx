import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { TextField, Button, Grid, Stack, Card } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

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
              <form className="formPanel" onSubmit={login}>
                  <h2>Login to MTG Equip</h2>
                  {errors.loginMessage && (
                    <h3 className="alert" role="alert">
                      {errors.loginMessage}
                    </h3>
                  )}
                  <div>
                      <TextField
                        variant="outlined"
                        label="username"
                        type="text"
                        name="username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px"
                        }}
                      />
                  </div>
                  <br/>
                  <div>
                      <TextField
                        variant="outlined"
                        label="password"
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px"
                        }}
                      />
                  </div>
                  <br/>
                  <div>
                    <Button 
                      variant="contained" 
                      type="submit" 
                      name="submit" 
                      value="Log In"
                      sx={{
                        backgroundColor: "#4F698C"
                      }}
                      >
                        Login
                      </Button>
                  </div>
                </form>
            </Stack>
        </Grid>
    
  );
}

export default LoginForm;
