import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL"); // State for currently selected stock
  const [stockPrice, setStockPrice] = useState(null); // State for the price of the selected stock
  const [loading, setLoading] = useState(true); // State to indicate whether data is being loaded

  const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN"]; // Available stock options

  useEffect(() => {
    // Function to fetch stock data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stock-price-api.vercel.app/api/stock?symbol=${selectedStock}`
        );
        const data = await response.data;
      
        setStockPrice(data.price); // Set the stock price based on the fetched data
        setLoading(false); // Indicate that loading is complete
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Initial data fetch when component mounts

    const interval = setInterval(fetchData, 60000); // Set interval to fetch data every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [selectedStock]); // Run the effect when selectedStock changes

  // Function to handle stock selection change
  const handleStockChange = (e) => {
    setSelectedStock(e.target.value); // Update the selected stock
    setLoading(true); // Set loading to true to indicate that new data is being fetched
  };

  // Render the component
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Mini Stock Price Tracker</h2>
      <div style={{ margin: "20px 0" }}>
        <select
          value={selectedStock}
          onChange={handleStockChange}
          style={{ padding: "10px" }}
        >
          {stocks.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
      </div>
      <div style={{ fontSize: "20px" }}>
        {loading ? ( // Display loading state if data is being fetched
          <div>Loading...</div>
        ) : (
          <div>
            {stockPrice // Display the stock price if available, otherwise show data not available
              ? `Current price: $${stockPrice}`
              : "Data not available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
