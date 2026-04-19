// ================= FILE: src/components/Modal.jsx =================
import { useState, useEffect } from 'react';
import { getAnime, getEpisodes, getServers, getSource } from '../api';

export default function Modal({ anime, onClose }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [epLoading, setEpLoading] = useState(false);
  const [animeDetails, setAnimeDetails] = useState(null);

  // fetch full anime details + episodes
  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const slug = anime.slug;
        if (slug) {
          const details = await getAnime(slug);
          setAnimeDetails(details);
          // fetch episodes using anime id
          const animeId = details.id || anime.id;
          if (animeId) {
            const epsData = await getEpisodes(animeId);
            const episodesList = epsData.episodes || epsData || [];
            setEpisodes(episodesList);
            if (episodesList.length > 0) {
              setSelectedEpisode(episodesList[0]);
            }
          } else {
            setEpisodes([]);
          }
        } else {
          // fallback: try to use anime.id directly
          if (anime.id) {
            const epsData = await getEpisodes(anime.id);
            setEpisodes(epsData.episodes || epsData || []);
            if (epsData.episodes?.length) setSelectedEpisode(epsData.episodes[0]);
          }
        }
      } catch (err) {
        console.error("Modal fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [anime]);

  // when episode changes, fetch video source
  useEffect(() => {
    if (!selectedEpisode) return;
    async function loadVideo() {
      setEpLoading(true);
      setVideoUrl('');
      try {
        const token = selectedEpisode.token || selectedEpisode.id;
        if (!token) return;
        const serversData = await getServers(token);
        let serverList = serversData.servers || serversData;
        if (serverList && serverList.length) {
          const firstServer = serverList[0];
          const serverToken = firstServer.token || firstServer.id;
          if (serverToken) {
            const sourceData = await getSource(serverToken);
            const embedUrl = sourceData.source || sourceData.url || sourceData.embed;
            if (embedUrl) {
              let finalUrl = embedUrl;
              if (!embedUrl.startsWith('http')) finalUrl = `https:${embedUrl}`;
              setVideoUrl(finalUrl);
            } else {
              setVideoUrl('');
            }
          }
        }
      } catch (err) {
        console.error("video source error", err);
        setVideoUrl('');
      } finally {
        setEpLoading(false);
      }
    }
    loadVideo();
  }, [selectedEpisode]);

  const handleEpisodeClick = (ep) => {
    setSelectedEpisode(ep);
  };

  const title = animeDetails?.title || anime.title;
  const posterBg = animeDetails?.poster || anime.poster;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>✕</button>
        
        <div className="modal-video">
          {epLoading ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
              <span style={{ color: '#ff8a5c' }}>⚡ loading stream...</span>
            </div>
          ) : videoUrl ? (
            <iframe src={videoUrl} allowFullScreen title="anime-player"></iframe>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10', color: '#aaa' }}>
              🎬 No stream available for this episode
            </div>
          )}
        </div>

        <div className="modal-info">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{title}</h2>
          {animeDetails?.synopsis && <p style={{ opacity: 0.8, marginBottom: '20px' }}>{animeDetails.synopsis.slice(0, 180)}...</p>}
          
          <div>
            <strong style={{ color: '#ff8a5c' }}>📺 EPISODES</strong>
            <div className="episodes-list">
              {loading ? (
                <div className="loading">Loading episodes...</div>
              ) : episodes.length === 0 ? (
                <div className="empty-msg">No episodes found</div>
              ) : (
                episodes.map((ep, idx) => (
                  <button
                    key={ep.id || idx}
                    className={`episode-btn ${selectedEpisode?.id === ep.id || selectedEpisode?.number === ep.number ? 'active' : ''}`}
                    onClick={() => handleEpisodeClick(ep)}
                  >
                    {ep.number ? `Ep ${ep.number}` : ep.title ? ep.title : `Episode ${idx+1}`}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
