import styled from 'styled-components';

export const AddRepositoryWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: ${props => props.theme.spacing(2)};
`;

export const InputWrapper = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing(2)};
  text-align: center;

  .search-input {
    max-width: 600px;
  }
`;

export const RepositoryCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${props => props.theme.spacing(2)};
  overflow: auto;
`;
