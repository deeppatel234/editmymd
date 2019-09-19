import React from 'react';

import ContentLoader from 'Components/ContentLoader';
import {
  RepositoryIcon,
  LockIcon,
  ForkIcon,
  StarIcon,
  Typography,
} from 'Components/UI';

import { RepoCard, RepoLoadingCard, CardCounts, CardTitle } from './styled';

const RepositoryCard = ({
  isPrivate,
  name,
  forkCount,
  starCount,
  defaultBranch,
}) => {
  return (
    <RepoCard
      to={{
        pathname: `repo/${name}`,
        state: { defaultBranch },
      }}
    >
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

RepositoryCard.Loader = () => (
  <RepoLoadingCard>
    <ContentLoader height={65}>
      <rect x="0" y="0" rx="4" ry="4" width="400" height="65" />
    </ContentLoader>
  </RepoLoadingCard>
);

export default RepositoryCard;
