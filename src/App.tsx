import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import MoviesDetail from './pages/movies-details';
import { ThemeProvider } from 'styled-components';
import { PageContainer } from './pages/home/style';
import { defaultTheme } from './components/theme';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={defaultTheme}>
          <PageContainer id="pageContainer">
            <Route path="/" exact component={Home}></Route>
            <Route path="/details/:id" exact component={MoviesDetail} />
          </PageContainer>
          <ToastContainer> </ToastContainer>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
