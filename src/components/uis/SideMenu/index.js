import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SIDE_MENU_ITEMS } from '../../../services/routeService';

import useStyle from '../../../styles/useStyles';
import { LinearProgress, Tabs, Tab } from '@material-ui/core';

const SideMenu = props => {
  const { push, location } = useHistory();
  const classes = useStyle();

  let topMenuValue = 0;
  SIDE_MENU_ITEMS.forEach((menu, index) => {
    if (location.pathname.includes(menu.path)) {
      topMenuValue = index;
    }
  });
  const [value, setValue] = React.useState(topMenuValue);

  return (
    <div className={classes.topMenu}>
      <Tabs
        orientation='vertical'
        value={value}
        variant='scrollable'
        scrollButtons='off'
        onChange={(_event, newValue) => {
          const menuItem = SIDE_MENU_ITEMS[newValue];
          push(menuItem.path);
          setValue(newValue);
        }}
      >
        {SIDE_MENU_ITEMS.map(menuItem => (
          <Tab
            label={menuItem.title}
            icon={<menuItem.icon />}
            key={menuItem.key}
            disabled={menuItem.disabled || false}
          />
        ))}
      </Tabs>
      {props.isFetching && <LinearProgress color='secondary' />}
    </div>
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

export default connect(mapStateToProps)(SideMenu);
