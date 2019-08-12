import React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { Paths } from 'constant/Paths';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router';
import { UserRole } from 'api/UserRole';

interface OwnProps {
  role: string;
}

type Props = OwnProps & WithTranslation & RouteComponentProps;

export class AppNavPure extends React.Component<Props> {
  handleMenuClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (ev) {
      ev.nativeEvent.preventDefault();
    }
    if (item) this.props.history.push(item.url);
    return false;
  };

  _renderSalesman(): JSX.Element {
    return (
      <Nav
        styles={{ root: { width: 300 } }}
        expandButtonAriaLabel="Expand or collapse"
        groups={[
          {
            name: 'Menu',
            links: [
              {
                key: 'BooksList',
                name: 'Books',
                url: Paths.SalesmanBook,
                onClick: this.handleMenuClick
              }
            ]
          }
        ]}
      />
    );
  }

  _renderOwner(): JSX.Element {
    return (
      <Nav
        styles={{ root: { width: 300 } }}
        expandButtonAriaLabel="Expand or collapse"
        groups={[
          {
            name: 'Menu',
            links: [
              {
                key: 'SalesmanList',
                name: "Salesman's",
                url: Paths.SalesmanList,
                onClick: this.handleMenuClick
              }
            ]
          }
        ]}
      />
    );
  }

  render() {
    const { role } = this.props;
    return role === UserRole.Salesman ? this._renderSalesman() : this._renderOwner();
  }
}

export const AppNav = withRouter(withTranslation()(AppNavPure));
