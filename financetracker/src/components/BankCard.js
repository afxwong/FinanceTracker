import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import '../components/Card.css';
import wellsfargologo from '../images/wells_fargo_.png';


function BankCardOutlined() {
    var [balance, setBalance] = React.useState("Loading...");
    React.useEffect(() => {
        fetch("/api/balances")
        .then((res) => res.json())
        .then((data) => setBalance(data[0].balance));
    }, []);

    return (
        <Box sx={{ maxWidth: '300px', minWidth:'300px'}}>
            <Card variant='elevated' className='card'>
                <CardContent>
                    <Typography variant="h5" component="h2" style={{ color: '#84C9FB'}}>
                        Current Balance:
                    </Typography>
                    <Typography color="white">
                        ${balance}
                    </Typography>
                </CardContent>
                <CardActions className='cardcontent'>
                    <img className='logo' src={wellsfargologo} />
                </CardActions>
            </Card>
        </Box>
    )
}

export default BankCardOutlined;
