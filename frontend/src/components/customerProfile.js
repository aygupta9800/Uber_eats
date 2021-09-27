import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navigationbar from './navigationbar.js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { 
    Avatar, CssBaseline, Button, Container, FormControl, FormLabel, FormControlLabel,
    makeStyles, Link, Grid, Checkbox, Typography, TextField, Radio, RadioGroup, MenuItem,
} from '@material-ui/core';

import { AccountCircle} from '@material-ui/icons';
import {useForm, Controller} from 'react-hook-form'
import { updateCustomerProfile } from '../app/reducers/mainSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textInput: {
      borderColor: theme.palette.success.light,
  }
}));

export default function CustomerProfile() {
    const mainReducer = useSelector((state) => state.mainReducer);
    const { customerProfile, token } = mainReducer;
    console.log("customerProfile", customerProfile);
    const [firstName, setFirstName] = useState(customerProfile && ( customerProfile?.first_name ||  ""));
    const [lastName, setLastName] = useState(customerProfile && ( customerProfile?.last_name ||  ""));
    const [dob, setDob] = useState(customerProfile?.dob || "");
    const [email, setEmail] = useState(customerProfile?.email ||  "");
    const [phone, setPhone] = useState(customerProfile?.phone_number || "");
    const [nickName, setNickName]= useState(customerProfile?.nickname || "");
    const [about, setAbout]= useState(customerProfile?.about || "");
    const [profilePic, setProfilePic] = useState(customerProfile?.profile_pic ||  "");
    const [streetAddress, setStreetAddress] = useState(customerProfile?.street_address ||  "");
    const [aptNumber, setAptNumber] = useState(customerProfile?.apt_number ||  "");
    const [city, setCity] = useState(customerProfile?.city ||  "san jose");
    const [state, setState] = useState(customerProfile?.state ||  "california");
    const [country, setCountry] = useState(customerProfile?.country ||  "united states");
    const [zipcode, setZipcode] = useState(customerProfile?.zipcode ||  "95111");

    const countries = [
        {
          value: 'united states',
          label: 'United States',
        },
        {
          value: 'india',
          label: 'India',
        },
      ];
    

    useEffect(() => {}, [])
    const dispatch = useDispatch()
    const classes = useStyles();
    const {register, handleSubmit, control} = useForm()
    const history = useHistory();
    // console.log("token==", token);
    const url =  "/customers/profile";
    // console.log("==customerProfileredux", customerProfile)
    const updateCustomerProfileApi = async () => {
        const body = {
            customer_id: customerProfile?.customer_id,
            first_name: firstName,
            last_name: lastName,
            address_id: customerProfile?.customer_address_id,
            email: customerProfile?.email,
            phone_number: phone,
            description: `${firstName} is a good customer`,
            dob,
            nickname: nickName,
            about: about,
            profile_pic: profilePic,
            street_address: streetAddress,
            apt_number: aptNumber,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode,
            isAddressUpdated: true
        };
        const headers = { 
            'x-access-token': token,
        };
        console.log("body", body);
        try {
            const res = await axios.put(url,body, {headers});
            console.log("response",res);
            await dispatch(updateCustomerProfile(res.data))
            setTimeout(() => history.push("/"), 500);
            
        }catch(err){
            console.log(err)
        }

    }
    const onClickSubmit = (data) => {
        console.log("calling")
        updateCustomerProfileApi();
    }
    const onError = (errors, e) => {
        console.log("errors", errors, "e", e);
    }
  return (
    <>
      <Navigationbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Profile
          </Typography>
          <form className={classes.form} noValidate  onSubmit={handleSubmit(onClickSubmit, onError)}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('firstName')}}
              fullWidth
              id="firstName"
              label="firstName"
              name="firstName"
              type='text'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              autoFocus
              inputProps={{className: classes.textInput}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('lastName')}}
              fullWidth
              id="lastName"
              label="lastName"
              name="lastName"
              type='text'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              autoFocus
              inputProps={{className: classes.textInput}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('email')}}
              fullWidth
              name="email"
              label="email"
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('phone')}}
              fullWidth
              name="phone"
              label="phone"
              type="tel"
              id="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('nickName')}}
              fullWidth
              id="nickName"
              label="nickName"
              name="nickName"
              type='text'
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              autoFocus
              inputProps={{className: classes.textInput}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('dob')}}
              fullWidth
              id="dob"
              helperText="Select date of birth"
              name="dob"
              type='date'
              value={dob}
              onChange={e => setDob(e.target.value)}
              autoFocus
              inputProps={{className: classes.textInput}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('streetAddress')}}
              fullWidth
              name="streetAddress"
              label="streetAddress"
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={e => setStreetAddress(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('aptNumber')}}
              // required
              fullWidth
              name="aptNumber"
              label="aptNumber"
              type="text"
              id="aptNumber"
              value={aptNumber}
              onChange={e => setAptNumber(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{...register('city')}}
              // required
              fullWidth
              name="city"
              label="city"
              type="text"
              id="city"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{...register('state')}}
              // required
              fullWidth
              name="state"
              label="state"
              type="text"
              id="state"
              value={state}
              onChange={e => setState(e.target.value)}
            />
            <TextField
                id="country"
                select
                label="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
            >
                {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              // , { required: true }
              inputRef={{...register('zipcode')}}
              // required
              fullWidth
              name="zipcode"
              label="zipcode"
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={e => setZipcode(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={{...register('about')}}
              fullWidth
              id="about"
              label="about"
              name="about"
              type='text'
              value={about}
              onChange={e => setAbout(e.target.value)}
              autoFocus
              inputProps={{className: classes.textInput}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Profile
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}