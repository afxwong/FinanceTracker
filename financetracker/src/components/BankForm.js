import React from "react";
import "./Form.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#84C9FB'),
  },
});

export default function BankForm() {

    const [inputs, setInputs] = React.useState({});
    const [type, setType] = React.useState("Withdraw");

    const handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitting: ${JSON.stringify(inputs)}, ${JSON.stringify(type)}`);
    }

    return (
        <div className='background'>
            <div>
                <NavBar />
            </div>
            <div>
                <h3>Submit a Bank Transaction</h3>
            </div>
            <div className='singlecarddiv'>
                <Box sx={{ maxWidth: '500px', minWidth:'500px'}}>
                    <Card className='card'>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <label className="formlabel">
                                    Withdraw or Deposit:
                                    <select value={type} onChange={handleTypeChange} className="formselect">
                                        <option value="withdraw" selected>Withdraw</option>
                                        <option value="deposit">Deposit</option>
                                    </select>
                                </label>
                                <label className="formlabel">
                                    Amount:
                                    <input type="number" name="amount" onChange={handleChange} className="forminput" />
                                </label>
                                <label className="formlabel">
                                    Vendor:
                                    <input type="text" name="vendor" onChange={handleChange} className="forminput" />
                                </label>
                                <ThemeProvider theme={theme}>
                                    <Button variant="outlined" color="primary" type="submit">Submit</Button>
                                </ThemeProvider>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </div>
    );
}
