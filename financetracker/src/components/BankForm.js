import React from "react";
import "./Form.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NavBar from './NavBar';

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
            <div className='singleclassdiv'>
                <Card className='card'>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <label className="formlabel">
                                Withdraw or Deposit:
                                <select value={type} onChange={handleTypeChange}>
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
                            <input type="submit" value="Submit" />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
