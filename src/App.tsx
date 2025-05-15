import React from 'react';
import { Info } from './Info';
import { Input } from './Input';

export const App: React.FC = () => {
  return (
    <div>
      <h1>Zjisti cenu vlakové jízdenky</h1>
      <Input />
      <Info />
    </div>
    
  )
}

export default App
