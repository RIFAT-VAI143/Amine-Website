* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: #fff;
    min-height: 100vh;
}

.navbar {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 800;
}

.logo-icon {
    font-size: 2rem;
}

.logo-text {
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.search-container {
    display: flex;
    gap: 0.5rem;
    flex: 1;
    max-width: 500px;
}

.search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
}

.search-input:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.search-btn {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.search-btn:hover {
    transform: translateY(-2px);
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-links a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    cursor: pointer;
}

.nav-links a:hover {
    color: #4ecdc4;
}

.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2));
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.9;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.anime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
}

.anime-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    backdrop-filter: blur(10px);
}

.anime-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.anime-poster {
    position: relative;
    padding-top: 140%;
    overflow: hidden;
}

.anime-poster img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.anime-card:hover .anime-poster img {
    transform: scale(1.05);
}

.anime-info {
    padding: 1rem;
}

.anime-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.anime-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    opacity: 0.8;
}

.type-badge {
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-size: 0.7rem;
    font-weight: 600;
}

.loading {
    text-align: center;
    padding: 4rem;
    font-size: 1.5rem;
    grid-column: 1 / -1;
}

.loading::after {
    content: '...';
    animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
}

.modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow-y: auto;
}

.modal-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    margin: 5% auto;
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 800px;
    position: relative;
}

.video-modal {
    max-width: 1000px;
}

.close {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 10;
}

.close:hover {
    color: #ff6b6b;
}

.episode-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
    max-height: 500px;
    overflow-y: auto;
}

.episode-btn {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
}

.episode-btn:hover {
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    transform: translateY(-2px);
}

.server-list {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.server-btn {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
}

.server-btn:hover {
    background: #4ecdc4;
    transform: translateY(-2px);
}

.video-container {
    margin-top: 1rem;
}

video {
    width: 100%;
    border-radius: 10px;
    outline: none;
}

@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
    }
    
    .search-container {
        width: 100%;
        max-width: none;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
}
