import * as React from 'react';
import { forwardRef } from 'react';

import ContactsIcon from '@mui/icons-material/Contacts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { deleteContact } from "../../Storage/Storage";

import './ViewContact.css';

import { deleteContacts } from '../../action/Action';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewContact() {
  const dispatch = useDispatch();
  const vertical = 'top';
  const horizontal = 'right';
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [rows, setRows] = React.useState(getAddContactDetails());
  const [userId, setUserId] = React.useState();
  const rows = useSelector((state) => state);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    dispatch(deleteContacts(userId));
    setOpenDialog(false);
    // setRows(getAddContactDetails());
    setOpen(true);
  };
  const handleDialogCloseCancel = () => {
    setOpenDialog(false);
  };
  const handleDelete = (userId) => {
    setUserId(userId);
    setOpenDialog(true);
  };

  const navigate = useNavigate();
  const handleEdit = (userId) => {
    navigate(`/contacts/edit/${userId}`);
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
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Contact Deleted Successfully!!
        </Alert>
      </Snackbar>
      {rows?.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: '200px',
            // border: "2px solid",
          }}
        >
          <h1>No contacts found, Please add contacts.</h1>
          <Button
            variant="contained"
            onClick={() => navigate('/contacts/add-contact')}
          >
            <ContactsIcon sx={{ mr: 2 }} />
            Add Contact
          </Button>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, mt: 3 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <StyledTableRow key={row?.userId}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar src={row?.avatar} alt={row?.name[0]} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.name}</StyledTableCell>
                  <StyledTableCell align="right">{row?.email}</StyledTableCell>
                  <StyledTableCell align="right">{row?.phone}</StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon
                      sx={{ mr: 2, cursor: 'pointer' }}
                      onClick={() => handleEdit(row?.userId)}
                    />
                    <DeleteIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleDelete(row?.userId);
                        handleDialogOpen();
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
