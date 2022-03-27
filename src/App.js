
import './App.css';
import moment from 'moment';
import {Header} from "./components/Header";
import {Monitor} from "./components/Monitor";
import {Calendar} from "./components/Calendar";
import {useState} from "react";



function App() {

    moment.updateLocale('en', { week : {dow : 1}})
    const [today,setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    const prevHandler = () => setToday( prev => prev.clone().subtract(1,'month'))
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday( prev => prev.clone().add(1,'month'))


  return (
    <section className="calendar">
      <Header/>
      <Monitor today = {today} prevHandler = {prevHandler} todayHandler={todayHandler} nextHandler ={nextHandler} />
      <Calendar startDay = {startDay} currTime = {today}/>
    </section>
  );
}

export default App;
