import React, { useState } from 'react'
import ClubSelect from './club_dropdown';
import CategorySelect from './category_dropdown';
import DayTime from './day_time';
import dayjs from 'dayjs';
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontSize: 12,
    },
  });

const FilterContent = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 32px 24px;
    gap: 30px;
    

`;

const FilterHead = styled.div`

    background-color: #032538;
    font-size: 24px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding: 0px 24px;
    height: 71px;
    align-content: center;
    color: white;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    width: 30vw;
    height: 71px;

    background: #032538;
`;

const Wrap = styled.div`

    width: min-content;
    align-items: center;
    height: 90vh;
    background-color: #FAFAFA;

`;

function Filter(props) {

  const [startDate, setStartDate] = useState(dayjs("01/01/2014", 'DD/MM/YYYY'));
  const [endDate, setEndDate] = useState(dayjs());
  const [clubName, setClubName] = useState("");
  const [catName, setCatName] = useState("");

  props.startDate(startDate);
  props.endDate(endDate);
  props.clubName(clubName);
  props.catName(catName);

  return (
    <Wrap>
        <FilterHead>Filters</FilterHead>
        <ThemeProvider theme = {theme}>
            <FilterContent>
                <ClubSelect clubName = {setClubName} />
                <CategorySelect catName = {setCatName} />
                <DayTime startDate = {setStartDate} endDate = {setEndDate} />
            </FilterContent>
        </ThemeProvider>
    </Wrap>
  );
}

export default Filter;