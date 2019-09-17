import styled from 'styled-components';

export const CommitTable = styled.table`
  width: 100%;

  td {
    padding: ${props => props.theme.spacing(1, 0)};
  }
`;

export const CommitMessageWrapper = styled.div`
  padding-top: ${props => props.theme.spacing(1)};

  p {
    padding-bottom: ${props => props.theme.spacing(1)};
  }
`;

export const CommitMessage = styled.div`
  display: flex;

  textarea {
    margin: ${props => props.theme.spacing(0, 1)};
  }
`;
