import React from 'react';
import { Box, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green, red, grey } from '@mui/material/colors';

// Styled Components for consistent styling
const TableHeaderCell = styled(TableCell)`
  padding: 10px;
  color: #CBCBCD;
  font-weight: bold;
  text-transform: uppercase;
  border-top: 1px solid #e0e0e0;
  background-color: #FEFDFF;
`;
const TableBodyCellSymbol = styled(TableCell)`
  padding: 5px;
`;
const TableBodyCell = styled(TableCell)`
  padding: 5px;
`;
const StyledRecommendation = styled(Typography)(({ recommendation }) => {
    switch (recommendation) {
      case 'BUY':
        return { color: green[500], fontWeight: 'bold' };
      case 'HOLD':
        return { color: grey[700], fontWeight: 'bold' };
      case 'SELL':
        return { color: red[500], fontWeight: 'bold' };
      default:
        return { color: grey[700], fontWeight: 'bold' };
    }
  });

const SignalsAndRecommendations = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader title="Signals & Recommendations" />
        <CardContent>
          <Typography>No data available.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ margin: '16px 0px 16px 25px', width: '100%', borderRadius: "12px", padding: "5px 20px 20px 20px", boxShadow: "0 0 8px rgba(0,0,0,0.11)" }}>
      <CardHeader title="Signals & Recommendations" />
      <CardContent>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Asset</TableHeaderCell>
                <TableHeaderCell>Recommendation</TableHeaderCell>
                <TableHeaderCell>Reasoning</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.asset}>
                  <TableBodyCellSymbol>{item.asset}</TableBodyCellSymbol>
                  <TableHeaderCell>
                    <StyledRecommendation recommendation={item.recommendation}>
                      {item.recommendation}
                    </StyledRecommendation>
                  </TableHeaderCell>
                  <TableBodyCell>{item.reasoning}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignalsAndRecommendations;
