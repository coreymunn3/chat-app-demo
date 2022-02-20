import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Join, Chat } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Join />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
