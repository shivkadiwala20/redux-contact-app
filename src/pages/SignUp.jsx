// import { useLayoutEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
// import bgimg from "./bg/backimg.jpg";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Snackbar from "@mui/material/Snackbar";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import bg from './bg/weblogo.svg';
import {
  saveFormDataToLocalStorage,
  getFormDataFromLocalStorage,
  // getCurrentUser,
} from '../storage/Storage';

const schema = yup
  .object({
    // username: yup.string().min(3).max(10).required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .label('confirm password')
      .required()
      .oneOf([yup.ref('password'), null], 'password must match'),
    email: yup.string().email().required(),
  })
  .required();

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const boxstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const center = {
  position: 'relative',
  top: '50%',
  left: '30%',
};

export default function SingUp() {
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //   const isUserLoggedIn = getCurrentUser();
  //   if (isUserLoggedIn) {
  //     navigate('/contacts');
  //   }
  // }, [navigate]);
  // const [open, setOpen] = useState(false);
  // const vertical = "top";
  // const horizontal = "right";

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

  // useEffect(() => {
  //   const isUserLoggedIn = getCurrentUser();
  //   console.warn({ isUserLoggedIn: !!isUserLoggedIn });
  //   if (!!isUserLoggedIn) {
  //     navigate("home");
  //   }
  // }, [navigate]);

  const onSubmit = async (formData) => {
    // console.log(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { confirmPassword, ...formDataWithoutConfirm } = formData;
    saveFormDataToLocalStorage({
      ...formDataWithoutConfirm,
      userId: getUserId(),
    });

    getFormDataFromLocalStorage();
    // console.log("Stored Form Data:", storedFormData);

    // setOpen(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // function TransitionLeft(props) {
  //   return <Slide {...props} direction="left" />;
  // }

  return (
    <>
      {/* <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Registered Successfully !!
        </Alert>
      </Snackbar> */}
      <div
        style={{
          // backgroundImage: `url(${bgimg})`,
          backgroundSize: 'cover',
          height: '100vh',
          color: '#f5f5f5',
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  marginTop: '18px',
                  marginBottom: '25px',
                  height: '200px',
                  width: '205px',
                  color: '#f5f5f5',
                }}
                className="logo"
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: 'cover',
                  height: '70vh',
                  minHeight: '500px',
                  backgroundColor: 'rgb(33,170,233)',
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={25} />
                    <Box sx={center}>
                      <Typography component="h1" variant="h4">
                        Create Account
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            size="small"
                            {...register('email')}
                          />
                          {errors.email && (
                            <span style={{ color: 'yellow', fontSize: '14px' }}>
                              {errors.email?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register('password')}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            size="small"
                            id="password"
                            autoComplete="new-password"
                          />
                          {errors.password && (
                            <span style={{ color: 'yellow', fontSize: '14px' }}>
                              {errors.password?.message}
                            </span>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            {...register('confirmPassword')}
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            size="small"
                            id="confirmPassword"
                            autoComplete="new-password"
                          />
                          <span style={{ color: 'yellow', fontSize: '14px' }}>
                            {errors.confirmPassword?.message}
                          </span>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: '5em', mr: '5em' }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: '15px',
                              mr: '20px',
                              borderRadius: 28,
                              color: '#ffffff',
                              minWidth: '170px',
                              backgroundColor: 'rgb(76,82,86)',
                            }}
                            disabled={isSubmitting}
                            className="submit-btn"
                          >
                            {isSubmitting ? 'Registering....' : 'Register'}
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: '10px' }}
                            >
                              Already have an account?{' '}
                              <span
                                style={{
                                  color: 'rgb(76,82,86)',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  navigate('/');
                                }}
                              >
                                Sign In
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </form>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
