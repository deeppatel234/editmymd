import styled from 'styled-components';

export const CreateModalWrapper = styled.div`
  .filename {
    padding: ${props => props.theme.spacing(1, 1, 0, 1)};
    text-align: end;
  }
`;

export const FileNameInputWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: ${props => props.theme.spacing(0, 1)};
    white-space: nowrap;
  }
`;
