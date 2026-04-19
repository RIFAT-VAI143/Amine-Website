const API_BASE = 'https://anime-api-27gm.onrender.com';
const API_KEY = 'RIFATExE_ANIME143';

let currentAnimeId = null;
let currentEpisodes = [];

async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}?key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

async function searchAnime() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) {
        alert('Please enter an anime name');
        return;
    }
    
    document.getElementById('content').innerHTML = '<div class="loading">Searching</div>';
    
    const data = await fetchAPI(`/api/search?keyword=${encodeURIComponent(keyword)}`);
    
    if (data && data.results) {
        displayAnimeList(data.results);
    } else {
        document.getElementById('content').innerHTML = '<div class="loading">No results found</div>';
    }
}

async function loadHome() {
    document.getElementById('content').innerHTML = '<div class="loading">Loading</div>';
    const data = await fetchAPI('/api/most-searched');
    
    if (data && data.results) {
        displayAnimeList(data.results);
    }
}

async function loadTrending() {
    document.getElementById('content').innerHTML = '<div class="loading">Loading trending</div>';
    const data = await fetchAPI('/api/home');
    
    if (data && data.top_trending) {
        const trendingAnime = [];
        for (const category in data.top_trending) {
            trendingAnime.push(...data.top_trending[category]);
        }
        displayAnimeList(trendingAnime);
    }
}

function displayAnimeList(animeList) {
    const container = document.getElementById('content');
    
    if (!animeList || animeList.length === 0) {
        container.innerHTML = '<div class="loading">No anime found</div>';
        return;
    }
    
    container.innerHTML = animeList.map(anime => `
        <div class="anime-card" onclick="getAnimeInfo('${anime.slug || anime.keyword}')">
            <div class="anime-poster">
                <img src="${anime.poster || 'https://via.placeholder.com/200x280?text=No+Image'}" alt="${anime.title}">
            </div>
            <div class="anime-info">
                <div class="anime-title">${anime.title || anime.name}</div>
                <div class="anime-meta">
                    <span>${anime.type || 'TV'}</span>
                    <span class="type-badge">${anime.sub_episodes || anime.total_episodes || '?'} eps</span>
                </div>
            </div>
        </div>
    `).join('');
}

async function getAnimeInfo(slug) {
    document.getElementById('content').innerHTML = '<div class="loading">Loading anime details</div>';
    
    const data = await fetchAPI(`/api/anime/${slug}`);
    
    if (data && data.ani_id) {
        currentAnimeId = data.ani_id;
        showEpisodeModal(data);
        await loadEpisodes(currentAnimeId);
    } else {
        alert('Failed to load anime details');
    }
}

async function loadEpisodes(aniId) {
    const data = await fetchAPI(`/api/episodes/${aniId}`);
    
    if (data && data.episodes) {
        currentEpisodes = data.episodes;
        displayEpisodes(currentEpisodes);
    } else {
        document.getElementById('episodeList').innerHTML = '<div class="loading">No episodes found</div>';
    }
}

function displayEpisodes(episodes) {
    const container = document.getElementById('episodeList');
    
    container.innerHTML = episodes.map(ep => `
        <button class="episode-btn" onclick="getEpisodeServers('${ep.token}', ${ep.number})">
            Episode ${ep.number}
            ${ep.title ? `<br><small>${ep.title.substring(0, 30)}</small>` : ''}
        </button>
    `).join('');
}

async function getEpisodeServers(epToken, epNumber) {
    document.getElementById('episodeList').innerHTML = '<div class="loading">Loading servers</div>';
    
    const data = await fetchAPI(`/api/servers/${epToken}`);
    
    if (data && data.servers) {
        displayServers(data.servers, epToken, epNumber);
    } else {
        alert('Failed to load servers');
    }
}

function displayServers(servers, epToken, epNumber) {
    const container = document.getElementById('episodeList');
    const allServers = [];
    
    for (const lang in servers) {
        servers[lang].forEach(server => {
            allServers.push({ ...server, lang });
        });
    }
    
    container.innerHTML = `
        <h3>Episode ${epNumber} - Select Server</h3>
        <div class="server-list">
            ${allServers.map(server => `
                <button class="server-btn" onclick="getStreamUrl('${server.link_id}')">
                    ${server.name} (${server.lang})
                </button>
            `).join('')}
        </div>
        <button onclick="loadEpisodes('${currentAnimeId}')" style="margin-top: 1rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: white; cursor: pointer;">
            ← Back to Episodes
        </button>
    `;
}

async function getStreamUrl(linkId) {
    closeModal();
    document.getElementById('videoBody').innerHTML = '<div class="loading">Loading video stream</div>';
    showVideoModal();
    
    const data = await fetchAPI(`/api/source/${linkId}`);
    
    if (data && data.sources && data.sources.length > 0) {
        displayVideo(data.sources, data.skip);
    } else {
        document.getElementById('videoBody').innerHTML = '<div class="loading">Failed to load video stream</div>';
    }
}

function displayVideo(sources, skip) {
    const videoSource = sources.find(s => s.label === '1080p') || sources[0];
    
    const videoHtml = `
        <div class="video-container">
            <video id="animeVideo" controls autoplay>
                <source src="${videoSource.file}" type="application/x-mpegURL">
                Your browser does not support the video tag.
            </video>
            ${skip ? `
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 10px;">
                    <h4>Skip Times:</h4>
                    ${skip.opening ? `<p>🎵 Opening: ${skip.opening} seconds</p>` : ''}
                    ${skip.ending ? `<p>🎬 Ending: ${skip.ending} seconds</p>` : ''}
                </div>
            ` : ''}
            <div style="margin-top: 1rem;">
                <h4>Available Qualities:</h4>
                <div class="server-list">
                    ${sources.map(source => `
                        <button class="server-btn" onclick="changeQuality('${source.file}')">
                            ${source.label || 'HD'}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('videoBody').innerHTML = videoHtml;
}

function changeQuality(url) {
    const video = document.getElementById('animeVideo');
    if (video) {
        const currentTime = video.currentTime;
        video.src = url;
        video.load();
        video.currentTime = currentTime;
        video.play();
    }
}

function showEpisodeModal(animeInfo) {
    const modal = document.getElementById('episodeModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${animeInfo.title}</h2>
        ${animeInfo.poster ? `<img src="${animeInfo.poster}" style="width: 150px; border-radius: 10px; margin: 1rem 0;">` : ''}
        <p>${animeInfo.description || 'No description available'}</p>
        <p><strong>Type:</strong> ${animeInfo.type} | <strong>Rating:</strong> ${animeInfo.rating || 'N/A'}</p>
        <p><strong>Sub:</strong> ${animeInfo.sub_episodes} | <strong>Dub:</strong> ${animeInfo.dub_episodes}</p>
        <h3 style="margin-top: 1.5rem;">Episodes</h3>
        <div id="episodeList" class="episode-list">Loading episodes...</div>
    `;
    
    modal.style.display = 'block';
}

function showVideoModal() {
    document.getElementById('videoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('episodeModal').style.display = 'none';
}

function closeVideoModal() {
    document.getElementById('videoModal').style.display = 'none';
    const video = document.getElementById('animeVideo');
    if (video) {
        video.pause();
        video.src = '';
    }
}

window.onclick = function(event) {
    const episodeModal = document.getElementById('episodeModal');
    const videoModal = document.getElementById('videoModal');
    if (event.target === episodeModal) closeModal();
    if (event.target === videoModal) closeVideoModal();
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchAnime();
});

loadHome();
