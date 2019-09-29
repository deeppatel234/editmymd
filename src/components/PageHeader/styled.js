import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(2, 4)};
  background: ${props => props.theme.palette.white};
  border-bottom: 1px solid ${props => props.theme.palette.grey.grey300};
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: ${props => props.theme.spacing(2)};
  }
`;

export const PageTitle = styled.div`
  svg {
    margin-right: ${props => props.theme.spacing(1)};
  }
`;
