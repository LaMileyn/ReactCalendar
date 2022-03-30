import React from 'react';
import styled from "styled-components";
import moment from "moment";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #404040;
  gap: ${props => props.months ? '0px' : "1px"};;
`
const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${props => props.months ? '24px' : "88px"};
  border-bottom: ${props => props.months ? '1px solid #404040' : "0"};;
  background-color: ${props => props.weekend ? "#272829" : "#1E1F21"};
  color: ${props => props.selectedMonth ? (props.weekend ? "gray" : "#DDDCDD") : "#555759"};
`
const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${props => props.padding ? '8px' : 0};
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : "flex-start"};
`
const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`

const ActiveDate = styled.div`
  background-color: #e60000;;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`
const EventListWrapper = styled('ul')`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`
const EventItemWrapper = styled('button')`
  position: relative;
  left: -14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #DDDDDD;
  cursor: pointer;
  padding: 0;
  text-align: left;
  margin: 0;
`
const Calendar = ({startDay, currTime, events,openFormHandler}) => {
    const totalDays = 6 * 7;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())
    const checkTheDay = (day) => moment().isSame(day, 'day');
    const checkTheMonth = (day) => {
        return currTime.isSame(day, 'month')
    };

    return (
        <>
            <GridWrapper months>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper months selectedMonth={true} key={i}>
                        <RowInCell justifyContent={'flex-end'} padding>
                            <ShowDayWrapper>
                                {moment().day(i + 1).format("ddd")}
                            </ShowDayWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                {daysArray.map((dayItem, i) => (
                    <CellWrapper
                        key={dayItem.unix()}
                        weekend={dayItem.day() === 6 || dayItem.day() === 0}
                        selectedMonth={checkTheMonth(dayItem)}
                    >
                        <RowInCell justifyContent={"flex-end"}>
                            <ShowDayWrapper>
                                <DayWrapper onClick = { () => openFormHandler("Create")}>
                                    {
                                        checkTheDay(dayItem)
                                            ? (<ActiveDate>{dayItem.format("D")}</ActiveDate>)
                                            : dayItem.format("D")
                                    }

                                </DayWrapper>
                            </ShowDayWrapper>
                            <EventListWrapper>
                                {
                                    events?.filter(event => event.date >= dayItem.format("X") && event.date <= dayItem.clone().endOf('day').format("X"))
                                        .map(event => (
                                            <li key={event.id}>
                                                <EventItemWrapper onClick = { () => openFormHandler("Update",event)}>
                                                    {event.title}
                                                </EventItemWrapper>
                                            </li>
                                        ))
                                }
                            </EventListWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
        </>

    )
}
export {Calendar};