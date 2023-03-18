import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#032538",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const theme = createTheme({
    components: {
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: "lightgray",
                    "&:hover": {
                        color: "white"
                    },
                    "&.Mui-active": {
                        "&&": {
                            color: "white",

                            "& * ": {
                                color: "white"
                            }
                        }
                    }
                },
                icon: {
                    color: "white"
                }
            }
        }
    }
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Item name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'ownedBy',
        numeric: false,
        disablePadding: false,
        label: 'Owned By',
    },
    {
        id: 'heldBy',
        numeric: false,
        disablePadding: false,
        label: 'Held By',
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell />
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function Row(props) {
    const { row, index } = props;
    const labelId = `enhanced-table-checkbox-${index}`;
    const [open, setOpen] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [booked, setBooked] = useState({});
    const [errorRange, setErrorRange] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);
    const [openDownload, setOpenDownload] = useState(false);

    const handleClickDownload = () => {
        setOpenDownload(true);
    };

    const handleCloseDownload = () => {
        setOpenDownload(false);
    };


    function roundMinutes(d) {
        const date = new Date(d);
        date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
        date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

        return date.getTime();
    }

    let timeSlot = [
        {
            Start: 1675286076000,
            End: 1675472840000
        },
        {
            Start: 1675712800000,
            End: 1676012276000
        }
    ];

    //set occupied time to next nearest hour   
    const occupiedTime = timeSlot.map((item) => {
        return { Start: roundMinutes(item.Start), End: roundMinutes(item.End) };
    })

    useEffect(() => {

        const temp = { ...booked, startDate: new Date().getTime(), endDate: new Date().getTime(), startTime: new Date().getTime(), endTime: new Date().getTime() };
        setBooked(temp);
        // eslint-disable-next-line
    }, [])

    const isValidRange = () => {
        const sDate = new Date(booked.startDate);
        const sTime = new Date(booked.startTime);
        const eDate = new Date(booked.endDate);
        const eTime = new Date(booked.endTime);
        const startRange = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sTime.getHours(), sTime.getMinutes(), sTime.getSeconds()).getTime();
        const endRange = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate(), eTime.getHours(), eTime.getMinutes(), eTime.getSeconds()).getTime();
        // console.log("Startrange: " + startRange);
        // console.log("endRange: " + endRange);
        let flag = false;
        occupiedTime.forEach((item => {
            if (startRange <= item.Start && item.End <= endRange) {
                flag = true;
            }
        }))

        if (startRange > endRange)
            setInvalidDate(true);
        else
            setInvalidDate(false);
        return flag;
    }

    const checkAvailabilityDate = (date) => {
        //return true if disabled
        const dt = date.toDate();
        const time1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0).getTime();
        const time2 = time1 + 86400000;

        // console.log(date.toDate());
        // console.log(time1 + " " + time2);
        let flag = false;
        occupiedTime.forEach((item => {
            if (item.Start <= time1 && time2 <= item.End) {
                flag = true;
            }
        }))
        return flag;
    };
    const checkAvailabilityStart = (timeValue, clockType) => {
        //return true if disabled
        if (clockType === 'hours') {
            const date = startDate.toDate();
            const hour1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeValue).getTime();
            const hour2 = hour1 + 3600000;
            // console.log(date);
            // console.log("hours: " + hour1 + " " + hour2);
            let flag = false;
            occupiedTime.forEach((item => {
                if (item.Start <= hour1 && hour2 <= item.End) {
                    flag = true;
                }
            }))
            return flag;
        }
        return false;
    };
    const checkAvailabilityEnd = (timeValue, clockType) => {
        //return true if disabled
        if (clockType === 'hours') {
            const date = endDate.toDate();
            const hour1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeValue).getTime();
            const hour2 = hour1 + 3600000;
            // console.log(date);
            // console.log("hours: " + hour1 + " " + hour2);
            let flag = false;
            occupiedTime.forEach((item => {
                if (item.Start <= hour1 && hour2 <= item.End) {
                    flag = true;
                }
            }))

            return flag;
        }
        return false;
    };

    const handleRemoveItem = () => {
        if (window.confirm("Are you sure want to remove this item") === true) {
            console.log("API call to remove item");
        } else {
            console.log("Remove item request cancelled");
        }
    }

    useEffect(() => {
        const flag = isValidRange();
        setErrorRange(flag);
        // console.log("Range is: " + flag);
    }, [booked])

    const handleCloseRequest = () => {
        setOpenRequest(false);
    };
    const handleClickOpenRequest = () => {
        setOpenRequest(true);
    };
    const handleViewBill = () => {
        window.open(row.bill, "_blank", "noreferrer");
    }
    const handleViewSanctionLetter = () => {
        window.open(row.sanctionLetter, "_blank", "noreferrer");
    }
    const handleViewPurchaseOrder = () => {
        window.open(row.purchaseOrder, "_blank", "noreferrer");
    }

    const purchaseDate = new Date(parseInt(row.purchasedOn)).toLocaleString('en-IN');
    return (
        <React.Fragment>
            <TableRow style={index % 2 ? { background: "#A2D5F2" } : { background: "#FAFAFA" }}>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                >
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.ownedBy}</TableCell>
                <TableCell align="left">{row.heldBy}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className="flex px-8 py-8 gap-16">
                            <div className='w-full flex flex-col gap-4 justify-between'>
                                {/* <div>{row.description || <span className='italic'>No description provided</span>}</div> */}
                                <div>
                                    <span className='font-medium mr-4'>Remarks : </span>
                                    <span> {row.remarks || <span className='italic'>No remarks</span>}</span>
                                </div>
                                <div>
                                    <span className='font-medium mr-4'>Purchased On : </span>
                                    <span> {purchaseDate}</span>
                                </div>
                                <div>
                                    <div className="cursor-pointer text-red-600 hover:underline flex w-fit items-center gap-2" onClick={handleRemoveItem}>Remove item <FaTrashAlt /></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 w-3/4 items-end">
                                <Button variant="contained" className='w-24' onClick={handleClickOpenRequest}>Request</Button>
                                <div className="cursor-pointer text-blue-600 hover:underline flex justify-center items-center gap-2" onClick={handleClickDownload}>Download Content <FiDownload /></div>
                            </div>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Dialog open={openRequest} onClose={handleCloseRequest}>
                <DialogTitle className='bg-[#032538] text-white flex justify-between'>
                    <div className='text-2xl'>Request Form</div>
                    <div className='grid grid-cols-2 items-center'>
                        <p className='text-base text-right mr-4 text-white/90'>Item: </p>
                        <p className='text-sm font-normal text-white/80'>Hp Monitor</p>
                        <p className='text-base text-right mr-4 text-white/90'>Owned By: </p>
                        <p className='text-sm font-normal text-white/80'>Coding Club</p>
                        <p className='text-base text-right mr-4 text-white/90'>Requested By: </p>
                        <p className='text-sm font-normal text-white/80'>4i Labs</p>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div>
                            <h3 className='font-medium mt-2 mb-4'>From Time</h3>
                            <div className='flex justify-between gap-8'>
                                <DatePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Select Date"
                                    value={startDate}
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                        // setStartTime(newValue);
                                        // console.log(newValue.toDate());
                                        const temp = { ...booked, startDate: newValue.toDate().getTime() };
                                        // console.log(temp);
                                        setBooked(temp);
                                    }}
                                    shouldDisableDate={checkAvailabilityDate}
                                />
                                <TimePicker
                                    renderInput={(params) => <TextField {...params} />}
                                    label="Select Time"
                                    value={startTime}
                                    onChange={(newValue) => {
                                        setStartTime(newValue);
                                        const temp = { ...booked, startTime: newValue.toDate().getTime() };
                                        // console.log(temp);
                                        setBooked(temp);
                                        // console.log(newValue.toDate().getTime());
                                    }}
                                    disabled={!booked.startDate}
                                    // views={['hours']}
                                    // disableMinutes={true}
                                    shouldDisableTime={checkAvailabilityStart}
                                />
                            </div>
                            <h3 className='font-medium my-4'>To Time</h3>
                            <div className='flex justify-between gap-8'>
                                <DatePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Select Date"
                                    value={endDate}
                                    onChange={(newValue) => {
                                        setEndDate(newValue);
                                        const temp = { ...booked, endDate: newValue.toDate().getTime() };
                                        // console.log(temp);
                                        setBooked(temp);
                                    }}
                                    shouldDisableDate={checkAvailabilityDate}
                                />
                                <TimePicker
                                    renderInput={(params) => <TextField {...params} />}
                                    label="Select Time"
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                        const temp = { ...booked, endTime: newValue.toDate().getTime() };
                                        // console.log(temp);
                                        setBooked(temp);
                                    }}
                                    disabled={!booked.endDate}
                                    shouldDisableTime={checkAvailabilityEnd}
                                />
                            </div>
                            {errorRange && <p className={` text-[#d32f2f] font-normal text-sm`}>Enter valid date range</p>}
                            {invalidDate && <p className={` text-[#d32f2f] font-normal text-sm`}>Start date must be smaller than end date</p>}
                        </div>
                    </LocalizationProvider>
                    <div className='mt-6 flex flex-col gap-8'>
                        <TextField id="remarks" label="Purpose/Remarks" variant="outlined" />
                        <TextField required id="remarks" label="Quantity" variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions className='m-4 flex gap-2'>
                    <Button variant="outlined" onClick={handleCloseRequest} style={{
                        // backgroundColor: "#021018",
                        color: "#021018",
                        border: "1px solid #021018",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseRequest} style={{
                        backgroundColor: "#021018",
                        color: "white",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }} disabled={errorRange}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDownload} onClose={handleCloseDownload}>
                <DialogTitle className='bg-[#032538] text-white flex justify-between items-center'>
                    <div className='text-2xl'>Downloads</div>
                    <span onClick={handleCloseDownload} className="cursor-pointer text-2xl font-thin"><IoClose /></span>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-4 p-4'>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Bill</p>
                            <div className='flex gap-4'>
                                {row.bill ?
                                    <>
                                        <Button variant="outlined" onClick={handleViewBill} style={{
                                            // backgroundColor: "#021018",
                                            color: "#021018",
                                            border: "1px solid #021018",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>View</Button>
                                        <Button variant="contained" onClick={handleViewBill} style={{
                                            backgroundColor: "#021018",
                                            color: "white",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>Download</Button>
                                    </>
                                    :
                                    <>
                                        <span className='text-lg'>Bill Not Found</span>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Sanction Letter</p>
                            <div className='flex gap-4'>
                                {row.sanctionLetter ?
                                    <>
                                        <Button variant="outlined" onClick={handleViewSanctionLetter} style={{
                                            // backgroundColor: "#021018",
                                            color: "#021018",
                                            border: "1px solid #021018",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>View</Button>
                                        <Button variant="contained" onClick={handleViewSanctionLetter} style={{
                                            backgroundColor: "#021018",
                                            color: "white",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>Download</Button>
                                    </>
                                    :
                                    <>
                                        <span className='text-lg'>Sanction Letter Not Found</span>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Purchase order</p>
                            <div className='flex gap-4'>
                                {row.purchaseOrder ?
                                    <>
                                        <Button variant="outlined" onClick={handleViewPurchaseOrder} style={{
                                            // backgroundColor: "#021018",
                                            color: "#021018",
                                            border: "1px solid #021018",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>View</Button>
                                        <Button variant="contained" onClick={handleViewPurchaseOrder} style={{
                                            backgroundColor: "#021018",
                                            color: "white",
                                            padding: "0.5rem 2rem",
                                            // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}>Download</Button>
                                    </>
                                    :
                                    <>
                                        <span className='text-lg'>Purchase order Not Found</span>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default function EnhancedTable(props) {
    // console.log(props.data);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={props.data.length}
                            />
                            <TableBody>
                                {stableSort(props.data, getComparator(order, orderBy))
                                    .map((row, index) =>
                                        <Row key={index} row={row} index={index} />
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}