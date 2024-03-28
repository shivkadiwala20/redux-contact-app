import * as React from 'react';
import { useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { addContact } from '../../action/Action';

// import { getAddContactDetails } from '../../Storage/Storage';

const defaultTheme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required '),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Please enter a valid 10 digit phone number'),
  })
  .required();

export function AddContact() {
  const [open, setOpen] = useState(false);
  const vertical = 'top';
  const horizontal = 'right';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  function getUserId() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const onSubmit = async (contactData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (image) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        contactData.avatar = reader.result;
        contactData.userId = getUserId();
        dispatch(addContact(contactData));
        // dispatch(
        //   addContact({
        //     ...contactData,
        //     userId: getUserId(),
        //   })
        // );
      });
      reader.readAsDataURL(image);
      setTimeout(() => {
        navigate('/contacts');
      }, 1000);
    } else {
      contactData.avatar = '';
      contactData.userId = getUserId();
      dispatch(addContact(contactData));
      setOpen(true);
      setTimeout(() => {
        navigate('/contacts');
      }, 1500);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  const removeImage = () => {
    setImage('');
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Contact Added Successfully!!
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
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
            <Avatar
              sx={{ m: 1, width: 86, height: 86 }}
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
              src={image ? URL.createObjectURL(image) : ''}
            />
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              accept="image/png, image/gif, image/jpeg"
              style={{ display: 'none' }}
            />
            <Typography component="h1" variant="h5">
              Upload Image
            </Typography>
            <Link component="h1" variant="h6" onClick={removeImage}>
              {image ? 'Remove Image' : ''}
            </Link>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                {...register('name')}
              />
              {errors.name && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    paddingBottom: '15px',
                  }}
                >
                  {errors.name?.message}
                </span>
              )}
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                required
                {...register('email')}
                className="email"
              />
              <br />
              {errors.email && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '14px',
                    // backgroundColor: "red",
                  }}
                  className="error-message"
                >
                  {errors.email?.message}
                </span>
              )}

              <TextField
                {...register('phone', {
                  required: 'requried',
                })}
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                // type="tel"
                id="phone"
              />
              {errors.phone && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  {errors.phone?.message}
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Contact'}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
