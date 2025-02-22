// import axios from 'axios';
// export const dataType="Time Series (Daily)"
// const fetchData = async (keyword,symbol) => {
//   try {
//     const response = await axios.get('https://www.alphavantage.co/query', {
//       params: {
//         function: keyword,
//         symbol: symbol,
//         apikey: 'my api keyd', // Replace 'demo' with your actual API key
//         market:"EUR"
//       }
//     });

//     // Check if data was retrieved successfully
//     if (response.status === 200) {
//       return response.data; // Return the data
//     } else {
//       throw new Error('Failed to fetch data');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null; // Return null if there's an error
//   }
// };

// export default fetchData;

// const fetchData = async (functionName, symbol) => {
//   const apiKey = process.env.REACT_APP_COINGECKO_API_KEY; // Get the API key from .env
//   const url = `https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=CG-KrJWuHN49ZAF4zY6vhFU2yhn`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching market data:", error);
//   }
// };

// export default fetchData;

// const fetchData = async (symbol) => {
//   console.log("symbol",symbol);
//   const apiKey = process.env.REACT_APP_COINGECKO_API_KEY; // Optional if you have a CoinGecko API key for advanced features
//   console.log("apikey",apiKey);
//   const url = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=1&interval=daily`; // Correct endpoint
//   console.log("url",url);
//   try {
//     const response = await fetch(url, {
//       headers: {
//         "x-cg-demo-api-key": apiKey, // Optional: Remove if you're using the public API
//       },
//     });
//     console.log("response",response);
//     const data = await response.json();
//     console.log("responsedata);",data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching market data:", error);
//     return null;
//   }
// };

// export default fetchData;

const fetchData = async (symbol) => {
  console.log("symbol", symbol);
  const apiKey = process.env.REACT_APP_COINGECKO_API_KEY; // Optional if you have a CoinGecko API key for advanced features
  const url = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=1&interval=daily`; // Correct endpoint
  console.log("url", url);

  try {
    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": apiKey, // Optional: Remove if you're using the public API
      },
    });
    const data = await response.json();
    console.log("Market data response:", data);
    return data; // Return the market data
  } catch (error) {
    console.error("Error fetching market data:", error);
    return null; // Return null in case of error
  }
};

export default fetchData;
