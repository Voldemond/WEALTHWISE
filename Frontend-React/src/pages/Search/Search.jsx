import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { searchCoin } from "@/Redux/Coin/Action";
import axios from 'axios';

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("");  // Reset keyword to empty string initially
  const [coinsList, setCoinsList] = useState([]);
  const navigate = useNavigate();

  // Dummy data for coins (you can replace this with real API data)
  const dummyCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", market_cap_rank: 1, large: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", market_cap_rank: 2, large: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
    { id: "binance-coin", name: "Binance Coin", symbol: "BNB", market_cap_rank: 3, large: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
    { id: "cardano", name: "Cardano", symbol: "ADA", market_cap_rank: 4, large: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", market_cap_rank: 5, large: "https://cryptologos.cc/logos/dogecoin-doge-logo.png" },
    { id: "solana", name: "Solana", symbol: "SOL", market_cap_rank: 6, large: "https://cryptologos.cc/logos/solana-sol-logo.png" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", market_cap_rank: 7, large: "https://cryptologos.cc/logos/polkadot-dot-logo.png" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", market_cap_rank: 8, large: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", market_cap_rank: 9, large: "https://cryptologos.cc/logos/litecoin-ltc-logo.png" },
    // Add more dummy data here
  ];

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get("http://localhost:5153/api/Coin");
        setCoinsList(response.data);  // Update with API data
      } catch (error) {
        console.error("Error fetching coins:", error);
        setCoinsList(dummyCoins);  // Fallback to dummy data
      }
    };
    fetchCoins();
  }, []);

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword)); // Dispatching search action (you may use this with your redux flow)
  };

  const filteredCoins = coinsList.filter((coin) =>
    coin.name.toLowerCase().includes(keyword.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(keyword.toLowerCase())
  );

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="p-10 lg:p=[50%]">
      <div className="flex items-center justify-center pb-16">
        <Input
          className="p-5 w-[90%] lg:w-[50%] rounded-r-none"
          placeholder="explore market..."
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
          <SearchIcon />
        </Button>
      </div>

      <Table className="px-5 relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Treading Pair</TableHead>
            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {filteredCoins.map((item) => (
            <TableRow onClick={() => navigate(`/market/${item.id}`)} key={item.id}>
              <TableCell>
                <p className="">{item.market_cap_rank}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.large} alt={item.name} />
                </Avatar>
                <span> {item.name}</span>
              </TableCell>

              <TableCell className="text-right">{item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin;
