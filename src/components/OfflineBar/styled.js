import styled from 'styled-components';

export const OfflineBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing(1.5, 4)};
  color: ${props => props.theme.palette.white};
  font-size: 1rem;
  background: ${props => props.theme.palette.error};

  svg {
    margin-right: ${props => props.theme.spacing(2)};
  }
`;
