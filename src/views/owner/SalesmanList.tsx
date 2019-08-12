import React from 'react';
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { SalesmanListItem } from 'api/types';
import { AppState } from 'store';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { getList } from 'store/ownerSales/thunk';
import { mergeStyleSets } from '@uifabric/styling';
import { RoleRestriction } from 'views/component/RoleRestriction';
import { UserRole } from 'constant/UserRole';

interface StateProps {
  list: SalesmanListItem[];
  role: string;
}

interface DispatchProps {
  getList: () => void;
}

const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
    boxSizing: 'border-box',
    paddingBottom: '20px'
  }
});

type Props = StateProps & DispatchProps & WithTranslation;

class SalesmanListPure extends React.Component<Props> {
  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({ ownerSales, app }) => {
    return {
      list: ownerSales.list,
      role: app.role
    };
  };

  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
    getList
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    const { list, role } = this.props;

    return (
      <>
        <RoleRestriction role={role} allowedRole={[UserRole.Owner]}>
          <div className={classNames.wrapper}>
            <ScrollablePane>
              <Sticky stickyPosition={StickyPositionType.Header}>
                <p>Salesman list</p>
              </Sticky>
              <DetailsList selection={new Selection()} selectionMode={SelectionMode.none} items={list} />
            </ScrollablePane>
          </div>
        </RoleRestriction>
      </>
    );
  }
}

export const SalesmanList = withTranslation()(
  connect<StateProps, DispatchProps, {}, AppState>(
    SalesmanListPure.mapStateToProps,
    SalesmanListPure.mapDispatchToProps
  )(SalesmanListPure)
);
