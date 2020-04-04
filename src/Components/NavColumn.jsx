import React, { useState } from 'react';
import {
  Menu,
  Icon,
  Sidebar,
} from 'semantic-ui-react'

export const NavColumn = props => {
  const { onMenuSelect } = props;
  const [isDisplayNav, setDisplayNav] = useState(false);

  function handleMouseMove(ev) {
    if (ev.pageX < 100 && !isDisplayNav) {
      setDisplayNav(true);
    } else if (ev.pageX > 200) {
      setDisplayNav(false);
    }
  }

  window.onmousemove = handleMouseMove;

  return (
    <Sidebar
    as={Menu}
      animation='overlay'
      visible={isDisplayNav}
      icon='labeled'
      inverted
      vertical
      width='thin'
    >
      <Menu.Item as='a' onClick={() => onMenuSelect(false, 'favorite')}>
          <Icon name='glass martini' />
          All Movies
        </Menu.Item>
      <Menu.Item as='a' onClick={() => onMenuSelect(true, 'favorite')}>
        <Icon name='heart' />
        Favorites
      </Menu.Item>
    </Sidebar>
  )
}