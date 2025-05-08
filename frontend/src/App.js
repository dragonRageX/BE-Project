//https://github.com/jrozal/investfolio

import { useState, useEffect } from 'react';
import { Box, Container, Grid, CssBaseline } from "@mui/material";
import AssetAllocation from './components/AssetAllocation';
import DailyReturns from './components/DailyReturns';
import Header from './components/Header'
import Portfolio from './components/Portfolio';
import TodaysMarkets from './components/TodaysMarkets/TodaysMarkets';
import API from './api'
import { theme } from './global/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [portfolioData, setPortfolioData] = useState([
    {
      symbol: "AAPL",
      description: "Apple Inc.",
      price: 170.50,
      priceChange: 1.20,
      percentChange: 0.71,
      profitLossAmount: 120.00,
      quantity: 100,
    },
    {
      symbol: "GOOGL",
      description: "Alphabet Inc Class C",
      price: 2500.75,
      priceChange: -5.30,
      percentChange: -0.21,
      profitLossAmount: -53.00,
      quantity: 10,
    },
    {
      symbol: "MSFT",
      description: "Microsoft Corp",
      price: 285.90,
      priceChange: 2.15,
      percentChange: 0.76,
      profitLossAmount: 215.00,
      quantity: 100,
    },
    {
      symbol: "AMZN",
      description: "Amazon.com Inc",
      price: 3200.20,
      priceChange: -10.50,
      percentChange: -0.33,
      profitLossAmount: -210.00,
      quantity: 20,
    }
  ]);

  const [assetAllocationData, setAssetAllocationData] = useState([
    { symbol: "Stocks", portfolioAllocation: 0.6 },   //sample data
    { symbol: "Bonds", portfolioAllocation: 0.3 },
    { symbol: "Cash", portfolioAllocation: 0.1 }
]);

  const [marketData, setMarketData] = useState([
    {
      symbol: "SPX",
      today: 4500.50,
      percentChange: 0.35,
      priceChange: 15.75,
      chartData: {
        t: [1683580800, 1683584400, 1683588000, 1683591600], // Example Unix timestamps
        c: [4480.20, 4495.10, 4490.80, 4500.50],          // Corresponding closing prices
      },
    },
    {
      symbol: "NDX",
      today: 15500.20,
      percentChange: 0.50,
      priceChange: 77.50,
      chartData: {
        t: [1683580800, 1683584400, 1683588000, 1683591600],
        c: [15450.10, 15480.30, 15470.90, 15500.20],
      },
    },
    {
      symbol: "RUT",
      today: 1850.75,
      percentChange: -0.10,
      priceChange: -1.85,
      chartData: {
        t: [1683580800, 1683584400, 1683588000, 1683591600],
        c: [1855.00, 1852.50, 1853.10, 1850.75],
      },
    },
    {
      symbol: "BTC",
      today: 27500.00,
      percentChange: 1.20,
      priceChange: 325.00,
      chartData: {
        t: [1683580800, 1683584400, 1683588000, 1683591600],
        c: [27200.00, 27350.00, 27400.00, 27500.00],
      },
    }
  ]);

  const [portfolioValue, setPortfolioValue] = useState(0);
  
  const [todaysChange, setTodaysChange] = useState(0);

  // const getPortfolioData = async () => {
  //   try {
  //     const response = await API.get('/portfolio-data');
  //     setPortfolioValue(response.data.portfolioValue);
  //     setTodaysChange(response.data.todaysChange);
  //     setPortfolioData(response.data.portfolioData);
  //     setAssetAllocationData(response.data.portfolioAllocation);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getMarketData = async () => {
  //   const date = new Date();
  //   const day = date.getDay();
  //   const currentTime = Math.floor(Date.now() / 1000);

  //   try {
  //     const response = await API.get('/market-data', {
  //       params: {
  //         day: day,
  //         currentTime: currentTime
  //       }
  //     });
  //     console.log(response.data);
  //     setMarketData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getPortfolioData();
  //   getMarketData();
  // }, []);

  return (
    // StyledEngineProvider allows CSS-in-JS to be used
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header portfolioValue={portfolioValue} todaysChange={todaysChange} />
        <Box
          sx={{
            display: "flex",
            height: "100%",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flex: "1 1 auto",
              overflow: "hidden",
              paddingTop: "48px",
            }}
          >
            <Box
              sx={{
                paddingTop: "56px",
                paddingBottom: "24px",
                overflow: "auto",
              }}
            >
              <Box>
                <Container>
                  <Grid container spacing={3}>
                    <TodaysMarkets marketData={marketData} />
                    <AssetAllocation
                      assetAllocationData={assetAllocationData}
                    />
                    <DailyReturns dailyReturnsData={portfolioData} />
                    <Portfolio data={portfolioData} />
                  </Grid>
                </Container>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
