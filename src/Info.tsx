import React from 'react';

export const Info: React.FC = () => {
  return (
    <div id="info-grid">
      <img src="../assets/map.png" />
      <h2>Typy jízdenek</h2>
      <table>
        <thead>
          <tr>
            <th>Typ</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dospělí</td>
            <td>plná cena</td>
          </tr>
          <tr>
            <td>Studenti (15-26 let)</td>
            <td>25% sleva</td>
          </tr>
          <tr>
            <td>Děti (&lt;15 let)</td>
            <td>66% sleva</td>
          </tr>
          <tr>
            <td>Senioři (&#8805;75 let)</td>
            <td>zdarma</td>
          </tr>
          <tr>
            <td>Zavazadlo</td>
            <td>50 Kč na jednu zastávku, jinak 100 Kč</td>
          </tr>
        </tbody>
      </table>
      <h2>Speciální ceny</h2>
      <table>
        <thead>
          <tr>
            <th>Linka</th>
            <th>Doba</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🔴 Praha ↔ Brno</td>
            <td>2:30</td>
            <td>400 Kč</td>
          </tr>
          <tr>
            <td>🔵 Brno ↔ Ostrava</td>
            <td>2:15</td>
            <td>350 Kč</td>
          </tr>
          <tr>
            <td>🟢 Praha ↔ Ostrava</td>
            <td>3:00</td>
            <td>600 Kč</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
