import React from 'react';
import { Link } from 'react-router-dom';

const ServerDown = () => {
  return (
    <div>
      Server is Down
      <p>
        <Link to={'/home'}> Try Again </Link>
      </p>
    </div>
  );
};

export default ServerDown;
