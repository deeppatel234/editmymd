import styled from 'styled-components';

export const PathListWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  padding: ${props => props.theme.spacing(2)};
`;
