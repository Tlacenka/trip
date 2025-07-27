import React, { useState } from 'react';
import { CITIES, City, ConnectionStats } from './constants';
import { calculateTicketStats, capitalise, toFormattedDuration } from './utils';

const fromDefault = 'praha';
const toDefault = 'brno';

export const Input: React.FC = () => {
  const [from, setFrom] = useState<City>(fromDefault);
  const [to, setTo] = useState<City>(toDefault);
  const [age, setAge] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const stats = calculateTicketStats({ from, to, age, luggage: isChecked });

  // BUG 8: "Mám zavazadlo" → "Mam zavazadlo"
  return (
    <div>
      <form>
        <div id="form-group">
          <label>
            Jedu z:
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value as City)}
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {capitalise(city)}
                </option>
              ))}
            </select>
          </label>
          <label>
            do:
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value as City)}
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {capitalise(city)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Můj věk:
            <input
              name="age"
              type="number"
              onChange={(e) =>
                setAge(e.target.value ? Number(e.target.value) : null)
              }
            ></input>
          </label>
          <label>
            Mam zavazadlo:
            <input
              type="checkbox"
              id="checkbox"
              name="luggage"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            ></input>
          </label>
        </div>
      </form>
      <TicketStats stats={stats} />
    </div>
  );
};

export const TicketStats: React.FC<{ stats: ConnectionStats }> = ({
  stats: { price, duration },
}) => {
  // BUG 7: when age is missing (price is not calculated yet), undefined appears instead of a dash
  return (
    <p>
      Cena jízdenky: <strong>{price ?? 'undefined'} Kč</strong>
      <br />
      Doba jízdy: <strong>{toFormattedDuration(duration)}</strong>
    </p>
  );
};
