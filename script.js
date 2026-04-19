const API_BASE = 'https://anime-api-27gm.onrender.com';
const API_KEY = 'RIFATExE_ANIME143';

let currentAnimeId = null;

async function fetchAPI(endpoint) {
    try {
        const url = `${API_BASE}${endpoint}?key=${API_KEY}`;
        console.log('Fetching:', url); // Debug log
        const response = await fetch(url);
        const data = await response.json();
        console.log('Response:', data); // Debug log
        return data;
    } catch (error) {
        console.error('API Error:', error);
        alert('Failed to connect to API. Check console for details.');
        return null;
    }
}

async function searchAnime() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) {
        alert('Enter anime name');
        return;
    }
    
    document.getElementById('content').innerHTML = '<div class="loading">Searching...</div>';
    const data = await fetchAPI(`/api/search?keyword=${encodeURIComponent(keyword)}`);
    
    if (data && data.results && data.results.length > 0) {
        displayAnimeList(data.results);
    } else {
        document.getElementById('content').innerHTML = '<div class="loading">No results found. Try "naruto" or "one piece"</div>';
    }
}

async function loadHome() {
    document.getElementById('content').innerHTML = '<div class="loading">Loading popular anime...</div>';
    const data = await fetchAPI('/api/most-searched');
    
    if (data && data.results && data.results.length > 0) {
        displayAnimeList(data.results);
    } else {
        // Fallback to search if most-searched fails
        document.getElementById('content').innerHTML = '<div class="loading">Loading trending...</div>';
        const homeData = await fetchAPI('/api/home');
        if (homeData && homeData.top_trending) {
            const trendingAnime = [];
            for (const category in homeData.top_trending) {
                trendingAnime.push(...homeData.top_trending[category]);
            }
            displayAnimeList(trendingAnime);
        } else {
            document.getElementById('content').innerHTML = '<div class="loading">Try searching for an anime!</div>';
        }
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
                <img src="${anime.poster || 'https://via.placeholder.com/200x280?text=No+Image'}" alt="${anime.title || anime.name}" onerror="this.src='https://via.placeholder.com/200x280?text=No+Image'">
            </div>
            <div class="anime-info">
                <div class="anime-title">${anime.title || anime.name || 'Unknown'}</div>
                <div style="font-size:0.8rem; opacity:0.8;">${anime.type || 'TV'} • ${anime.sub_episodes || anime.total_episodes || '?'} eps</div>
            </div>
        </div>
    `).join('');
}

async function getAnimeInfo(slug) {
    if (!slug) {
        alert('Invalid anime slug');
        return;
    }
    
    document.getElementById('content').innerHTML = '<div class="loading">Loading anime details...</div>';
    const data = await fetchAPI(`/api/anime/${slug}`);
    
    if (data && data.ani_id) {
        currentAnimeId = data.ani_id;
        showEpisodeModal(data);
        await loadEpisodes(currentAnimeId);
    } else {
        alert('Failed to load anime details. The API might be down or slug is invalid.');
        loadHome(); // Go back to home
    }
}

async function loadEpisodes(aniId) {
    const data = await fetchAPI(`/api/episodes/${aniId}`);
    
    if (data && data.episodes && data.episodes.length > 0) {
        displayEpisodes(data.episodes);
    } else {
        document.getElementById('episodeList').innerHTML = '<div class="loading">No episodes found</div>';
    }
}

function displayEpisodes(episodes) {
    const container = document.getElementById('episodeList');
    container.innerHTML = episodes.map(ep => `
        <button class="episode-btn" onclick="getEpisodeServers('${ep.token}')">
            Episode ${ep.number}
            ${ep.title ? `<br><small>${ep.title.substring(0, 20)}</small>` : ''}
        </button>
    `).join('');
}

async function getEpisodeServers(epToken) {
    if (!epToken) {
        alert('Invalid episode token');
        return;
    }
    
    document.getElementById('episodeList').innerHTML = '<div class="loading">Loading servers...</div>';
    const data = await fetchAPI(`/api/servers/${epToken}`);
    
    if (data && data.servers) {
        const allServers = [];
        for (const lang in data.servers) {
            data.servers[lang].forEach(server => {
                allServers.push({ ...server, lang });
            });
        }
        
        if (allServers.length === 0) {
            document.getElementById('episodeList').innerHTML = '<div class="loading">No servers available</div>';
            return;
        }
        
        document.getElementById('episodeList').innerHTML = `
            <h3>Select Server</h3>
            <div class="server-list">
                ${allServers.map(server => `
                    <button class="server-btn" onclick="getStreamUrl('${server.link_id}')">
                        ${server.name} (${server.lang})
                    </button>
                `).join('')}
            </div>
            <button onclick="loadEpisodes('${currentAnimeId}')" style="margin-top:1rem; padding:0.5rem 1rem; background:rgba(255,255,255,0.1); border:none; border-radius:5px; color:white; cursor:pointer;">
                ← Back to Episodes
            </button>
        `;
    } else {
        document.getElementById('episodeList').innerHTML = '<div class="loading">Failed to load servers</div>';
    }
}

async function getStreamUrl(linkId) {
    if (!linkId) {
        alert('Invalid link ID');
        return;
    }
    
    closeModal();
    document.getElementById('videoBody').innerHTML = '<div class="loading">Loading video stream...</div>';
    showVideoModal();
    
    const data = await fetchAPI(`/api/source/${linkId}`);
    
    if (data && data.sources && data.sources.length > 0) {
        const videoSource = data.sources.find(s => s.label === '1080p') || data.sources[0];
        const videoHtml = `
            <video id="animeVideo" controls autoplay style="width:100%; border-radius:10px;">
                <source src="${videoSource.file}" type="application/x-mpegURL">
                Your browser doesn't support HLS video. Try Chrome or Edge.
            </video>
            ${data.skip ? `
                <div style="margin-top:1rem; padding:1rem; background:rgba(0,0,0,0.5); border-radius:10px;">
                    <strong>⏭️ Skip Times:</strong><br>
                    ${data.skip.opening ? `🎵 Opening: ${data.skip.opening} seconds<br>` : ''}
                    ${data.skip.ending ? `🎬 Ending: ${data.skip.ending} seconds` : ''}
                </div>
            ` : ''}
            ${data.sources.length > 1 ? `
                <div style="margin-top:1rem;">
                    <strong>Quality:</strong><br>
                    <div class="server-list" style="margin-top:0.5rem;">
                        ${data.sources.map(source => `
                            <button class="server-btn" onclick="changeQuality('${source.file}')">
                                ${source.label || 'HD'}
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        document.getElementById('videoBody').innerHTML = videoHtml;
    } else {
        document.getElementById('videoBody').innerHTML = '<div class="loading">Failed to load video stream. Try another server.</div>';
    }
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
    document.getElementById('modalBody').innerHTML = `
        <h2>${animeInfo.title || 'Unknown Title'}</h2>
        ${animeInfo.poster ? `<img src="${animeInfo.poster}" style="width:150px; border-radius:10px; margin:1rem 0;" onerror="this.style.display='none'">` : ''}
        <p>${animeInfo.description || 'No description available'}</p>
        <p><strong>Type:</strong> ${animeInfo.type || 'N/A'} | <strong>Rating:</strong> ${animeInfo.rating || 'N/A'}</p>
        <p><strong>Sub:</strong> ${animeInfo.sub_episodes || '0'} | <strong>Dub:</strong> ${animeInfo.dub_episodes || '0'}</p>
        <h3 style="margin-top:1.5rem;">Episodes</h3>
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

// Load home page when script starts
loadHome();
