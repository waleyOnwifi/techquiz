import React from 'react';

const ContentDetailModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1055 }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header border-0 pb-0">
                        <div>
                            <span className="badge bg-primary me-2">{item.type}</span>
                            <small className="text-muted">ID: #{item.contentId}</small>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-4">
                        <h3 className="modal-title fw-bold mb-3">{item.title}</h3>

                        {item.mediaUrl && (
                            <img 
                                src={item.mediaUrl} 
                                alt={item.title} 
                                className="img-fluid rounded mb-3 w-100" 
                                style={{ maxHeight: '380px', objectFit: 'cover' }} 
                            />
                        )}

                        <p className="lead fs-6 text-secondary">{item.description}</p>
                        
                        <hr className="my-4" />

                        {/* Interactive Actions */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-danger btn-sm">❤️ Like</button>
                                <button className="btn btn-outline-primary btn-sm">🔖 Bookmark</button>
                                <button className="btn btn-outline-secondary btn-sm">🔗 Share</button>
                            </div>
                            <span className="badge bg-light text-dark border">
                                👁️ {item.viewCount || 0} Views
                            </span>
                        </div>

                        {/* Interactive Comment Input Placeholder */}
                        <div className="card bg-body-tertiary border-0 p-3">
                            <h6 className="fw-bold mb-2">Community Discussion</h6>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Leave a comment for this fandom item..." 
                                />
                                <button className="btn btn-primary" type="button">Post</button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentDetailModal;