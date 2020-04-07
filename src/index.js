import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './theme/theme.json';
import {Provider} from 'react-redux';
import store from './redux';
import Routes from './routes';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faKey, faHome, faCog, faBuilding, faUser, faUtensils, faTruck, faEyeSlash, faSearch, faPlusSquare, faMinusSquare} from '@fortawesome/free-solid-svg-icons'
library.add (faAt, faKey, faHome, faCog, faBuilding, faUser, faUtensils, faTruck, faEyeSlash, faSearch, faPlusSquare, faMinusSquare)

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;