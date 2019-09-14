import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const RepoCard = styled(Link)`
  width: 30%;
  margin: ${props => props.theme.spacing(1)};
  padding: ${props => props.theme.spacing(2)};
  color: inherit;
  background: ${props => props.theme.palette.white};
  border: 1px solid ${props => props.theme.palette.grey.grey300};
  border-radius: 4px;
  cursor: pointer;
  ${props =>
    props.theme.breakpoints.lessThan(props.theme.breakpoints.sm)(css`
      width: 100%;
    `)}
  ${props =>
    props.theme.breakpoints.between(
      props.theme.breakpoints.sm,
      props.theme.breakpoints.md,
    )(css`
      width: 40%;
    `)}
  :hover {
    border: 1px solid ${props => props.theme.palette.primary};
  }
`;

export const CardTitle = styled.div`
  display: flex;

  svg {
    margin-right: ${props => props.theme.spacing(1)};
  }
`;

export const CardCounts = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: ${props => props.theme.spacing(1)};

  p {
    display: flex;
    align-items: center;
    margin-left: ${props => props.theme.spacing(1)};

    svg {
      margin-right: ${props => props.theme.spacing(0.5)};
    }
  }
`;
