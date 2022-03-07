import React from 'react';

import 'normalize.css';

import { Calc } from './components/Calc';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Calc />
    </div>
  );
};
