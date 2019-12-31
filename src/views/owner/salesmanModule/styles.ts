import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
import { getTheme } from '@uifabric/styling';

const theme = getTheme();
const { palette } = theme;

export const stack: IStackStyles = {
  root: {
    position: 'relative',
    paddingBottom: '10px'
  }
};

export const bar: ICommandBarStyles = {
  root: {
    borderBottom: '1px solid #ddd',
    borderColor: palette.themeLight,
    backgroundColor: palette.neutralQuaternary
  }
};
