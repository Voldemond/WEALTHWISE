import Sidebar from "./page/Navbar/Sidebar.jsx";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Navbar from "./page/Navbar/Navbar.jsx";
import Home from "./page/Home/Home.jsx";
import Portfolio from "./page/Portfolio/Portfolio.jsx";
import Activity from "./page/Activity/Activity.jsx";
import Wallet from "./page/Wallet/Wallet.jsx";
import Withdrawal from "./page/Withdrawal/Withdrawal.jsx";
import PaymentDetails from "./page/Payment Details/PaymentDetails.jsx";
import StockDetails from "./page/Stock Details/StockDetails.jsx";
import Watchlist from "./page/Watchlist/Watchlist.jsx";
import Profile from "./page/Profile/Profile.jsx";
import SearchCoin from "./page/Search/SearchCoin.jsx";
import NotFound from "./page/NotFound/NotFound.jsx";
import Auth from "./page/Auth/Auth.jsx";

function App() {
  return (
    <>
      {/* <Auth this is comment /> */}
      {true && (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
         
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
