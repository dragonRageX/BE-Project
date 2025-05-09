import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
  text-align: right;
`;

const Portfolio = ({ data }) => {
  const headings = ['Allocation %', 'Amount ($)', 'Pred. Return', 'Sentiment', 'Hold (mo)'];

  const renderPriceWithCommas = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const renderPercentage = (number) => {
    if (number < 0) {
      return <span style={{ color: '#e01616' }}>{number.toFixed(1)}%</span>;
    }
    return <span style={{ color: '#0d6f3f' }}>{number.toFixed(1)}%</span>;
  }

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <Card
        sx={{
          borderRadius: "12px",
          padding: "5px 20px 20px 20px",
          boxShadow: "0 0 8px rgba(0,0,0,0.11)",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "3rem",
            boxShadow: "none",
          }}
        >
          <CardHeader
            title="Portfolio"
            sx={{ padding: "0px" }}
          />
          <Button sx={{ padding: "0px", color: "#CBCBCD" }}>
            <MoreHorizIcon />
          </Button>
        </Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Asset</TableHeaderCell>
                  {headings.map((heading, i) => (
                    <TableHeaderCell key={i} sx={{ textAlign: "right" }}>
                      {heading}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((record, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "#F7F7F7",
                      },
                    }}
                  >
                    <TableBodyCellSymbol>
                      <Box sx={{ fontWeight: 700 }}>{record.symbol}</Box>
                      <Box sx={{ color: "#4c4c4c" }}>{record.description}</Box>
                    </TableBodyCellSymbol>
                    <TableBodyCell>{record.allocation.toFixed(1)}%</TableBodyCell>
                    <TableBodyCell>{renderPriceWithCommas(record.amount)}</TableBodyCell>
                    <TableBodyCell>{renderPercentage(record.predictedReturn)}</TableBodyCell>
                    <TableBodyCell>{record.sentiment}</TableBodyCell>
                    <TableBodyCell>{record.holdDuration}</TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Grid>
  );
};

export default Portfolio;