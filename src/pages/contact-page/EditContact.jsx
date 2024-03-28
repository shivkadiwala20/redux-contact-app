import * as React from 'react';
import { useRef, useState, forwardRef } from 'react';

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
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import './AddContact.css';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { updateContacts } from '../../action/Action';
import { getActiveUser, getCurrentUser } from '../../storage/Storage';

const defaultTheme = createTheme();
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Please enter a valid 10 digit phone number'),
  })
  .required();

export function EditContact() {
  const dispatch = useDispatch();
  const vertical = 'top';
  const horizontal = 'right';
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(false);
  // console.warn({ image });
  // const location = useLocation();
  const sessionData = getCurrentUser();
  const activeUser = sessionData?.userId;
  // const userId = location.state ? location.state : null;
  const { userId } = useParams();
  const rowId = Number(userId);
  const editedData = getActiveUser([activeUser]);
  const editedContact = editedData.find((val) => val.userId === rowId);
  const [removeAvatar, setRemoveAvatar] = useState(editedContact.avatar);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: editedContact.name,
      email: editedContact.email,
      phone: editedContact.phone,
    },
  });

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const onSubmit = async (contactData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const existingData = Object.keys(editedContact)
      .filter((objKey) => objKey !== 'userId')
      .reduce((newObj, key) => {
        newObj[key] = editedContact[key];
        return newObj;
      }, {});
    // console.log("UpdatedData", contactData);
    if (image) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        contactData.avatar = reader.result;
        if (JSON.stringify(existingData) !== JSON.stringify(contactData)) {
          existingData.name = contactData.name;
          existingData.phone = contactData.phone;
          existingData.email = contactData.email;
          existingData.avatar = contactData.avatar;
          existingData.userId = editedContact.userId;
          const editedData = getActiveUser([activeUser]);
          const indexToUpdate = editedData.findIndex(
            (obj) => obj.userId === editedContact.userId
          );
          editedData[indexToUpdate] = existingData;
          // setContactInStorage([activeUser], editedData);
          dispatch(updateContacts(existingData));
        }
        setOpen(true);
        setTimeout(() => {
          navigate('/contacts');
        }, 1000);
      });
      // console.log("UpdatedData", contactData);
      reader.readAsDataURL(image);
      contactData.avatar = image;
      // console.warn("chal raha  hai", image);
    } else {
      if (JSON.stringify(existingData) !== JSON.stringify(contactData)) {
        existingData.name = contactData.name;
        existingData.phone = contactData.phone;
        existingData.email = contactData.email;
        existingData.avatar = removeAvatar;
        existingData.userId = editedContact.userId;
        const editedData = getActiveUser([activeUser]);
        const indexToUpdate = editedData.findIndex(
          (obj) => obj.userId === editedContact.userId
        );
        editedData[indexToUpdate] = existingData;
        dispatch(updateContacts(existingData));
      }
      setOpen(true);
      setTimeout(() => {
        navigate('/contacts');
      }, 1000);
    }
  };
  const removeImage = () => {
    setRemoveAvatar('');
    setImage('');
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

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
          Contact Updated Successfully!!
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
              src={image ? URL.createObjectURL(image) : removeAvatar}
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            />

            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              accept="image/png, image/gif, image/jpeg"
              style={{ display: 'none' }}
            />
            <Typography component="h1" variant="h5">
              Update Image
            </Typography>
            <Link component="h1" variant="h6" onClick={removeImage}>
              {image || removeAvatar ? 'Remove Image' : ''}
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
                <span style={{ color: 'red', fontSize: '14px' }}>
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
              {errors.email && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                  {errors.email?.message}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="tel"
                id="phone"
                {...register('phone')}
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
                {isSubmitting ? 'Updating Contact....' : 'UPDATE CONTACT'}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
