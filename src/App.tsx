import React from 'react';
import { Info } from './Info';
import { Input } from './Input';

export const App: React.FC = () => {
  return (
    <div>
      <h1>Zjisti cenu a dobu jízdy vlakového spojení</h1>
      <Input />
      <Info />
    </div>
  );
};

export default App;
