import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContentDetailModal from '../Components/ContentDetailModal';

// Mock Bookmarked Content
const MOCK_BOOKMARKS = [
    {
        contentId: 101,
        title: 'Top 10 Upcoming Anime Releases in 2026',
        description: 'A comprehensive guide to the most anticipated series and movie adaptations hitting screens soon.',
        type: 'ARTICLE',
        mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
        viewCount: 1420
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

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookmarks, setBookmarks] = useState(MOCK_BOOKMARKS);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeTab, setActiveTab] = useState('bookmarks');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            // Redirect home if guest tries to access profile directly
            navigate('/');
        }
    }, [navigate]);

    const handleRemoveBookmark = (e, contentId) => {
        e.stopPropagation();
        setBookmarks(bookmarks.filter(item => item.contentId !== contentId));
    };

    if (!user) return null;

    return (
        <div className="container my-5">
            {/* Header Profile Card */}
            <div className="card border-0 shadow-sm p-4 mb-4 bg-body-tertiary">
                <div className="d-flex align-items-center gap-4">
                    <div 
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-2" 
                        style={{ width: '80px', height: '80px' }}
                    >
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="fw-bold mb-1">{user.username}</h3>
                        <p className="text-muted mb-0">FanHub+ Creator & Collector</p>
                        <small className="badge bg-success mt-2">Active Member</small>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link fw-semibold ${activeTab === 'bookmarks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookmarks')}
                    >
                        🔖 Saved Bookmarks ({bookmarks.length})
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link fw-semibold ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        📝 My Submissions (0)
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            {activeTab === 'bookmarks' ? (
                <div>
                    {bookmarks.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {bookmarks.map(item => (
                                <div key={item.contentId} className="col">
                                    <div 
                                        className="card h-100 shadow-sm border-0 position-relative"
                                        onClick={() => setSelectedItem(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <button 
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 z-1"
                                            title="Remove Bookmark"
                                            onClick={(e) => handleRemoveBookmark(e, item.contentId)}
                                        >
                                            ✕
                                        </button>
                                        {item.mediaUrl && (
                                            <img 
                                                src={item.mediaUrl} 
                                                className="card-img-top" 
                                                alt={item.title} 
                                                style={{ height: '180px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div className="card-body">
                                            <span className="badge bg-secondary mb-2">{item.type}</span>
                                            <h5 className="card-title fw-bold text-truncate">{item.title}</h5>
                                            <p className="card-text text-muted text-truncate">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted fs-5">No saved bookmarks yet.</p>
                            <Link to="/explorer" className="btn btn-primary">
                                Explore Fandom Content
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-5 text-muted">
                    <h5>You haven't posted any content yet.</h5>
                </div>
            )}

            {/* Modal preview */}
            <ContentDetailModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
        </div>
    );
};

export default Profile;