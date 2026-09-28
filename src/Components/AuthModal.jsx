import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!formData.username || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Please enter your email and password.');
        return;
      }
    }

    // Mock User Object
    const user = {
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      role: 'User'
    };

    // Save to LocalStorage & Notify App State
    localStorage.setItem('user', JSON.stringify(user));
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              {isSignUp ? 'Create FanHub Account' : 'Welcome Back'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body p-4">
            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="e.g. OtakuKing99"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2">
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <div className="text-center mt-3 small">
              {isSignUp ? (
                <p className="mb-0">
                  Already have an account?{' '}
                  <button className="btn btn-link p-0 fw-semibold" onClick={() => setIsSignUp(false)}>
                    Log In
                  </button>
                </p>
              ) : (
                <p className="mb-0">
                  Don't have an account?{' '}
                  <button className="btn btn-link p-0 fw-semibold" onClick={() => setIsSignUp(true)}>
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;