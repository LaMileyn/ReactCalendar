import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 16px;
  background-color: #1E1F21;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Day = styled.span`
  font-size: 32px;
  color: white;

`
const Month = styled(Day)`
  font-weight: bold;
  margin-right: 15px;
`
const ButtonWrapper = styled('button')`
  background-color: #565759;
  color: #E6E6E6;
  border-radius: 4px;
  margin-right: 2px;
  padding: 3px 6px; 
  cursor: pointer;
  border: unset;
`

const Monitor = ({today,prevHandler,todayHandler,nextHandler}) => {
    return (
        <Wrapper>
            <div>
                <Month>{today.format("MMMM")}</Month>
                <Day>{today.format("YYYY")}</Day>
            </div>
            <div>
                <ButtonWrapper onClick = {prevHandler}>&lt;</ButtonWrapper>
                <ButtonWrapper onClick = {todayHandler}>Today</ButtonWrapper>
                <ButtonWrapper onClick = {nextHandler}>&gt;</ButtonWrapper>
            </div>
        </Wrapper>
    )
}
export {Monitor};