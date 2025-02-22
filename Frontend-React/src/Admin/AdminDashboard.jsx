// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_URL = "http://localhost:5153/api/Coin";

// const AdminDashboard = () => {
//   const [stocks, setStocks] = useState([]);
//   const [newStock, setNewStock] = useState({ name: "", symbol: "", price: "" });
//   const navigate = useNavigate();

//   // Fetch stocks
//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   const fetchStocks = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setStocks(response.data);
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     }
//   };

//   // Add new stock
//   const addStock = async () => {
//     try {
//       await axios.post(API_URL, newStock);
//       fetchStocks(); // Refresh data
//       setNewStock({ name: "", symbol: "", price: "" });
//     } catch (error) {
//       console.error("Error adding stock:", error);
//     }
//   };

//   // Delete stock
//   const deleteStock = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchStocks(); // Refresh data
//     } catch (error) {
//       console.error("Error deleting stock:", error);
//     }
//   };

//   return (
//     <div className="p-10 bg-gray-900 min-h-screen text-white">
//       <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard - Manage Stocks</h2>

//       {/* Add New Stock Form */}
//       <div className="mb-6 flex flex-wrap gap-4 justify-center">
//         <input
//           className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
//           placeholder="Stock Name"
//           value={newStock.name}
//           onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
//         />
//         <input
//           className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
//           placeholder="Symbol"
//           value={newStock.symbol}
//           onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
//         />
//         <input
//           className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
//           placeholder="Price"
//           type="number"
//           value={newStock.price}
//           onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
//         />
//         <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded text-white" onClick={addStock}>
//           Add Stock
//         </button>
//       </div>

//       {/* Stocks Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="p-3 border border-gray-700">Name</th>
//               <th className="p-3 border border-gray-700">Symbol</th>
//               <th className="p-3 border border-gray-700">Price</th>
//               <th className="p-3 border border-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.length > 0 ? (
//               stocks.map((stock) => (
//                 <tr key={stock.id} className="bg-gray-800 hover:bg-gray-700">
//                   <td className="p-3 border border-gray-700 text-center">{stock.name}</td>
//                   <td className="p-3 border border-gray-700 text-center">{stock.symbol}</td>
//                   <td className="p-3 border border-gray-700 text-center">${stock.price}</td>
//                   <td className="p-3 border border-gray-700 text-center">
//                     <button
//                       className="p-2 bg-red-600 hover:bg-red-500 rounded text-white"
//                       onClick={() => deleteStock(stock.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center text-gray-400">
//                   No stocks available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5153/api/Coin";

const AdminDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    name: "",
    symbol: "",
    price: "",
    marketCap: "",
    volume: "",
    change24h: "",
    imageUrl: "" // Image URL input field
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch stocks
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(API_URL);
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  // Filtered stocks based on search term
  const filteredStocks = stocks.filter((stock) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      stock.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      stock.symbol.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Add new stock
  const addStock = async () => {
    try {
      await axios.post(API_URL, newStock);
      fetchStocks(); // Refresh data
      setNewStock({
        name: "",
        symbol: "",
        price: "",
        marketCap: "",
        volume: "",
        change24h: "",
        imageUrl: ""
      });
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  // Delete stock
  const deleteStock = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStocks(); // Refresh data
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token
    sessionStorage.clear(); // Clear session storage
    window.location.href = "/signin"; // Redirect to login page
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white relative">
      {/* Logout Button */}
      <button
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white p-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Admin Dashboard - Manage Stocks
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white w-1/3"
          placeholder="Search by Name or Symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add New Stock Form */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Stock Name"
          value={newStock.name}
          onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Symbol"
          value={newStock.symbol}
          onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Price"
          type="number"
          value={newStock.price}
          onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Market Cap"
          type="number"
          value={newStock.marketCap}
          onChange={(e) => setNewStock({ ...newStock, marketCap: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Volume"
          type="number"
          value={newStock.volume}
          onChange={(e) => setNewStock({ ...newStock, volume: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Change (24h)"
          type="number"
          value={newStock.change24h}
          onChange={(e) => setNewStock({ ...newStock, change24h: e.target.value })}
        />
        <input
          className="p-2 border border-gray-500 bg-gray-800 rounded text-white"
          placeholder="Image URL"
          value={newStock.imageUrl}
          onChange={(e) => setNewStock({ ...newStock, imageUrl: e.target.value })}
        />
        <button
          className="p-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
          onClick={addStock}
        >
          Add Stock
        </button>
      </div>

      {/* Stocks Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border border-gray-700">Name</th>
              <th className="p-3 border border-gray-700">Symbol</th>
              <th className="p-3 border border-gray-700">Price</th>
              <th className="p-3 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr key={stock.id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="p-3 border border-gray-700 text-center">{stock.name}</td>
                  <td className="p-3 border border-gray-700 text-center">{stock.symbol}</td>
                  <td className="p-3 border border-gray-700 text-center">${stock.price}</td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      className="p-2 bg-red-600 hover:bg-red-500 rounded text-white"
                      onClick={() => deleteStock(stock.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-400">
                  No stocks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
