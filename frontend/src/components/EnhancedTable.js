import * as React from 'react';
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

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];
// const rows = [
//     createData('Cupcake', 'Cupcake', 3.7, 67, 4.3),
//     createData('Donut', "Donut", 25.0, 51, 4.9),
//     createData('Eclair', "Eclair", 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 'Frozen yoghurt', 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 'Ice cream sandwich', 9.0, 37, 4.3),
//     createData('Gingerbread', 'Gingerbread', 16.0, 49, 3.9),
//     createData('Honeycomb', 'Honeycomb', 3.2, 87, 6.5),
//     createData('Jelly Bean', 'Jelly Bean', 0.0, 94, 0.0),
//     createData('KitKat', 'KitKat', 26.0, 65, 7.0),
//     createData('Lollipop', 'Lollipop', 0.2, 98, 0.0),
//     createData('Marshmallow', 'Marshmallow', 0, 81, 2.0),
//     createData('Nougat', 'Nougat', 19.0, 9, 37.0),
//     createData('Oreo', 'Oreo', 18.0, 63, 4.0),
// ];

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
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Owned By',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Held By',
    },
    {
        id: 'protein',
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
    const [open, setOpen] = React.useState(false);
    const [openRequest, setOpenRequest] = useState(false);
    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs());
    const [startTime, setStartTime] = React.useState(dayjs());
    const [endTime, setEndTime] = React.useState(dayjs());
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
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
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
                            <div className='w-full'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus purus eu nulla hendrerit sodales. Donec non libero enim. Nunc egestas neque a fermentum volutpat.
                            </div>
                            <div className="flex flex-col gap-6 w-3/4 items-end">
                                <Button variant="contained" className='w-24'>Request</Button>
                                <div>
                                    <span className='font-medium mr-4'>Purchased On : </span>
                                    <span> 3:04pm - 02/01/2023</span>

                                </div>
                                <div className="flex gap-4 text-blue-600 items-center cursor-pointer ">
                                    <span className="text-blue-600 hover:underline" onClick={handleClickDownload}>Download Content</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" /></svg>
                                </div>
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
                    <span onClick={handleCloseDownload} className="cursor-pointer text-2xl font-thin">x</span>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-4 p-4'>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Bill</p>
                            <div className='flex gap-4'>
                                <Button variant="outlined" onClick={handleCloseDownload} style={{
                                    // backgroundColor: "#021018",
                                    color: "#021018",
                                    border: "1px solid #021018",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>View</Button>
                                <Button variant="contained" onClick={handleCloseDownload} style={{
                                    backgroundColor: "#021018",
                                    color: "white",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>Download</Button>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Sanction Letter</p>
                            <div className='flex gap-4'>
                                <Button variant="outlined" onClick={handleCloseDownload} style={{
                                    // backgroundColor: "#021018",
                                    color: "#021018",
                                    border: "1px solid #021018",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>View</Button>
                                <Button variant="contained" onClick={handleCloseDownload} style={{
                                    backgroundColor: "#021018",
                                    color: "white",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>Download</Button>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-24'>
                            <p className='text-2xl'>Purchase order</p>
                            <div className='flex gap-4'>
                                <Button variant="outlined" onClick={handleCloseDownload} style={{
                                    // backgroundColor: "#021018",
                                    color: "#021018",
                                    border: "1px solid #021018",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>View</Button>
                                <Button variant="contained" onClick={handleCloseDownload} style={{
                                    backgroundColor: "#021018",
                                    color: "white",
                                    padding: "0.5rem 2rem",
                                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                }}>Download</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

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
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .map((row, index) =>
                                        <Row key={row.name} row={row} index={index} />
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}