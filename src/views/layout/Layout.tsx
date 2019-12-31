import React from 'react';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';
import { CommandBar, ICommandBarStyles, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonStyles, IconButton } from 'office-ui-fabric-react/lib/Button';
import { withTranslation, WithTranslation } from 'react-i18next';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { AppState } from 'store';
import { logout } from 'store/app/actions';
import * as userPanelsActions from 'store/userPanel/actions';

import { Paths } from 'constant/Paths';

import { SalesmanList } from 'views/owner/salesmanModule/SalesmanList';

import { AppNav } from './AppNav';
import { UserPanels } from '../userPanels/UserPanels';

interface StateProps {
  authenticate?: boolean;
  username?: string;
  role?: string;
}

interface DispatchProps {
  logOut: () => void;
  showProfile: () => void;
  showPassword: () => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps & WithTranslation;

const containerStackStyles: IStackStyles = {
  root: {
    minHeight: '800px'
  }
};

const contentStackStyles: IStackStyles = {
  root: {
    minHeight: '400px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '5px',
    boxSizing: 'border-box'
  }
};

const loggedInStackStyle: IStackStyles = {
  root: {
    marginRight: '10px',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const outerCommandBarStyles: ICommandBarStyles = {
  root: {
    backgroundColor: '#eee',
    height: 50,
    padding: 0,
    boxShadow: '0 4px 6px -6px #222'
  }
};

const commandBarWaffleButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: '#0078d7',
    width: 50
  },
  rootHovered: {
    backgroundColor: '#104a7d'
  },
  rootPressed: {
    backgroundColor: '#104a7d'
  }
};

interface State {
  outerCommandBarItems: ICommandBarItemProps[];
  farCommandBarItems: ICommandBarItemProps[];
  navVisible: boolean;
}

class LayoutPure extends React.Component<Props, State> {
  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({ app }) => {
    return {
      authenticate: app.token != null && app.token.length > 0,
      username: app.username,
      role: app.role
    };
  };

  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    logOut: () => dispatch(logout()),
    showPassword: () => dispatch(userPanelsActions.setPasswordPanelVisible(true)),
    showProfile: () => dispatch(userPanelsActions.setProfilePanelVisible(true))
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      outerCommandBarItems: this.outerCommandBarItems,
      farCommandBarItems: this.farCommandBarItems(),
      navVisible: true
    };
  }

  onSignOut = () => {
    this.props.logOut();
    this.props.history.push(Paths.Login);
  };

  farCommandBarItems = (): ICommandBarItemProps[] => {
    const { username, role } = this.props;

    const items: IContextualMenuItem[] = [
      {
        key: 'myProfile',
        text: 'My profile',
        iconProps: {
          iconName: 'ProfileSearch',
          style: {
            color: '#258DE'
          }
        },
        onClick: () => {
          this.props.showProfile();
        } /// TODO: final should be with thunk action load profile then show profile
      },

      {
        key: 'changePassword',
        text: 'Change password',
        iconProps: {
          iconName: 'PasswordField',
          style: {
            color: '#258DE'
          }
        },
        onClick: () => {
          this.props.showPassword();
        } /// TODO: final should be with thunk action load profile then show profile
      },

      {
        key: 'logOut',
        text: 'Sign out',
        iconProps: {
          iconName: 'SignOut',
          style: {
            color: '#258DE'
          }
        },
        onClick: () => this.onSignOut()
      }
    ];

    return [
      {
        key: 'loggedIn',
        name: 'loggedIn',
        onRender: () => {
          return (
            <Stack horizontal styles={loggedInStackStyle}>
              <p>{`Welcome, ${username} [${role}]`}</p>
              <IconButton
                menuIconProps={{
                  iconName: 'CollapseMenu'
                }}
                menuProps={{ items }}
              />
            </Stack>
          );
        }
      }
    ];
  };

  outerCommandBarItems: ICommandBarItemProps[] = [
    {
      key: 'WaffleButton',
      iconOnly: true,
      iconProps: {
        iconName: 'Waffle',
        styles: {
          root: {
            color: 'white',
            fontSize: 20,
            fontWeight: 600
          }
        }
      },
      buttonStyles: commandBarWaffleButtonStyles,
      onClick: () => {
        this.setState({ navVisible: !this.state.navVisible });
      }
    },
    {
      key: 'appName',
      name: this.props.i18n.t('app.name'),
      buttonStyles: {
        root: {
          backgroundColor: '#eee',
          fontSize: 22,
          marginLeft: 20,
          paddingTop: '5px',
          padding: 0
        },
        rootHovered: {
          backgroundColor: '#eee'
        },
        rootPressed: {
          backgroundColor: '#eee'
        },
        label: {
          color: 'blue',
          margin: 0
        }
      }
    }
  ];

  render() {
    if (this.props.authenticate === false) {
      this.props.history.push(Paths.Login);
    }

    const { role } = this.props;

    const { outerCommandBarItems, farCommandBarItems, navVisible } = this.state;

    return (
      <>
        <Stack verticalFill styles={containerStackStyles}>
          <CommandBar items={outerCommandBarItems} farItems={farCommandBarItems} styles={outerCommandBarStyles} />

          <Stack horizontal verticalFill>
            {navVisible && <AppNav role={role as string} />}
            <Stack grow verticalFill styles={contentStackStyles}>
              <Switch>
                <Route path={Paths.SalesmanList} component={SalesmanList} />
              </Switch>
            </Stack>
          </Stack>
        </Stack>

        <UserPanels />
      </>
    );
  }
}

export const Layout = withRouter(
  withTranslation()(
    connect<StateProps, DispatchProps, {}, AppState>(
      LayoutPure.mapStateToProps,
      LayoutPure.mapDispatchToProps
    )(LayoutPure)
  )
);
