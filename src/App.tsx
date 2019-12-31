import React from 'react';
import './App.scss';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Login } from 'views/loginPage/Login';
import { Layout } from 'views/layout/Layout';
import { Page404 } from 'views/codePage/Page404';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HotKeyProvider from 'component/providers/HotKeyProvider';
import { NotifyProvider } from 'component/providers/NotifyProvider';
import { loadTheme } from '@uifabric/styling';
// import { registerIcons } from '@uifabric/styling';
import 'assets/fonts/Micon/css/micon.min.css';

loadTheme({
  defaultFontStyle: {
    fontFamily: 'Roboto, Selawik Regular'
  }
});

// registerIcons({
//   icons: {
//     Waffle: <span className={'mi mi-lg mi-ViewAll'} />,
//     ProfileSearch: <span className={'mi mi-Contact'} />,
//     PasswordField: <span className={'mi mi-Lock'} />,
//     SignOut: <span className={'mi mi-ClosePaneMirrored'} />,
//     CollapseMenu: <span className={'mi mi-GlobalNavigationButton'} />,
//     Filter: <span className={'mi mi-Filter'} />,
//     Edit: <span className={'mi mi-Edit'} />,
//     Delete: <span className={'mi mi-Delete'} />,
//     ChromeClose: <span className={'mi mi-ChromeClose'} />
//   }
// });

const App: React.FC = () => {
  return (
    <Router>
      <Fabric id='app"'>
        <HotKeyProvider>
          <NotifyProvider>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Layout} />
              <Route component={Page404} />
            </Switch>
          </NotifyProvider>
        </HotKeyProvider>
      </Fabric>
    </Router>
  );
};

export default App;
