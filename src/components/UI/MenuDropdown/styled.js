import styled from 'styled-components';

export const DropDownWrapper = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing(1, 0)};
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing(1, 2)};
  white-space: nowrap;
  cursor: pointer;

  svg {
    padding-right: ${props => props.theme.spacing(1)};
  }

  :hover {
    background: ${props => props.theme.palette.grey.grey100};
  }
`;
