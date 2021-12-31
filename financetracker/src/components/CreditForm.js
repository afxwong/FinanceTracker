import React from "react";
import "./Form.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Button } from '@mui/material';
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

export default function CreditForm() {

    const [inputs, setInputs] = React.useState({});
    const [type, setType] = React.useState("charge");
    const [merchantCategory, setMerchantCategory] = React.useState("Dining");

    const handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setMerchantCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var date = new Date().toISOString();
        var amount = inputs.amount;
        var vendor = inputs.vendor;
        if (amount < 0) {
            alert("Amount cannot be negative");
            return;
        }
        const data = {"date": date, amount, vendor, type, merchantCategory};
        
        fetch("/api/creditformpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(alert("Transaction added!"));
    }

    return (
        <div className='background'>
            <div>
                <NavBar />
            </div>
            <div>
                <h3>Submit a Credit Card Transaction</h3>
            </div>
            <div className='singlecarddiv'>
                <Box sx={{ maxWidth: '500px', minWidth:'500px'}}>
                    <Card className='card'>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <label className="formlabel">
                                    Charge or Refund:
                                    <select value={type} onChange={handleTypeChange} className="formselect" required>
                                        <option value="charge" selected>Charge</option>
                                        <option value="refund">Refund</option>
                                    </select>
                                </label>
                                <label className="formlabel">
                                    Amount:
                                    <input type="number" min="1" step="0.01" name="amount" onChange={handleChange} className="forminput" required/>
                                </label>
                                <label className="formlabel">
                                    Vendor:
                                    <input type="text" name="vendor" onChange={handleChange} className="forminput" required/>
                                </label>
                                <label className="formlabel">
                                    Merchant Category:
                                    <select value={merchantCategory} onChange={handleCategoryChange} className="formselect" required>
                                        <option value="Dining" selected>Dining</option>
                                        <option value="Grocery">Grocery</option>
                                        <option value="Merchandise">Merchandise</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                        <option value="N/A">N/A</option>
                                    </select>
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
