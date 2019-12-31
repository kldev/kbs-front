import React from 'react';
import { DetailsList, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { SalesmanListItem } from 'api/types';
import { AppState } from 'store';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import { getList } from 'store/ownerSales/thunk';
// import { mergeStyleSets } from '@uifabric/styling';
import { RoleRestriction } from 'component/providers/RoleRestriction';
import { UserRole } from 'constant/UserRole';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { stack, bar } from './styles';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

interface StateProps {
  list: SalesmanListItem[];
  role: string;
  token: string;
}

interface DispatchProps {
  getList: () => void;
}

// const classNames = mergeStyleSets({
//   wrapper: {
//     height: '80vh',
//     position: 'relative',
//     boxSizing: 'border-box',
//     paddingBottom: '20px'
//   }
// });

type Props = StateProps & DispatchProps & WithTranslation;

class SalesmanListPure extends React.Component<Props> {
  static mapStateToProps: MapStateToProps<StateProps, {}, AppState> = ({ ownerSales, app }) => {
    return {
      list: ownerSales.list,
      role: app.role,
      token: app.token
    };
  };

  static mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
    getList
  };

  private _selection = new Selection({
    onSelectionChanged: () => {
      this.forceUpdate();
    }
  });

  // constructor(props: Props) {
  //   super(props);
  //   // nothing
  // }

  componentDidMount() {
    this.props.getList();
  }

  count = (): String => {
    const selectedCount = this._selection.getSelectedCount();
    if (selectedCount > 0) {
      return `Selected [${selectedCount}]`;
    }

    return '';
  };

  render() {
    const { list, role } = this.props;

    const items: ICommandBarItemProps[] = [
      {
        key: 'selected',
        text: `${this.count()}`,
        iconProps: {
          iconName: 'People'
        }
      }
    ];

    return (
      <>
        <RoleRestriction role={role} allowedRole={[UserRole.Owner]}>
          <Stack verticalFill horizontal={false}>
            <CommandBar styles={bar} items={items} farItems={[]} />
            <Stack styles={stack} verticalFill horizontal={false}>
              <ScrollablePane>
                <DetailsList selection={this._selection} selectionMode={SelectionMode.multiple} items={list} />
              </ScrollablePane>
            </Stack>
          </Stack>
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
