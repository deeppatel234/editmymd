import styled from 'styled-components';

export const RepoDetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  padding: ${props => props.theme.spacing(2)};
`;

export const PathList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
`;

export const PathListChild = styled.li`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(2)};
  background: ${props => props.theme.palette.white};
  border: 1px solid ${props => props.theme.palette.grey.grey300};

  &:not(:last-child) {
    border-bottom: 0;
  }

  p {
    display: flex;
    align-items: center;
    word-break: break-all;

    svg {
      margin-right: ${props => props.theme.spacing(1)};
    }
  }
`;
