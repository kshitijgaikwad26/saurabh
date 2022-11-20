import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link}  from 'react-router-dom';
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

  const [identity,setIdentity]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const navigat = useNavigate()

  const postRegisterDetails=async(event)=>{
   
    event.preventDefault()
    var valid = true;
     const nameReg = /^[a-zA-Z]{2,}/ ;
     if(!nameReg.test(name)){
         alert("Enter Valid Name");
     }

    
    const regex =/^[A-Za-z._]{1,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,4}$/;
    if (!regex.test(email)) {
     alert("Invalid Email");
     valid=false;
    }
    const passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegEx.test(password)){
      alert("Weak Password");
      valid = false;
    }

    if(password!=confirmPassword){
        alert("Confirm Password Not Matched")
        valid = false;
    }
    
if(valid){
    console.log("in Methode");
    const result=await fetch("http://localhost:4000/register",{
      method:'POST',
      body:JSON.stringify({identity,name,email,password,confirmPassword}),
      headers:{'Content-type':'application/json'}
    })
     const data =await result.json();

    console.log(data);
    
      navigat('/SignIn')
  
   

    // history.push("/login");
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
          <FormControl>
              <FormLabel>Identity</FormLabel>
              <RadioGroup row name='identity' onChange={(e)=>setIdentity(e.target.value)}>
                <FormControlLabel value="User" control={<Radio/>} label="User"/>
                <FormControlLabel value="Admin" control={<Radio/>} label="Admin"/>
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label=" Enter Name"
              errormessage='Username should be 3-16 character and should include any special character'
              type="name"
              id="name"
              onChange={(e)=>setName(e.target.value)}
            />
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
              <TextField
              margin="normal"
              required
              fullWidth
              name="Confrimpassword"
              label="Confrim Password"
              type="password"
              id="Confrimpassword"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            {/* CAPCHA          */}
      
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/SignIn" variant="body2">
                  {" have an existing account? SignIn"}
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