import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import BankForm from './components/BankForm';
import CreditForm from './components/CreditForm';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#84C9FB'),
  },
});

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route path="/bankform">
          <BankForm />
        </Route>
        <Route path="/creditform">
          <CreditForm/>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
