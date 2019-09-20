import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`

  0% {
    height: 0;
  }

  100% {
    height: 50px;
  }
`;

export const PWAPromptWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: ${props => props.theme.palette.white};
  border-top: 3px solid ${props => props.theme.palette.primary};
  cursor: pointer;
  animation: ${slideIn} 0.5s ease;

  p {
    padding: ${props => props.theme.spacing(2)};
  }

  span {
    display: flex;
    padding: ${props => props.theme.spacing(2)};
  }
`;
