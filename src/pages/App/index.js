import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from 'Components/Auth';
import service from 'Services';

const App = () => {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    service
      .apiGet({
        url: '/repo',
      })
      .then(repo => setRepo(repo));
  }, []);

  return (
    <div>
      {repo.map(r => (
        <div>
          <Link to={`readmd/${r.name}`}>{r.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default () => (
  <Auth>
    <App />
  </Auth>
);
