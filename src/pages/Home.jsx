import React, { useState } from 'react';
import ContentExplorer from '../Components/ContentExplorer';
import heroBg from '../assets/anime-collage.jpg'; 
import animeCardImg from '../assets/kill-la-kill.jpg';
import mangaCardImg from '../assets/manga-art.jpg';
import gamingCardImg from '../assets/gaming-zeroboy.jpg';
import kpopCardImg from '../assets/kpop-guitar.jpg';
import movieCardImg from '../assets/cosplay-kaguya.jpg';
import comicCardImg from '../assets/comic-sketchbook.jpg';
import comicHoverBg from '../assets/comic-drawing-room.jpg';
import adventureTimeImg from '../assets/adventure-time-poster.jpg'; // 1st picture (Hover watermark image)
import tvIconImg from '../assets/tv-icon-logo.png'; // 2nd picture (Card image)
import './Home.css';

const Home = () => {
    const [userRole, setUserRole] = useState('Visitor');
    const [hoveredImage, setHoveredImage] = useState(null);

    const categoriesFromDb = [
        { id: 1, name: 'Anime', description: 'Anime fandom content', image: animeCardImg, count: '1.2k Items' },
        { id: 2, name: 'Gaming', description: 'Gaming and video game fandom content', image: gamingCardImg, count: '850 Items' },
        { id: 3, name: 'Movies', description: 'Movie and film fandom content', image: movieCardImg, count: '940 Items' },
        { id: 4, name: 'TV Shows', description: 'Television show fandom content', image: tvIconImg, hoverBg: adventureTimeImg, count: '620 Items' },
        { id: 5, name: 'K-Pop', description: 'Korean pop music fandom content', image: kpopCardImg, count: '1.5k Items' },
        { id: 6, name: 'Comics', description: 'Comic book fandom content', image: comicCardImg, hoverBg: comicHoverBg, count: '430 Items' },
        { id: 7, name: 'Manga', description: 'Manga fandom content', image: mangaCardImg, count: '1.1k Items' },
        { id: 8, name: 'Cosplay', description: 'Cosplay fandom content', icon: '🎭', count: '310 Items' }
    ];

    const merchItems = [
        { id: 1, name: 'Cyberpunk Katana Replica', tag: 'Limited Edition', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400' },
        { id: 2, name: 'K-Pop Special Tour Vinyl', tag: 'Pre-Order', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
        { id: 3, name: 'Mecha Collector Figurine', tag: 'Collectible', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400' }
    ];

    return (
        <div className="landing-container">
            {/* Extended Full-Width Hero Section */}
            <section 
                id="hero" 
                className="hero-banner text-center text-white"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10, 10, 12, 0.82) 0%, rgba(10, 10, 12, 0.98) 100%), url(${heroBg})`
                }}
            >
                <div className="container-fluid px-4 px-md-5 py-5 position-relative" style={{ zIndex: 1 }}>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <span className="badge bg-outline-light border border-secondary px-3 py-2 text-uppercase tracking-wide">
                            TECHWIZ 7 CHAMPIONSHIP ENTRY
                        </span>
                        <span className="badge bg-dark border border-primary px-3 py-2 text-uppercase tracking-wide text-primary">
                            ROLE: {userRole.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="display-2 fw-bold mb-3">
                        The Multi-Fandom <span className="highlight-text">Universe</span>
                    </h1>
                    <p className="lead mx-auto mb-4 text-light opacity-75" style={{ maxWidth: '900px' }}>
                        Your unified hub to explore, discover, and celebrate Anime, Gaming, Movies, K-Pop, Comics, Manga, and Cosplay.
                    </p>

                    <div className="search-bar-wrapper mx-auto mb-4">
                        <div className="input-group input-group-lg shadow-sm">
                            <input 
                                type="text" 
                                className="form-control tech-search-input px-4" 
                                placeholder="Search articles, characters, trailers, or merch..." 
                            />
                            <button className="btn btn-tech-solid fw-bold px-5" type="button">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                        <a href="#categories" className="btn btn-tech-solid px-5 py-3">Browse Fandoms</a>
                        <a href="#explorer" className="btn btn-tech-outline px-5 py-3">Latest Media</a>
                    </div>
                </div>

                <a href="#categories" className="scroll-indicator">
                    <span>EXPLORE DOMAINS</span>
                    <span className="scroll-arrow">↓</span>
                </a>
            </section>

            {/* Fandom Categories Grid */}
            <section id="categories" className="py-5 bg-black position-relative overflow-hidden">
                <div 
                    className={`domain-hover-bg ${hoveredImage ? 'active' : ''}`}
                    style={{ backgroundImage: hoveredImage ? `url(${hoveredImage})` : 'none' }}
                />

                <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
                    <div className="text-center mb-5">
                        <span className="badge bg-outline-light border border-secondary px-3 py-2 text-uppercase mb-2 tracking-wide">
                            SYS // CATEGORIES_TABLE
                        </span>
                        <h2 className="fw-bold text-uppercase display-5 text-white">Explore Fandom Domains</h2>
                        <p className="text-secondary">Explore all 8 mandatory fandom categories configured in MySQL</p>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 category-grid">
                        {/* 1. ANIME */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-1 text-center"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[0].image)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div>
                                    <small className="text-secondary text-uppercase tracking-wide d-block mb-1">CAT_ID // 01</small>
                                    <h3 className="manga-title text-white text-uppercase mb-1">{categoriesFromDb[0].name}</h3>
                                    <small className="text-secondary">{categoriesFromDb[0].description}</small>
                                </div>
                                <div className="my-auto py-2">
                                    <img 
                                        src={categoriesFromDb[0].image} 
                                        alt="Anime Domain Cover" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="border-top border-secondary pt-2">
                                    <span className="badge bg-white text-dark fw-bold">{categoriesFromDb[0].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. GAMING */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-2 text-center"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[1].image)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div>
                                    <small className="text-secondary text-uppercase tracking-wide d-block mb-1">CAT_ID // 02</small>
                                    <div className="manga-arch-container">
                                        <h3 className="manga-title text-white text-uppercase">{categoriesFromDb[1].name}</h3>
                                    </div>
                                    <small className="text-secondary d-block mt-1">{categoriesFromDb[1].description}</small>
                                </div>
                                <div className="my-auto py-2">
                                    <img 
                                        src={categoriesFromDb[1].image} 
                                        alt="Gaming ZeroBoy Pocket" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="text-end border-top border-secondary pt-2">
                                    <small className="text-secondary">{categoriesFromDb[1].count}</small>
                                </div>
                            </div>
                        </div>

                        {/* 3. MOVIES */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-3 text-start"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[2].image)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div className="mb-1">
                                    <small className="text-secondary d-block">{categoriesFromDb[2].description.toUpperCase()}</small>
                                    <div className="manga-title-diagonal text-uppercase">{categoriesFromDb[2].name}</div>
                                </div>
                                <div className="my-auto text-center py-2">
                                    <img 
                                        src={categoriesFromDb[2].image} 
                                        alt="Cosmic Princess Kaguya Movie Feature" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="border-top border-secondary pt-2 text-end">
                                    <span className="text-white fw-bold">{categoriesFromDb[2].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. TV SHOWS (Card: TV Icon [Image 2], Hover: Adventure Time [Image 1]) */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-4 text-start"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[3].hoverBg)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div>
                                    <div className="manga-highlight-block text-uppercase mb-1">{categoriesFromDb[3].name}</div>
                                    <small className="text-secondary d-block ps-1">{categoriesFromDb[3].description}</small>
                                </div>
                                <div className="my-auto text-center py-2">
                                    <img 
                                        src={categoriesFromDb[3].image} 
                                        alt="TV Show Icon" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="border-top border-secondary pt-2 d-flex justify-content-between align-items-center">
                                    <small className="text-secondary">CAT_ID // 04</small>
                                    <span className="badge bg-secondary text-white">{categoriesFromDb[3].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 5. K-POP */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-5 text-center"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[4].image)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div>
                                    <div className="manga-stagger-top text-uppercase">{categoriesFromDb[4].name}</div>
                                    <div className="manga-stagger-bottom text-uppercase">MUSIC</div>
                                </div>
                                <div className="my-auto py-2">
                                    <img 
                                        src={categoriesFromDb[4].image} 
                                        alt="K-Pop Band Artwork" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="border-top border-secondary pt-2">
                                    <span className="text-white fw-bold">{categoriesFromDb[4].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 6. COMICS */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-6 text-center"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[5].hoverBg)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div>
                                    <h3 className="fw-bold text-white text-uppercase mb-0 fs-4">{categoriesFromDb[5].name}!</h3>
                                    <small className="text-secondary">{categoriesFromDb[5].description}</small>
                                </div>
                                <div className="my-auto py-2">
                                    <img 
                                        src={categoriesFromDb[5].image} 
                                        alt="Comic Sketchbook Page" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="border-top border-secondary pt-2">
                                    <span className="badge bg-white text-dark fw-bold">{categoriesFromDb[5].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 7. MANGA */}
                        <div className="col">
                            <div 
                                className="manga-card manga-layout-7 text-start"
                                onMouseEnter={() => setHoveredImage(categoriesFromDb[6].image)}
                                onMouseLeave={() => setHoveredImage(null)}
                            >
                                <div className="manga-corner-box">
                                    <small className="text-secondary d-block">SERIALIZED</small>
                                    <h3 className="fw-bold text-white text-uppercase mb-0 fs-3">{categoriesFromDb[6].name}</h3>
                                    <small className="text-secondary">{categoriesFromDb[6].description}</small>
                                </div>
                                <div className="my-auto text-center py-2">
                                    <img 
                                        src={categoriesFromDb[6].image} 
                                        alt="Manga Domain Cover" 
                                        className="domain-card-img grayscale-monochrome"
                                    />
                                </div>
                                <div className="text-end border-top border-secondary pt-2">
                                    <span className="text-white fw-bold">{categoriesFromDb[6].count}</span>
                                </div>
                            </div>
                        </div>

                        {/* 8. COSPLAY */}
                        <div className="col">
                            <div className="manga-card manga-layout-8">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <small className="text-secondary d-block">{categoriesFromDb[7].description.toUpperCase()}</small>
                                        <span className="badge bg-white text-dark mt-2">{categoriesFromDb[7].count}</span>
                                    </div>
                                    <div className="manga-vertical-text text-white">
                                        {categoriesFromDb[7].name.toUpperCase()}
                                    </div>
                                </div>
                                <div className="text-start mt-auto fs-2">{categoriesFromDb[7].icon}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Content Explorer Section */}
            <section id="explorer" className="py-5 bg-body-tertiary">
                <ContentExplorer />
            </section>

            {/* Merchandise Showcase Teaser */}
            <section id="merchandise" className="py-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="fw-bold mb-0 text-uppercase tracking-wide">Merchandise Showcase</h2>
                            <p className="text-muted mb-0">Exclusive items & collectibles preview</p>
                        </div>
                        <button className="btn btn-tech-outline">View All Merch</button>
                    </div>

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {merchItems.map((item) => (
                            <div key={item.id} className="col">
                                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '220px', objectFit: 'cover' }} />
                                    <div className="card-body">
                                        <span className="badge bg-dark border mb-2">{item.tag}</span>
                                        <h5 className="card-title fw-bold">{item.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-5 bg-body-tertiary">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-uppercase tracking-wide">Upcoming Fan Conventions & Events</h2>
                        <p className="text-muted">Discover meetups and screenings near you</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card p-4 border-0 shadow-sm">
                                <span className="badge bg-dark w-25 mb-2">OCT 15 - 18</span>
                                <h4>Global Anime & Comic Expo 2026</h4>
                                <p className="text-muted mb-2">📍 Convention Center, Main Hall</p>
                                <p>Join thousands of fans for exclusive screenings, cosplay contests, and artist meetups.</p>
                                <button className="btn btn-tech-outline w-50">Get Ticket Info</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card p-4 border-0 shadow-sm">
                                <span className="badge bg-dark w-25 mb-2">NOV 02</span>
                                <h4>International Gaming Championship</h4>
                                <p className="text-muted mb-2">📍 Arena Center</p>
                                <p>Watch live eSports tournaments, play unreleased demos, and meet game creators.</p>
                                <button className="btn btn-tech-outline w-50">Get Ticket Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sitemap Section */}
            <section id="sitemap" className="py-5 bg-dark text-white border-top border-secondary">
                <div className="container py-3">
                    <div className="text-center mb-5">
                        <span className="badge bg-outline-light border border-secondary px-3 py-2 text-uppercase mb-2 tracking-wide">
                            APPLICATION & DB FLOW
                        </span>
                        <h2 className="fw-bold text-uppercase">Fan Hub Plus // Architecture</h2>
                        <p className="text-secondary small">Overview of system navigation, user access roles & MySQL relational structure</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-6 col-md-3">
                            <h5 className="fw-bold text-white border-bottom border-secondary pb-2 mb-3">01 // Main Hub</h5>
                            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                                <li><a href="#hero" className="text-reset text-decoration-none">Home Landing</a></li>
                                <li><a href="#categories" className="text-reset text-decoration-none">Fandom Domains</a></li>
                                <li><a href="#explorer" className="text-reset text-decoration-none">Content Explorer</a></li>
                                <li><a href="#merchandise" className="text-reset text-decoration-none">Merch Showcase</a></li>
                                <li><a href="#events" className="text-reset text-decoration-none">Events Calendar</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3">
                            <h5 className="fw-bold text-white border-bottom border-secondary pb-2 mb-3">02 // Categories Table</h5>
                            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                                <li><a href="#categories" className="text-reset text-decoration-none">1. Anime & Manga</a></li>
                                <li><a href="#categories" className="text-reset text-decoration-none">2. Gaming & Esports</a></li>
                                <li><a href="#categories" className="text-reset text-decoration-none">3. Movies & TV Shows</a></li>
                                <li><a href="#categories" className="text-reset text-decoration-none">4. K-Pop & Music</a></li>
                                <li><a href="#categories" className="text-reset text-decoration-none">5. Comics & Cosplay</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3">
                            <h5 className="fw-bold text-white border-bottom border-secondary pb-2 mb-3">03 // System Roles</h5>
                            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                                <li><span className="text-white fw-bold">Visitor:</span> Unauthenticated Access</li>
                                <li><span className="text-white fw-bold">Registered User:</span> Full Exploration</li>
                                <li><span className="text-white fw-bold">Administrator:</span> CMS & User Access</li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3">
                            <h5 className="fw-bold text-white border-bottom border-secondary pb-2 mb-3">04 // Project Stack</h5>
                            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                                <li><span>Techwiz 7 Championship</span></li>
                                <li><span>Frontend: ReactJS</span></li>
                                <li><span>Backend API: Spring Boot</span></li>
                                <li><span>Database: MySQL Engine</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Assistant Floating Button */}
            <div className="floating-chatbot-btn">
                <button className="btn btn-dark rounded-circle p-3 shadow-lg border border-secondary" title="Ask Fan Hub AI Assistant">
                    💬
                </button>
            </div>

            {/* Footer */}
            <footer className="footer-section py-4 bg-black text-light border-top border-secondary">
                <div className="container">
                    <p className="text-center text-secondary small mb-0">
                        &copy; 2026 Fan Hub Plus. Powered by ReactJS, Java Spring Boot & MySQL.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;