import logo from './logo.svg';
import './App.css';
import moment from 'moment';



function App() {

  moment.updateLocale('en', { week : {dow : 1}})

  const startDay = moment().startOf('month').startOf('week');
  const endDay = moment().endOf('month').endOf('week');

  const day = startDay.clone()

  const calendar = []
  while (!day.isAfter(endDay)){
    calendar.push(day.clone())
    day.add(1,'day')
  }
  console.log(calendar)



  return (
    <div></div>
  );
}

export default App;
