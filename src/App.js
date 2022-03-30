import './App.css';
import moment from 'moment';
import {Header} from "./components/Header";
import {Monitor} from "./components/Monitor";
import {Calendar} from "./components/Calendar";
import {useEffect, useState} from "react";
import videoo from './videos/vidos.MOV'
import styled from "styled-components";


const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FormWrapper = styled('div')`
  width: 250px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: unset;
  border-radius: 10px;
`
const EventTittle = styled('input')`
  padding: 11px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid #464648;
`
const EventBody = styled('input')`
  padding: 11px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  border-bottom: 1px solid #464648;
`
const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`
const Button = styled('button')`
  padding: 4px 7px;
  border: unset;
  background-color: #2e2e31;
  color: #fff;
  cursor: pointer;
  margin-right: 7px;
  border-radius: 3px;

`
const defaultEvent = {
    title: "",
    description: "",
    date: moment().format("X")
}

function App() {

    moment.updateLocale('en', {week: {dow: 1}})
    const [today, setToday] = useState(moment())
    const [event, setEvent] = useState(null)
    const [events, setEvents] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [currenMethod, setCurrentMethod] = useState("")
    const startDay = today.clone().startOf('month').startOf('week');
    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'))
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))


    const startDateQuery = startDay.clone().format("X")
    const endDateQuery = startDay.clone().add(42, "days").format("X")

    const openFormHandler = (method, eventToUpdate) => {
        setEvent(eventToUpdate || defaultEvent)
        setOpenForm(true)
        setCurrentMethod(method)
    }


    useEffect(async () => {
        const res = await fetch(`http://localhost:5000/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`);
        const data = await res.json();
        setEvents(data)
    }, [today])

    const cancelButtonHandler = () => {
        setOpenForm(false)
    }

    const changeFieldValuesHandler = (text, field) => {
        setEvent(prev => (
            {
                ...prev,
                [field]: text
            }
        ))
    }
    const eventFetchHandler = () => {
        const fetchUrl = currenMethod === "Update" ? `http://localhost:5000/events/${event.id}` : `http://localhost:5000/events`;
        const httpMethod = currenMethod === "Update" ? "PATCH" : "POST";
        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(res => {
                cancelButtonHandler()
                if ( currenMethod === "Create"){
                    setEvents( prev => [...prev,res])
                }else{
                    setEvents( prev => prev.map( el => el.id === res.id ? res : el))
                }
                console.log(res)
            })
    }

    return (
        <section className="calendar">
            {
                openForm
                    ? (
                        <FormPositionWrapper onClick={cancelButtonHandler}>
                            <FormWrapper onClick={e => e.stopPropagation()}>
                                <EventTittle
                                    onChange={e => changeFieldValuesHandler(e.target.value, "title")}
                                    value={event.title} placeholder="Title"></EventTittle>
                                <EventBody
                                    onChange={e => changeFieldValuesHandler(e.target.value, "description")}
                                    value={event.description} placeholder="Description"
                                ></EventBody>
                                <ButtonsWrapper>
                                    <Button onClick={cancelButtonHandler}>Cancel</Button>
                                    <Button onClick={eventFetchHandler}>{currenMethod}</Button>
                                </ButtonsWrapper>
                            </FormWrapper>
                        </FormPositionWrapper>
                    )
                    : null
            }
            <Header/>
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler} nextHandler={nextHandler}/>
            <Calendar startDay={startDay} currTime={today} events={events} openFormHandler={openFormHandler}/>
        </section>
    );
}

export default App;
