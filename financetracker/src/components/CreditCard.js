import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import '../components/Card.css';
import capitalonelogo from '../images/capitalone.png';


var CreditCard = (
    <Card className='card'>
        <CardContent>
            <Typography variant="h5" component="h2" style={{ color: '#84C9FB'}}>
                Payment Due:
            </Typography>
            <Typography color="white">
                $0.00
            </Typography>
        </CardContent>
        <CardActions className='cardcontent'>
            <img className='logo' src={capitalonelogo} />
        </CardActions>
    </Card>
)

export default function BankCardOutlined() {
    return (
        <Box sx={{ maxWidth: '300px', minWidth:'300px'}}>
            <Card variant="elevated">{CreditCard}</Card>
        </Box>
    );
}
