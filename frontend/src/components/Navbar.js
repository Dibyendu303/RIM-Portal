import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaAngleDown } from "react-icons/fa";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Navbar(props) {
  const { data, setData } = props;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(dayjs());
  const [ownedBy, setOwnedBy] = useState('');
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [quantity, setQuantity] = useState('');
  const text = props.textContent;

  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);
  const [openErrorMsg, setOpenErrorMsg] = useState(false);

  const handleClickSuccessMsg = () => {
    setOpenSuccessMsg(true);
  };

  const handleCloseSuccessMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessMsg(false);
  };

  const handleClickErrorMsg = () => {
    setOpenErrorMsg(true);
  };

  const handleCloseErrorMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorMsg(false);
  };

  const handleOwnership = (event) => {
    setOwnedBy(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  function filter(e){
    props.onQuery(e.target.value);
  }

  const handleSubmit = async () => {
    const options = {
      "name": itemName,
      "category": category,
      "ownedBy": ownedBy,
      "quantity": quantity,
      "purchasedOn": purchaseDate.toDate().getTime(),
      "bill": "",
      "sanctionLetter": "",
      "purchaseOrder": "",
      "status": "Available",
      "remarks": remarks,
      "occupiedTime": []
    };
    console.log(options);
    try {
      axios.post("http://localhost:8080/item", options).then((res) => {
        console.log(res.data);
        const newItem = res.data.item;
        const newData = [...data, newItem];
        setData(newData);
        handleCloseAddModal();
        handleClickSuccessMsg();
        // alert('Item added successfully');
      }).catch((e) => {
        handleCloseAddModal();
        handleClickErrorMsg();
        // alert('Unable to add item. Please try again later');

      });
    }
    catch (e) {
      handleCloseAddModal();
      handleClickErrorMsg();
      // alert('Unable to add item. Please try again later');
    }
  }

  const vertical = 'top'
  const horizontal = 'center';

  return (
    <>
      <Snackbar open={openSuccessMsg} autoHideDuration={6000} onClose={handleCloseSuccessMsg} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseSuccessMsg} severity="success" sx={{ width: '100%' }}>
          Item added successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleCloseErrorMsg} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseErrorMsg} severity="error" sx={{ width: '100%' }}>
          Unable to add item. Please try again later!
        </Alert>
      </Snackbar>
      <div className="flex items-center bg-[#032538] p-5 justify-between">
        <div className="flex gap-5 items-center text-white/70">
          <Link to="/" className="text-xl px-4 font-bold text-white">
            RIM PORTAL
          </Link>
          <Link to="/" className="hover:text-white">
            <p className={`cursor-pointer px-4 py-2 ${text ? "" : "bg-white/20"}`}>Home</p>
          </Link>
          <div className="dropdown group text-white/70 hover:text-white">
            <p className={`cursor-pointer flex items-center justify-center gap-4 px-4 py-2 ${text ? " bg-white/20" : ""}`}>{text ? text : "Requests"} <FaAngleDown /></p>

            <div className="dropdown-content z-10 absolute bg-[#032538] hidden group-hover:block shadow-xl">
              <Link to="/sent" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests - Sent
              </Link>
              <Link to="/received" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests - Received
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex">
            <input
              className="searchbar border-none outline-none text-sm px-5 py-2 w-72"
              type="text"
              placeholder="Search item"
              onChange={filter}
            ></input>
            <div className="flex justify-center items-center bg-[#A2D5F2] px-4 cursor-pointer text-xl text-[#032538] hover:bg-[#52a6de]">
              <IoSearch />
            </div>
          </div>
          <button className="cursor-pointer flex justify-center items-center text-sm text-[#032538] font-medium bg-[#A2D5F2] hover:bg-[#52a6de] px-5" onClick={handleClickOpenAddModal}>Add item +</button>
        </div>
      </div>
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle className='bg-[#032538] text-white'>
          <div className='text-2xl'>Add an Item</div>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
          <div className='mt-8 flex flex-col gap-8'>
            <TextField id="item-name" label="Item Name" variant="outlined" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='grid grid-cols-2 gap-8'>
                <TextField id="quantity" label="Quantity" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Purchase Date"
                  value={purchaseDate}
                  onChange={(newValue) => {
                    setPurchaseDate(newValue);
                  }}
                />
              </div>
            </LocalizationProvider>
            <div className='grid grid-cols-2 gap-8'>
              <FormControl fullWidth>
                <InputLabel id="owned-by">Owned By</InputLabel>
                <Select
                  id="owned-by"
                  value={ownedBy}
                  label="Owned By"
                  onChange={handleOwnership}
                >
                  <MenuItem value={"Coding Club"}>Coding Club</MenuItem>
                  <MenuItem value={"Design Club"}>Design Club</MenuItem>
                  <MenuItem value={"Electronics Club"}>Electronics Club</MenuItem>
                  <MenuItem value={"Robotics Club"}>Robotics Club</MenuItem>
                  <MenuItem value={"Consulting & Analytics"}>Consulting & Analytics</MenuItem>
                  <MenuItem value={"E-Cell"}>E-Cell</MenuItem>
                  <MenuItem value={"Aeromodelling Club"}>Aeromodelling Club</MenuItem>
                  <MenuItem value={"IITG.Ai Club"}>IITG.Ai Club</MenuItem>
                  <MenuItem value={"Automobile Club"}>Automobile Club</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  id="category"
                  value={category}
                  label="Category"
                  onChange={handleCategory}
                >
                  <MenuItem value={"Major Equipment"}>Major Equipment</MenuItem>
                  <MenuItem value={"Minor Equipment"}>Minor Equipment</MenuItem>
                  <MenuItem value={"Consumables"}>Consumables</MenuItem>
                  <MenuItem value={"Furniture"}>Furniture</MenuItem>
                  <MenuItem value={"Books"}>Books</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='grid grid-cols-3 gap-8'>
              <div>
                <p className='font-medium'>Bill</p>
                <Button variant="outlined" component="label" fullWidth>
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </div>
              <div>
                <p className='font-medium'>Sanction letter</p>
                <Button variant="outlined" component="label" fullWidth>
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </div>
              <div>
                <p className='font-medium'>Purchase order</p>
                <Button variant="outlined" component="label" fullWidth>
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </div>
            </div>
            {/* <TextField required id="remarks" label="Quantity" variant="outlined" /> */}
            <TextField id="remarks" label="Remarks/Description" variant="outlined" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          </div>
        </DialogContent>
        <DialogActions className='m-4 flex gap-2'>
          <Button variant="outlined" onClick={handleCloseAddModal} style={{
            // backgroundColor: "#021018",
            color: "#021018",
            border: "1px solid #021018",
            padding: "0.5rem 2rem",
            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
          }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} style={{
            backgroundColor: "#021018",
            color: "white",
            padding: "0.5rem 2rem",
            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
