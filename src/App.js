import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { setPersistentData, logout } from './store/actions/authActions';
import Routes from './routes';
import { showSideMeuForRoute, PAGE_ROUTES } from './services/routeService';
import SideMenu from './components/uis/SideMenu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './styles/useStyles';
import ErrorDisplay from './components/uis/ErrorDisplay';
import { Button, LinearProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { logo } from './assets/images/';
import { ToastContainer } from 'react-toastify';
import { StylesProvider } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const classes = useStyles();

  const handleLogoutClick = () => {
    if (typeof props.onLogoutPress === 'function') {
      props.onLogoutPress();
    }
  };

  const handleLogoClick = () => {
    push(PAGE_ROUTES.items);
  };

  return (
    <StylesProvider injectFirst>
      <div className={classes.mainContianer}>
        <div className={classes.header}>
          <div className={classes.companyHeader}>
            <div class={classes.companyLogoContainer} onClick={handleLogoClick}>
              <Avatar
                alt="GAC Technology"
                src={logo}
                className={classes.companyAvatar}
              />
              <span className={classes.companyName}>GAC Technology</span>
            </div>
          </div>
          <Button
            label=""
            className={classes.logoutButton}
            onClick={handleLogoutClick}
            endIcon={<ExitToAppIcon />}
          />
        </div>
        {showSideMeuForRoute(pathname) && (
          <SideMenu
            selectedKey={pathname}
            onLogoutPress={props.onLogoutPress}
          />
        )}

        <div className={classes.mainPageView}>
          {props.isFetching && (
            <div className={classes.progressIndicator}>
              <LinearProgress color="secondary" />
            </div>
          )}
          <Routes {...props} />
        </div>
        <ToastContainer />
        <ErrorDisplay info={props.messageInfo} />
      </div>
    </StylesProvider>
  );
}

const mapStateToProps = ({ global }) => ({
  ...global,
});

const mapDispatchToProps = {
  loadAuthData: setPersistentData,
  onLogoutPress: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
