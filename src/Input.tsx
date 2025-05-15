import React, { useState } from 'react';
import { CITIES, City, ConnectionStats } from './constants';
import { calculateTicketStats, capitalise, toFormattedDuration } from './utils';


const fromDefault = 'praha';
const toDefault = 'brno';

export const Input: React.FC = () => {
  const [from, setFrom] = useState(fromDefault);
  const [to, setTo] = useState(toDefault);
  const [age, setAge] = useState(NaN);
  const [isChecked, setIsChecked] = useState(false);
  const stats = calculateTicketStats({from: from as City, to: to as City, age, luggage: isChecked });

  return (
    <div> 
      <form>
        <div id='form-group'>
          <label>Jedu z:</label>
          <select id='from' value={from} onChange={e => setFrom(e.target.value)}>{
            CITIES.map(city => <option key={city} value={city}>{capitalise(city)}</option>)
           }
          </select>
          <label>do:</label>
          <select id='to' value={to} onChange={e => setTo(e.target.value)}>{
            CITIES.map(city => <option key={city} value={city}>{capitalise(city)}</option>)
          }           
          </select>
        </div>
        <div id='form-group'>
          <label>Můj věk:</label>
          <input name='age' type='number' onChange={e => setAge(Number(e.target.value))}></input>
        </div>
        <div id='form-group'>
          <label>Beru si zavazadlo:</label>
          <input type="checkbox" id="checkbox" name="luggage" checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
        </div>
      </form>
      <TicketStats stats={stats} />
    </div>
   )
}

export const TicketStats: React.FC<{stats: ConnectionStats}> = ({stats: {price, duration}}) => {
  return <p>Cena jízdenky: {price} Kč<br/>Doba jízdy: {toFormattedDuration(duration)}</p>
}

// export const Select: React.FC<{id: 'to' | 'from', selected: Destination}> = (props) => {
//   return (
//     <select id={props.id} onChange={e => setFrom(e.target.value)}>{
//       DESTINATIONS.map(city => {
//         const capitalised = city.charAt(0).toUpperCase() + city.slice(1);
//         if (props.selected === city) {
//           return <option value={city} selected>{capitalised}</option>
//         }
//         return <option value={city}>{capitalised}</option>})
//     }
//     </select>
//   )
// }
