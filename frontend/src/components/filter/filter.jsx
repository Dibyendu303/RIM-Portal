import ClubSelect from './club_dropdown';
import CategorySelect from './category_dropdown';
import DayTime from './day_time';
import styled from "styled-components";

const FilterContent = styled.div`

    width: 85%;

    /* background-color: red; */
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
    /* margin: 20px; */
    gap: 30px;

`;

const FilterHead = styled.div`

    background-color: #032538;
    font-size: 24px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    /* padding: 37px 27.5px; */
    padding: 0px 30px;
    height: 71px;
    align-content: center;
    color: white;

    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding: 26px 32px; */
    gap: 10px;

    width: 356px;
    height: 71px;

    background: #032538;
`;

const Wrap = styled.div`

    width: min-content;
    align-items: center;
    height: 90vh;
    border: 4px #032538 solid;

`;


function Filter() {
  return (
    <Wrap>
        <FilterHead>Filters</FilterHead>
        <FilterContent>
            <ClubSelect></ClubSelect>
            <CategorySelect></CategorySelect>
            <DayTime></DayTime>
        </FilterContent>

    </Wrap>
  );
}

export default Filter;