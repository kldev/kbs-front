import React from 'react';
/// more optimal imports
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Paths } from 'constant/Paths';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LoginStates } from 'store/app/types';
import './Login.scss';
import { appTitle } from 'views/style/common';
import { WithTranslation, withTranslation } from 'react-i18next';
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import { AppState } from 'store';
import { AuthRequest } from 'api/types';
import { thunkLogin } from 'store/app/thunk';

interface StateProps {
  loginState: LoginStates;
}

interface DispatchProps {
  thunkLogin: (auth: AuthRequest) => void;
}

interface State {
  username: string;
  password: string;
}

type Props = StateProps & DispatchProps & RouteComponentProps & WithTranslation;
const loginStackStyles: IStackStyles = {
  root: {
    padding: '40px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    minWidth: '400px',
    marginTop: '200px'
  }
};

class LoginPure extends React.Component<Props, State> {
  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => {
    return {
      loginState: state.app.loginState
    };
  };

  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
    thunkLogin
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      username: `${process.env.REACT_APP_USERNAME}`,
      password: `${process.env.REACT_APP_PASSWORD}`
    };
  }

  onLogin = () => {
    const auth: AuthRequest = { username: this.state.username, password: this.state.password };
    this.props.thunkLogin(auth);
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.loginState === LoginStates.success && this.props.loginState !== prevProps.loginState) {
      this.props.history.push(Paths.Dashboard);
    }
  }

  render() {
    const { i18n, loginState } = this.props;

    return (
      <Stack verticalFill verticalAlign="start" horizontalAlign="center">
        <Stack styles={loginStackStyles}>
          <p style={appTitle}>{i18n.t('app.name')}</p>
          <TextField
            label={i18n.t('login.page.username')}
            placeholder="Enter your login"
            value={this.state.username}
            onChange={(e, newValue) => this.setState({ username: newValue as string })}
          />
          <TextField
            label={i18n.t('login.page.password')}
            placeholder="Enter your password"
            type="password"
            value={this.state.password}
            onChange={(e, newValue) => this.setState({ password: newValue as string })}
          />

          <Stack tokens={{ padding: 20 }}>
            {loginState !== LoginStates.inProgress && (
              <PrimaryButton
                data-automation-id="test"
                text={i18n.t('login.page.log.in')}
                allowDisabledFocus={true}
                onClick={this.onLogin}
              />
            )}

            {loginState === LoginStates.inProgress && <Spinner size={SpinnerSize.large} />}
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

export const Login = withRouter(
  withTranslation()(
    connect<StateProps, DispatchProps, {}, AppState>(
      LoginPure.mapStateToProps,
      LoginPure.mapDispatchToProps
    )(LoginPure)
  )
);
