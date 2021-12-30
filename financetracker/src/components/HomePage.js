import React from 'react';
import './HomePage.css';
import $ from 'jquery';
import BankCardOutlined from './BankCard.js';
import CreditCardOutlined from './CreditCard.js';
import Navbar from './NavBar';
import TransactionButton from './TransactionButton';
import WeeklySpendCard from './WeeklySpendCard';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#84C9FB'),
  },
});

export default function HomePage() {
  return (
    <div className="background">
      <div>
        <Navbar />
      </div>
      <div class="doublecarddiv">
        <BankCardOutlined />
          <ThemeProvider theme={theme}>
            <Button variant="outlined" color="primary">Initiate Payment</Button>
          </ThemeProvider>
        <CreditCardOutlined />
      </div>
      <div class="buttongroupdiv">
        <TransactionButton />
      </div>
      <div class="singlecarddiv">
        <WeeklySpendCard />
      </div>
    </div>
  );
}