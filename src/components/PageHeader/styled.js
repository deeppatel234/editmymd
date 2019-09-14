import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(4, 4)};
  background: ${props => props.theme.palette.white};
  border-bottom: 1px solid ${props => props.theme.palette.grey.grey300};
`;
