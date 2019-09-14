import styled from 'styled-components';

export const EmptyElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const IconWrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing(1)};
`;
