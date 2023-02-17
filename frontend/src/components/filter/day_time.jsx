import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styled from "styled-components";


const Wrap = styled.div`

    display: flex;
    flex-direction: row;
    gap: 8px;

`;

function DayTimeSelector() {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Wrap>
            <DateTimePicker
                label="From Date"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                label="To Date"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </Wrap>

    </LocalizationProvider>
  );
}


const Heading = styled.div`

  color: #032538;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  /* identical to box height, or 89% */

  letter-spacing: 0.32px;
  margin : 16px 0px 24px 0px;

`;

export default function DayTime(){

  return(
    <div>
      <Heading>Purchased On</Heading>
      <DayTimeSelector></DayTimeSelector>
    </div>

  )

}