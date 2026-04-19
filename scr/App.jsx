// ================= FILE: src/App.jsx =================
import { useState, useEffect } from 'react';
import Search from './components/Search';
import Hero from './components/Hero';
import Row from './components/Row';
import Modal from './components/Modal';
import { searchAnime } from './api';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [heroAnime, setHeroAnime] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // default trending / initial load - search for popular keyword
  useEffect(() => {
    const loadDefault = async () => {
      const res = await searchAnime('naruto');
      if (res.results?.length) {
        setSearchResults(res.results);
        setHeroAnime(res.results[0]);
      }
    };
    loadDefault();
  }, []);

  const handleSearchResults = (results, firstItem) => {
    setSearchResults(results);
    setHeroAnime(firstItem);
  };

  const openAnimeModal = (anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ✦ ANIME X HUB
        </div>
        <Search onSearchResults={handleSearchResults} />
      </div>

      <Hero anime={heroAnime} onWatch={openAnimeModal} />

      {searchResults.length > 0 && (
        <Row title="🔥 DISCOVERIES" items={searchResults} onCardClick={openAnimeModal} />
      )}

      {isModalOpen && selectedAnime && (
        <Modal anime={selectedAnime} onClose={closeModal} />
      )}
    </div>
  );
}
