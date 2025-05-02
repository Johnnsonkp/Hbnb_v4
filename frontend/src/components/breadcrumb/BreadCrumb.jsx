import './breadcrumb.css'

import { Link, useLocation } from 'react-router';

function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  let currentPath = '';

  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ol className="breadcrumb-list">
        <li key="home" className="breadcrumb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="breadcrumb-icon">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <Link to="/"></Link>
        </li>
        {pathSegments.map((segment, index) => {
          currentPath += `/${segment}`;
          return (
            <li className="breadcrumb-item" key={index}>
              <Link to={currentPath}>/ {segment}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs