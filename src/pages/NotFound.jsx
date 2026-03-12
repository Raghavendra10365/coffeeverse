import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-cup">☕</div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-message">
          Looks like this page got lost somewhere between the grind and the brew.
        </p>
        <Link to="/" className="notfound-btn">Back to Home</Link>
      </div>
    </div>
  );
}