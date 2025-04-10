import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GifExpertApp } from './GifExpertApp';
import { MyMemesPage } from './pages/MyMemesPage';
import { Navbar } from './components/Navbar';
import { ColorProvider } from './context/ColorContext';
import { GifsProvider } from './context/GifsContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ColorProvider>
            <GifsProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<GifExpertApp />} />
                        <Route path="/my-memes" element={<MyMemesPage />} />
                    </Routes>
                </BrowserRouter>
            </GifsProvider>
        </ColorProvider>
    </React.StrictMode>
);
