/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TreadingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";

const tab = ["portfolio", "history"];

const dummyPortfolio = [
  {
    id: 1,
    coin: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      image: "/btc.png",
      current_price: 45000,
      price_change_24h: -500,
      price_change_percentage_24h: -1.1,
    },
    quantity: 0.25,
  },
  {
    id: 2,
    coin: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      image: "/eth.png",
      current_price: 3200,
      price_change_24h: 100,
      price_change_percentage_24h: 3.2,
    },
    quantity: 2,
  },
  {
    id: 3,
    coin: {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      image: "/sol.png",
      current_price: 150,
      price_change_24h: -5,
      price_change_percentage_24h: -3.3,
    },
    quantity: 10,
  },
  {
    id: 4,
    coin: {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      image: "/ada.png",
      current_price: 1.2,
      price_change_24h: 0.05,
      price_change_percentage_24h: 4.3,
    },
    quantity: 500,
  },
  {
    id: 5,
    coin: {
      id: "xrp",
      name: "XRP",
      symbol: "XRP",
      image: "/xrp.png",
      current_price: 0.75,
      price_change_24h: -0.02,
      price_change_percentage_24h: -2.6,
    },
    quantity: 1000,
  },
  {
    id: 6,
    coin: {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      image: "/doge.png",
      current_price: 0.1,
      price_change_24h: 0.005,
      price_change_percentage_24h: 5.2,
    },
    quantity: 2000,
  },
  {
    id: 7,
    coin: {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      image: "/dot.png",
      current_price: 25,
      price_change_24h: 1.5,
      price_change_percentage_24h: 6.4,
    },
    quantity: 20,
  },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  const displayedAssets = asset.userAssets?.length ? asset.userAssets : dummyPortfolio;

  return (
    <div className="px-10 py-5 mt-10">
      <div className="pb-5 flex items-center gap-5">
        <Select onValueChange={handleTabChange} defaultValue="portfolio">
          <SelectTrigger className="w-[180px] py-[1.2rem]">
            <SelectValue placeholder="Select Portfolio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentTab === "portfolio" ? (
        <Table className="px-5 relative">
          <TableHeader className="py-9">
            <TableRow className="sticky top-0 left-0 right-0 bg-background">
              <TableHead className="py-3">Assets</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>UNIT</TableHead>
              <TableHead>CHANGE</TableHead>
              <TableHead>CHANGE(%)</TableHead>
              <TableHead className="text-right">VALUE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayedAssets.map((item) => (
              <TableRow onClick={() => navigate(`/market/${item.coin.id}`)} key={item.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="-z-50">
                    <AvatarImage src={item.coin.image} alt={item.coin.symbol} />
                  </Avatar>
                  <span>{item.coin.name}</span>
                </TableCell>
                <TableCell>${item.coin.current_price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className={item.coin.price_change_percentage_24h < 0 ? "text-red-600" : "text-green-600"}>
                  {item.coin.price_change_24h}
                </TableCell>
                <TableCell className={item.coin.price_change_percentage_24h < 0 ? "text-red-600" : "text-green-600"}>
                  {item.coin.price_change_percentage_24h}%
                </TableCell>
                <TableCell className="text-right">
                  ${(item.coin.current_price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <TreadingHistory />
      )}
    </div>
  );
};

export default Portfolio;
