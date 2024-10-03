import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your firebase auth
import { signOut, onAuthStateChanged } from 'firebase/auth';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Set the user to null after sign out
        navigate('/login'); // Redirect to login after signing out
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <div className="navbar">
      <div className="logo">DEV@Deakin</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
      {user && (
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Navbar;
