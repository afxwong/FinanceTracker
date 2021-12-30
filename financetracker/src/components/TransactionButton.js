import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#84C9FB'),
  },
});

export default function TransactionButton() {
    return (
        <ThemeProvider theme={theme}>
            <ButtonGroup variant="outlined" color="primary">
                <Button component={Link} to="/bankform">Submit a Bank Transaction</Button>
                <Button component={Link} to="/creditform">Submit a Credit Card Transaction</Button>
            </ButtonGroup>
        </ThemeProvider>
    );
}