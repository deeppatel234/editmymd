import React from 'react';

import {
  RepositoryIcon,
  LockIcon,
  ForkIcon,
  StarIcon,
  Typography,
} from 'Components/UI';

import { RepoCard, CardCounts, CardTitle } from './styled';

const RepositoryCard = ({ isPrivate, name, forkCount, starCount }) => {
  return (
    <RepoCard to={`repo/${name}`}>
      <CardTitle>
        {isPrivate ? (
          <LockIcon width="1.5em" height="1.5em" />
        ) : (
          <RepositoryIcon width="1.5em" height="1.5em" />
        )}
        <Typography truncate>{name}</Typography>
      </CardTitle>
      <CardCounts>
        <Typography variant="subBody" color="subText">
          <ForkIcon width="1.3em" height="1.3em" />
          {forkCount}
        </Typography>
        <Typography variant="subBody" color="subText">
          <StarIcon width="1.3em" height="1.3em" />
          {starCount}
        </Typography>
      </CardCounts>
    </RepoCard>
  );
};

export default RepositoryCard;
