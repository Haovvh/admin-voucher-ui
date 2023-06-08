// @mui
import { Card } from '@mui/material';
import { Col,Row } from 'react-bootstrap';

export default function AppWidgetSummaryThree({ title, isActive, total, icon, color = 'primary', sx, ...other }) {
  
  return (
    <Card 
      sx={{
        py:2,
        height: '150px',
        boxShadow: 0,        
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >  
    {isActive && Array.isArray(isActive) && isActive.map((option) => {
        return (
          <Row >
            <Col md={{ span: 1, offset: 1 }}><h5>{option.name}</h5> </Col>
            <Col md={{ span: 1, offset: 6 }}><h5>{option.value}</h5></Col>
          </Row>          
        )
      })}
      <Row>
      <Col md={{ span: 1, offset: 1 }}><h5>{title.name}</h5> </Col>
      <Col md={{ span: 1, offset: 6 }}><h5>{title.value}</h5></Col>
      </Row>
    </Card>
    
  );
}
