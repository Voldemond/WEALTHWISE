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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";

const getRandomTimestamp = () => {
  const now = Date.now();
  const pastTime = now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000); // Random within last 30 days
  return pastTime;
};

const dummyOrders = [
  {
    id: 1,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Bitcoin", symbol: "BTC", image: "/btc.png" },
      buyPrice: 44000,
      sellPrice: 45000,
    },
    orderType: "SELL",
    price: 1000,
  },
  {
    id: 2,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Ethereum", symbol: "ETH", image: "/eth.png" },
      buyPrice: 3100,
      sellPrice: 3200,
    },
    orderType: "SELL",
    price: 500,
  },
  {
    id: 3,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Solana", symbol: "SOL", image: "/sol.png" },
      buyPrice: 140,
      sellPrice: 150,
    },
    orderType: "SELL",
    price: 100,
  },
  {
    id: 4,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Cardano", symbol: "ADA", image: "/ada.png" },
      buyPrice: 1.10,
      sellPrice: 1.20,
    },
    orderType: "SELL",
    price: 50,
  },
  {
    id: 5,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "XRP", symbol: "XRP", image: "/xrp.png" },
      buyPrice: 0.70,
      sellPrice: 0.75,
    },
    orderType: "SELL",
    price: 30,
  },
  {
    id: 6,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Polkadot", symbol: "DOT", image: "/dot.png" },
      buyPrice: 23,
      sellPrice: 25,
    },
    orderType: "SELL",
    price: 80,
  },
  {
    id: 7,
    timestamp: getRandomTimestamp(),
    orderItem: {
      coin: { name: "Dogecoin", symbol: "DOGE", image: "/doge.png" },
      buyPrice: 0.08,
      sellPrice: 0.10,
    },
    orderType: "SELL",
    price: 20,},
    {
      id: 8,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Shiba Inu", symbol: "SHIB", image: "/shib.png" },
        buyPrice: 0.000025,
        sellPrice: 0.00003,
      },
      orderType: "SELL",
      price: 10,
    },
    {
      id: 9,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Litecoin", symbol: "LTC", image: "/ltc.png" },
        buyPrice: 190,
        sellPrice: 200,
      },
      orderType: "SELL",
      price: 150,
    },
    {
      id: 10,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Chainlink", symbol: "LINK", image: "/link.png" },
        buyPrice: 22,
        sellPrice: 25,
      },
      orderType: "SELL",
      price: 90,
    },
    {
      id: 11,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Uniswap", symbol: "UNI", image: "/uni.png" },
        buyPrice: 25,
        sellPrice: 28,
      },
      orderType: "SELL",
      price: 70,
    },
    {
      id: 12,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "VeChain", symbol: "VET", image: "/vet.png" },
        buyPrice: 0.10,
        sellPrice: 0.12,
      },
      orderType: "SELL",
      price: 25,
    },
    {
      id: 13,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Avalanche", symbol: "AVAX", image: "/avax.png" },
        buyPrice: 60,
        sellPrice: 65,
      },
      orderType: "SELL",
      price: 130,
    },
    {
      id: 14,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Cosmos", symbol: "ATOM", image: "/atom.png" },
        buyPrice: 30,
        sellPrice: 35,
      },
      orderType: "SELL",
      price: 90,
    },
    {
      id: 15,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Tezos", symbol: "XTZ", image: "/xtz.png" },
        buyPrice: 4.00,
        sellPrice: 4.50,
      },
      orderType: "SELL",
      price: 30,
    },
    {
      id: 16,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Aave", symbol: "AAVE", image: "/aave.png" },
        buyPrice: 280,
        sellPrice: 300,
      },
      orderType: "SELL",
      price: 200,
    },
    {
      id: 17,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Decentraland", symbol: "MANA", image: "/mana.png" },
        buyPrice: 3.00,
        sellPrice: 3.50,
      },
      orderType: "SELL",
      price: 50,
    },
    {
      id: 18,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "The Sandbox", symbol: "SAND", image: "/sand.png" },
        buyPrice: 3.50,
        sellPrice: 3.80,
      },
      orderType: "SELL",
      price: 40,
    },
    {
      id: 19,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Axie Infinity", symbol: "AXS", image: "/axs.png" },
        buyPrice: 60,
        sellPrice: 65,
      },
      orderType: "SELL",
      price: 120,
    },
    {
      id: 20,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Gala", symbol: "GALA", image: "/gala.png" },
        buyPrice: 0.35,
        sellPrice: 0.40,
      },
      orderType: "SELL",
      price: 30,
    },
    {
      id: 21,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Enjin Coin", symbol: "ENJ", image: "/enj.png" },
        buyPrice: 2.50,
        sellPrice: 2.80,
      },
      orderType: "SELL",
      price: 40,
    },
    {
      id: 22,
      timestamp: getRandomTimestamp(),
      orderItem: {
        coin: { name: "Chiliz", symbol: "CHZ", image: "/chz.png" },
        buyPrice: 0.40,
        sellPrice: 0.45,
      },
      orderType: "SELL",
      price: 25,
    },
  ];

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const displayedOrders = order.orders?.length ? order.orders : dummyOrders;

  return (
    <div className="">
      <Table className="px-5 relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            <TableHead className="py-3">Date & Time</TableHead>
            <TableHead>Treading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Profite/Loss</TableHead>
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {displayedOrders.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <p>{readableDate(item.timestamp).date}</p>
                <p className="text-gray-400">
                  {readableDate(item.timestamp).time}
                </p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.orderItem.coin.image}
                    alt={item.orderItem.coin.symbol}
                  />
                </Avatar>
                <span> {item.orderItem.coin.name}</span>
              </TableCell>

              <TableCell>${item.orderItem.buyPrice}</TableCell>
              <TableCell>
                {item.orderItem.sellPrice ? `$${item.orderItem.sellPrice}` : "-"}
              </TableCell>
              <TableCell>{item.orderType}</TableCell>
              <TableCell
                className={`${
                  calculateProfite(item) < 0 ? "text-red-600" : ""
                }`}
              >
                {item.orderType === "SELL" ? calculateProfite(item) : "-"}
              </TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreadingHistory;
