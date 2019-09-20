import React from 'react';

import { Button, BarIcon, BaseDropDown } from 'Components/UI';

import { DropDownWrapper, MenuItem } from './styled';

const DropDown = ({ items }) => (
  <DropDownWrapper>
    {items.map(({ label, icon, props }) => (
      <MenuItem key={label} {...props}>
        {icon}
        {label}
      </MenuItem>
    ))}
  </DropDownWrapper>
);

const MenuDropDown = ({ menuItems }) => (
  <BaseDropDown
    position="left"
    dropDownComponent={<DropDown items={menuItems} />}
  >
    {props => (
      <Button icon={<BarIcon width="1.5em" height="1.5em" />} {...props} />
    )}
  </BaseDropDown>
);

export default MenuDropDown;
