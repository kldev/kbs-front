import React from 'react';
import { MapDispatchToProps, connect } from 'react-redux';
import { toggleFilter } from 'store/nav/actions';

interface DispatchProps {
  toggleFilter: () => void;
}

class HotKeyProvider extends React.Component<DispatchProps> {
  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    toggleFilter: () => {
      dispatch(toggleFilter());
    }
  });

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (ev: KeyboardEvent) => {
    // console.log('Keyboard down:' , ev);

    if ((ev.ctrlKey || ev.altKey) && ev.key === ']' && this.props.toggleFilter) {
      this.props.toggleFilter();
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default connect<{}, DispatchProps>(null, HotKeyProvider.mapDispatchToProps)(HotKeyProvider);
