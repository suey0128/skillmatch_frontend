import React, { useState }from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setUserStatus, setCurrentUser } from '../mainsSlice';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#94aac4',
    }
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const jobseekerArr = useSelector(state => state.jobseekerArr)
  const recruiterArr = useSelector(state => state.recruiterArr)
  const [enterLoginUsername, setEnterLoginUsername] = useState("")
  const [enterLoginPD, setEnterLoginPD] = useState("")

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isRecruiter = recruiterArr.find(r => r.username === enterLoginUsername && r.password === enterLoginPD) 
    const isJobSeeker = jobseekerArr.find(j => j.username === enterLoginUsername && j.password === enterLoginPD) 
    
    if (isRecruiter) {
      //set userStatus
      dispatch(setUserStatus("recruiter"))
      //set currentUser
      dispatch(setCurrentUser(isRecruiter))
    } else if (isJobSeeker) {
      dispatch(setUserStatus("jobseeker"))
      dispatch(setCurrentUser(isJobSeeker))
    } else {
      alert("Incorrect username or password, please re-enter.");
    }
    isJobSeeker || isRecruiter ? history.push("/matches") : console.log("incorrect login")
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username /for demo purpuse: suey or john"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e)=>{setEnterLoginUsername(e.target.value)}}
              value={enterLoginUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password /for demo purpuse: 123"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setEnterLoginPD(e.target.value)}}
              value={enterLoginPD}
            />
    
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
    
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Login;