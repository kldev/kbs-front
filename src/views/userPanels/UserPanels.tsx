import React from 'react';

import { WithTranslation, withTranslation } from 'react-i18next';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import * as panelActions from 'store/userPanel/actions';
import { AppState } from 'store';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

interface StateProps {
  showPassword: boolean;
  showProfile: boolean;
}
interface DispatchProps {
  setProfilePanelVisible: (value: boolean) => void;
  setPasswordPanelVisible: (value: boolean) => void;
}
type Props = StateProps & DispatchProps & WithTranslation;

interface State {
  passwordHidden: boolean;
}

class UserPanelsPure extends React.Component<Props, State> {
  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({ userPanel }) => ({
    showPassword: userPanel.showPassword,
    showProfile: userPanel.showProfile
  });

  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    setProfilePanelVisible: value => {
      dispatch(panelActions.setProfilePanelVisible(value));
    },
    setPasswordPanelVisible: value => {
      dispatch(panelActions.setPasswordPanelVisible(value));
    }
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      passwordHidden: true
    };
  }

  onSaveProfile = () => {
    this.props.setProfilePanelVisible(false);
  };

  onSavePassword = () => {
    this.props.setPasswordPanelVisible(false);
  };

  onDismissSaveProfile = () => {
    this.props.setProfilePanelVisible(false);
  };

  onDismissSavePassword = () => {
    this.props.setPasswordPanelVisible(false);
  };

  _renderProfilePanel(): JSX.Element {
    const { showProfile, i18n } = this.props;

    if (!showProfile) return <></>;

    return (
      <Panel
        isOpen={showProfile}
        type={PanelType.smallFixedFar}
        headerText={i18n.t('user.panel.edit.profile')}
        onDismiss={() => {
          this.onDismissSaveProfile();
        }}
        onRenderFooter={() => {
          return (
            <Stack horizontal={true} horizontalAlign="space-around">
              <PrimaryButton
                text={i18n.t('action.save')}
                onClick={() => {
                  this.onSaveProfile();
                }}
              />

              <DefaultButton
                text={i18n.t('action.cancel')}
                onClick={() => {
                  this.onDismissSaveProfile();
                }}
              />
            </Stack>
          );
        }}
      >
        <Stack verticalFill={true}>
          <TextField label={i18n.t('user.email')} autoComplete="off" />
          <TextField label={i18n.t('user.phone')} autoComplete="off" />
          <TextField label={i18n.t('user.address')} autoComplete="off" />
        </Stack>
      </Panel>
    );
  }

  _renderPasswordPanel(): JSX.Element {
    const { showPassword, i18n } = this.props;
    const { passwordHidden } = this.state;

    if (!showPassword) return <></>;
    return (
      <Panel
        isOpen={showPassword}
        type={PanelType.smallFixedFar}
        headerText={i18n.t('user.panel.edit.password')}
        onDismiss={() => {
          this.onDismissSavePassword();
        }}
        onRenderFooter={() => {
          return (
            <Stack horizontal={true} horizontalAlign="space-around">
              <PrimaryButton
                text={i18n.t('action.save')}
                onClick={() => {
                  this.onSavePassword();
                }}
              />

              <DefaultButton
                text={i18n.t('action.cancel')}
                onClick={() => {
                  this.onDismissSavePassword();
                }}
              />
            </Stack>
          );
        }}
      >
        <Stack verticalFill={true}>
          <TextField label={i18n.t('user.password')} autoComplete="off" type={passwordHidden ? 'password' : 'text'} />
          <Toggle
            defaultChecked={true}
            label=" "
            onText="Password hidden"
            offText="Password visible"
            onChange={(ev, checked) => {
              this.setState({ passwordHidden: checked as boolean });
            }}
          />
        </Stack>
      </Panel>
    );
  }

  render() {
    return (
      <>
        {this._renderProfilePanel()}
        {this._renderPasswordPanel()}
      </>
    );
  }
}

export const UserPanels = withTranslation()(
  connect<StateProps, DispatchProps, {}, AppState>(
    UserPanelsPure.mapStateToProps,
    UserPanelsPure.mapDispatchToProps
  )(UserPanelsPure)
);
