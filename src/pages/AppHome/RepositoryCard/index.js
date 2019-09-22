import React from 'react';
import _range from 'lodash/range';

import { CardLoader } from 'Components/ContentLoader';
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
  id,
}) => {
  return (
    <RepoCard
      to={{
        pathname: `repo/${name}`,
        state: { defaultBranch, id },
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

RepositoryCard.Loader = () =>
  _range(6).map(id => (
    <RepoLoadingCard key={id}>
      <CardLoader />
    </RepoLoadingCard>
  ));

export default RepositoryCard;
