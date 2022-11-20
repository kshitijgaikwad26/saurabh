import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useHistory}  from 'react-router-dom';
import {FormControl, FormLabel,RadioGroup,FormControlLabel,Radio}from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register () {
  const [lemail,setEmail]=useState("")
  const [lpassword,setPassword]=useState("")
  const navigat = useNavigate()
   
const postRegisterDetails=async(event)=>{
   event.preventDefault()
    var valid = true;
        
    const regex =/^[A-Za-z._]{1,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,4}$/;
    const passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if ((!regex.test(lemail)) && (!passwordRegEx.test(lpassword)) ) {
     alert("Invalid Email or password");
     valid=false;
    }
    if(valid){
    console.log("in Methode");
    const result=await fetch("http://localhost:4000/signIn",{
      method:'GET'
    }).then((response)=>response.json()).then((actualData)=>
    {
        console.log(actualData);
        actualData && actualData.map((obj)=>{
          if(obj.email === lemail && obj.password === lpassword){
            alert("loged in successfully")
            sessionStorage.setItem("email", obj.email)
            if(obj.identity === 'Admin'){
              navigat('')
            }
            else{
              navigat('/userDashboardActual')
            }
          }
        })
    })
    .catch((err)=>console.log(err))
    

     
  }
}
    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign-up
          </Typography>
          <Box component="form" onSubmit={(e)=>{postRegisterDetails(e)}} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              />
              {/* CAPCHA          */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./Register" variant="body2">
                  {" Don't have account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
        }