import React, { CSSProperties } from 'react';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import { dismissError } from 'store/app/actions';
import { AppState } from 'store';

import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

interface StateProps {
  errorMessage: { id: string; value: string }[];
}
interface DispatchProps {
  dismissError: (value: { id: string; value: string }) => void;
}

type Props = StateProps & DispatchProps;

const errorStyle: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0
};

const stackTokens: IStackTokens = {
  childrenGap: 10
};

class NotifyProviderPure extends React.Component<Props> {
  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
    dismissError
  };

  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({ app }) => {
    return {
      errorMessage: app.errorMessage
    };
  };

  render() {
    const { errorMessage } = this.props;

    const messagesBar: JSX.Element[] = [];
    if (errorMessage && errorMessage.length > 0) {
      for (let max = errorMessage.length - 1; max >= 0; max--) {
        const value = errorMessage[max].value;
        const item = errorMessage[max];

        setTimeout(() => {
          if (this.props.dismissError) {
            this.props.dismissError(item);
          }
        }, 2000);

        messagesBar.push(
          <MessageBar key={max} messageBarType={MessageBarType.error} onDismiss={() => this.props.dismissError(item)}>
            {value}
          </MessageBar>
        );
      }
    }

    return (
      <>
        {this.props.children}

        {errorMessage && errorMessage.length > 0 && (
          <Stack style={errorStyle} tokens={stackTokens}>
            {messagesBar}
          </Stack>
        )}
      </>
    );
  }
}

export const NotifyProvider = connect<StateProps, DispatchProps, {}, AppState>(
  NotifyProviderPure.mapStateToProps,
  NotifyProviderPure.mapDispatchToProps
)(NotifyProviderPure);
