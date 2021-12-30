import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import '../components/Card.css';

var WeeklySpend = (
    <Card className='card'>
        <CardContent>
            <Typography variant="h5" component="h2" style={{ color: '#84C9FB'}}>
                Weekly Spend:
            </Typography>
            <Typography color="white">
                $0.00
            </Typography>
        </CardContent>
    </Card>
)

export default function WeeklySpendCard() {
    return (
        <Box sx={{ maxWidth: '300px', minWidth:'300px'}}>
            <Card variant="elevated">{WeeklySpend}</Card>
        </Box>
    );
}