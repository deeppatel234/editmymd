import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BreadcrumbWrapper = styled.div`
  width: 100%;
  padding-bottom: ${props => props.theme.spacing(1)};
`;

export const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.palette.primary};
  text-decoration: underline;
`;

export const Separator = styled.span`
  &::after {
    margin: 0 8px;
    color: ${props => props.theme.palette.subText};
    content: '>';
  }
`;
