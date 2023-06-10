import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Header from './layout/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<BookPage />} />
      </Routes>
    </>
  );
};

export default App;
