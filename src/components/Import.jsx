import React, { useState, forwardRef } from 'react';

import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { importContacts } from '../action/Action';
import {
  getCurrentUser,
  getActiveUser,
  setContactInStorage,
  // setContactInStorage,
} from '../storage/Storage';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Import() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionData = getCurrentUser();
  const activeUser = sessionData.userId !== null ? sessionData.userId : null;
  const vertical = 'top';
  const horizontal = 'right';
  const [open, setOpen] = useState(false);
  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      error: (err) => console.log(err),
      complete: function (result) {
        const contacts = getActiveUser([activeUser]);
        // eslint-disable-next-line no-unsafe-optional-chaining
        setContactInStorage([activeUser], [...result?.data, ...contacts]);
        // eslint-disable-next-line no-unsafe-optional-chaining
        dispatch(importContacts([...result?.data]));
        setOpen(true);
        navigate('/contacts');
      },
    });
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
          Contact Imported Successfully!!
        </Alert>
      </Snackbar>
      <div
        className="App"
        style={{
          textAlign: 'center',
          marginTop: '200px',
          // border: "2px solid",
        }}
      >
        <h1>
          Please upload the <span className="csv">.CSV</span> file to import
          Contacts
        </h1>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleFile}
        ></input>
      </div>
    </>
  );
}
