import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// Audio Context instance for instant sound feedback
let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playCyberSound = (type = 'hover') => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.02);
      
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.start(now);
      osc.stop(now + 0.02);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    // Audio unlock fallback
  }
};

const Navbar = ({ user, onOpenAuth, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unlockAudio = () => {
      getAudioContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleHover = () => playCyberSound('hover');
  const handleClick = () => playCyberSound('click');

  // Smooth scroll to top function triggered on Home / Logo click
  const handleHomeClick = () => {
    handleClick();
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg tech-navbar sticky-top py-3">
        <div className="container">
          {/* Logo - Scrolls to Top */}
          <Link 
            className="tech-brand" 
            to="/" 
            onMouseEnter={handleHover} 
            onClick={handleHomeClick}
          >
            FANHUB+<span className="tech-brand-tag">SYS // 07</span>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler border-0 text-white" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#techNavbar"
            aria-controls="techNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onMouseEnter={handleHover}
            onClick={handleClick}
          >
            <span className="fs-3">☰</span>
          </button>

          <div className="collapse navbar-collapse" id="techNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-2">
              {/* Home - Scrolls to Top */}
              <li className="nav-item">
                <Link 
                  className={`tech-nav-link ${isActive('/') ? 'active' : ''}`} 
                  to="/"
                  onMouseEnter={handleHover}
                  onClick={handleHomeClick}
                >
                  [01] Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`tech-nav-link ${isActive('/explorer') ? 'active' : ''}`} 
                  to="/explorer"
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                >
                  [02] Explorer
                </Link>
              </li>
              <li className="nav-item">
                <a 
                  className="tech-nav-link" 
                  href="#categories"
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                >
                  [03] Fandoms
                </a>
              </li>
            </ul>

            {/* Search Input */}
            <div className="d-flex align-items-center me-lg-3 my-2 my-lg-0">
              <input 
                type="text" 
                className="form-control tech-search-input" 
                placeholder="SEARCH_DATA..." 
                onFocus={handleHover}
              />
            </div>

            {/* Profile / Auth Controls */}
            <div className="d-flex align-items-center gap-2">
              {user ? (
                <div className="position-relative">
                  <button
                    className="btn btn-tech-outline d-flex align-items-center gap-2"
                    type="button"
                    onMouseEnter={handleHover}
                    onClick={() => {
                      handleClick();
                      setShowDropdown(!showDropdown);
                    }}
                  >
                    <span>ID // {user.username.toUpperCase()}</span>
                  </button>

                  {showDropdown && (
                    <div className="tech-dropdown-menu position-absolute end-0 mt-2 show">
                      <Link 
                        to="/profile" 
                        className="dropdown-item tech-dropdown-item"
                        onMouseEnter={handleHover}
                        onClick={() => {
                          handleClick();
                          setShowDropdown(false);
                        }}
                      >
                        USER_PROFILE
                      </Link>
                      <div className="dropdown-divider border-secondary my-1"></div>
                      <button 
                        className="dropdown-item tech-dropdown-item text-danger"
                        onMouseEnter={handleHover}
                        onClick={() => {
                          handleClick();
                          setShowDropdown(false);
                          onLogout();
                        }}
                      >
                        TERMINATE_SESSION
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="btn btn-tech-solid" 
                  onMouseEnter={handleHover}
                  onClick={() => {
                    handleClick();
                    onOpenAuth();
                  }}
                >
                  LOGIN // SIGNUP
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="tech-accent-line"></div>
    </>
  );
};

export default Navbar;