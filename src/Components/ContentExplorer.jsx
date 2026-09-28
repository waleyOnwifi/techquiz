import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContentDetailModal from './ContentDetailModal';
import './ContentExplorer.css';

// Fallback Mock Data
const MOCK_CATEGORIES = [
    { categoryId: 1, name: 'Anime' },
    { categoryId: 2, name: 'Gaming' },
    { categoryId: 3, name: 'Movies' },
    { categoryId: 4, name: 'TV Shows' },
    { categoryId: 5, name: 'K-Pop' },
    { categoryId: 6, name: 'Comics' },
    { categoryId: 7, name: 'Manga' },
    { categoryId: 8, name: 'Cosplay' }
];

const MOCK_CONTENTS = [
    {
        contentId: 101,
        title: 'Top 10 Upcoming Anime Releases in 2026',
        description: 'A comprehensive guide to the most anticipated series and movie adaptations hitting screens soon.',
        type: 'ARTICLE',
        mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
        viewCount: 1420
    },
    {
        contentId: 102,
        title: 'Cyberpunk RPG Gameplay Breakdown & Secrets',
        description: 'In-depth analysis of combat mechanics, lore references, and easter eggs hidden across the map.',
        type: 'IMAGE',
        mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500',
        viewCount: 980
    },
    {
        contentId: 103,
        title: 'World Tour Highlights & Backstage Pass',
        description: 'Exclusive footage, fan interactions, and live performance recordings from the international arena tour.',
        type: 'VIDEO',
        mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500',
        viewCount: 2300
    }
];

const ContentExplorer = () => {
    const [contents, setContents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('popularityScore');
    const [loading, setLoading] = useState(false);
    
    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data && response.data.length > 0 ? response.data : MOCK_CATEGORIES);
            })
            .catch(() => setCategories(MOCK_CATEGORIES));
    }, []);

    useEffect(() => {
        fetchFilteredContent();
    }, [selectedCategory, selectedType, sortBy]);

    const fetchFilteredContent = () => {
        setLoading(true);
        axios.get('http://localhost:8080/api/content/explore', {
            params: {
                categoryId: selectedCategory || null,
                type: selectedType || null,
                search: searchKeyword || null,
                sortBy: sortBy,
                direction: 'DESC'
            }
        })
        .then(response => {
            const data = response.data.content || response.data;
            setContents(data && data.length > 0 ? data : MOCK_CONTENTS);
            setLoading(false);
        })
        .catch(() => {
            let filtered = [...MOCK_CONTENTS];
            if (selectedType) filtered = filtered.filter(item => item.type === selectedType);
            if (searchKeyword) {
                filtered = filtered.filter(item => 
                    item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchKeyword.toLowerCase())
                );
            }
            setContents(filtered);
            setLoading(false);
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchFilteredContent();
    };

    return (
        <div className="container my-4">
            {/* Direct Back to Home Navigation Button */}
            <div className="mb-3">
                <Link to="/" className="btn btn-outline-primary fw-semibold px-3 py-1">
                    ← Back to Home
                </Link>
            </div>

            <h2 className="mb-4 fw-bold">Fandom Content Explorer</h2>

            {/* Controls */}
            <form onSubmit={handleSearchSubmit} className="row g-3 mb-4">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search fandoms..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select 
                        className="form-select" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <select 
                        className="form-select" 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All Media Types</option>
                        <option value="ARTICLE">Articles</option>
                        <option value="VIDEO">Videos</option>
                        <option value="AUDIO">Audio</option>
                        <option value="IMAGE">Images</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <select 
                        className="form-select" 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popularityScore">Most Popular</option>
                        <option value="createdAt">Latest</option>
                        <option value="title">Alphabetical</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Filter</button>
                </div>
            </form>

            {/* Results Grid */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {contents.length > 0 ? (
                        contents.map(item => (
                            <div key={item.contentId} className="col">
                                <div 
                                    className="card h-100 shadow-sm border-0 cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                >
                                    {item.mediaUrl && (
                                        <img 
                                            src={item.mediaUrl} 
                                            className="card-img-top" 
                                            alt={item.title} 
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <span className="badge bg-secondary mb-2">{item.type}</span>
                                        <h5 className="card-title fw-bold">{item.title}</h5>
                                        <p className="card-text text-muted text-truncate">{item.description}</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center pb-3">
                                        <small className="text-muted">Views: {item.viewCount || 0}</small>
                                        <button 
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedItem(item);
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center text-muted my-4">
                            No content found matching your filters.
                        </div>
                    )}
                </div>
            )}

            {/* Render Modal */}
            <ContentDetailModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
        </div>
    );
};

export default ContentExplorer;