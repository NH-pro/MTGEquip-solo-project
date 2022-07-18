import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          variant='contained'
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
          sx={{
            background: "#D93829",
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
