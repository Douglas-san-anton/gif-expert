import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GifExpertApp } from './GifExpertApp';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyMemesPage } from './pages/MyMemesPage';
import { Navbar } from './components/Navbar';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<GifExpertApp />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/my-memes" element={<MyMemesPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
