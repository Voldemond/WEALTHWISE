import { useEffect, useState } from "react";

import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const Watchlist = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { watchlist, coin } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with the actual call to your Redux action
    // For dummy data, you can directly set the state
    dispatch(getUserWatchlist());
  }, [page]);

  // Simulating dummy data
  const dummyWatchlist = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      total_volume: "34,567,891,123",
      market_cap: "642,487,123,456",
      market_cap_change_percentage_24h: 1.5,
      current_price: "$34,000",
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      total_volume: "23,123,456,789",
      market_cap: "235,123,456,789",
      market_cap_change_percentage_24h: -2.3,
      current_price: "$2,400",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      id: "binance-coin",
      name: "Binance Coin",
      symbol: "BNB",
      total_volume: "7,654,321,987",
      market_cap: "47,123,456,789",
      market_cap_change_percentage_24h: 0.5,
      current_price: "$500",
      image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      total_volume: "2,100,987,654",
      market_cap: "72,345,678,912",
      market_cap_change_percentage_24h: 4.2,
      current_price: "$1.50",
      image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      total_volume: "4,320,987,654",
      market_cap: "50,123,456,789",
      market_cap_change_percentage_24h: -1.2,
      current_price: "$0.25",
      image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      total_volume: "5,432,123,789",
      market_cap: "57,123,456,789",
      market_cap_change_percentage_24h: 3.5,
      current_price: "$150",
      image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      total_volume: "1,987,654,321",
      market_cap: "25,123,456,789",
      market_cap_change_percentage_24h: -0.5,
      current_price: "$30",
      image: "https://cryptologos.cc/logos/polkadot-dot-logo.png",
    },
    {
      id: "chainlink",
      name: "Chainlink",
      symbol: "LINK",
      total_volume: "2,234,567,890",
      market_cap: "15,987,654,321",
      market_cap_change_percentage_24h: 2.0,
      current_price: "$27",
      image: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    },
    {
      id: "litecoin",
      name: "Litecoin",
      symbol: "LTC",
      total_volume: "3,123,456,789",
      market_cap: "11,123,456,789",
      market_cap_change_percentage_24h: 0.7,
      current_price: "$160",
      image: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    },
  ];

  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };

  return (
    <div className="pt-8 lg:px-10">
      <div className="flex items-center pt-5 pb-10 gap-5">
        <BookmarkFilledIcon className="h-10 w-10" />
        <h1 className="text-4xl font-semibold">Watchlist</h1>
      </div>

      <Table className="px-5 lg:px-20 border-t relative border-x border-b p-10 ">
        <ScrollArea className={""}>
          <TableHeader>
            <TableRow className="sticky top-0 left-0 right-0 bg-background">
              <TableHead className="py-4">Coin</TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>24H</TableHead>
              <TableHead className="">PRICE</TableHead>
              <TableHead className="text-right text-red-700">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {dummyWatchlist.map((item) => (
              <TableRow className="" key={item.id}>
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Avatar className="-z-50">
                    <AvatarImage src={item.image} alt={item.symbol} />
                  </Avatar>
                  <span> {item.name}</span>
                </TableCell>
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell
                  className={`${
                    item.market_cap_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.market_cap_change_percentage_24h}%
                </TableCell>
                <TableCell>{item.current_price}</TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={() => handleAddToWatchlist(item.id)}
                    className="h-10 w-10"
                    variant="outline"
                    size="icon"
                  >
                    <BookmarkFilledIcon className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </div>
  );
};

export default Watchlist;

// import { useEffect, useState } from "react";
// //import { addItemToWatchlist, getUserWatchlist, removeItemFromWatchlist } from "@/Redux/Watchlist/Action";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { BookmarkFilledIcon, TrashIcon } from "@radix-ui/react-icons";

// const Watchlist = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     dispatch(getUserWatchlist());
//   }, []);

//   // Dummy Watchlist Data
//   const dummyWatchlist = [
//     {
//       id: "bitcoin",
//       name: "Bitcoin",
//       symbol: "BTC",
//       total_volume: "34,567,891,123",
//       market_cap: "642,487,123,456",
//       market_cap_change_percentage_24h: 1.5,
//       current_price: "$34,000",
//       image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
//     },
//     {
//       id: "ethereum",
//       name: "Ethereum",
//       symbol: "ETH",
//       total_volume: "23,123,456,789",
//       market_cap: "235,123,456,789",
//       market_cap_change_percentage_24h: -2.3,
//       current_price: "$2,400",
//       image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
//     },
//     {
//       id: "binance-coin",
//       name: "Binance Coin",
//       symbol: "BNB",
//       total_volume: "7,654,321,987",
//       market_cap: "47,123,456,789",
//       market_cap_change_percentage_24h: 0.5,
//       current_price: "$500",
//       image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
//     },
//   ];

//   useEffect(() => {
//     setWatchlist(dummyWatchlist); // Initially set dummy data
//   }, []);

//   const handleRemoveFromWatchlist = (id) => {
//     // Simulating removal from the state
//     setWatchlist((prevWatchlist) => prevWatchlist.filter((coin) => coin.id !== id));

//     // Dispatch an action to remove from Redux store if needed
//     dispatch(removeItemFromWatchlist(id));
//   };

//   return (
//     <div className="pt-8 lg:px-10">
//       <div className="flex items-center pt-5 pb-10 gap-5">
//         <BookmarkFilledIcon className="h-10 w-10" />
//         <h1 className="text-4xl font-semibold">Watchlist</h1>
//       </div>

//       <Table className="px-5 lg:px-20 border-t relative border-x border-b p-10">
//         <ScrollArea>
//           <TableHeader>
//             <TableRow className="sticky top-0 left-0 right-0 bg-background">
//               <TableHead className="py-4">Coin</TableHead>
//               <TableHead>SYMBOL</TableHead>
//               <TableHead>VOLUME</TableHead>
//               <TableHead>MARKET CAP</TableHead>
//               <TableHead>24H</TableHead>
//               <TableHead className="">PRICE</TableHead>
//               <TableHead className="text-right text-red-700">Remove</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {watchlist.length > 0 ? (
//               watchlist.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell
//                     onClick={() => navigate(`/market/${item.id}`)}
//                     className="font-medium flex items-center gap-2 cursor-pointer"
//                   >
//                     <Avatar className="-z-50">
//                       <AvatarImage src={item.image} alt={item.symbol} />
//                     </Avatar>
//                     <span>{item.name}</span>
//                   </TableCell>
//                   <TableCell>{item.symbol.toUpperCase()}</TableCell>
//                   <TableCell>{item.total_volume}</TableCell>
//                   <TableCell>{item.market_cap}</TableCell>
//                   <TableCell
//                     className={`${
//                       item.market_cap_change_percentage_24h < 0 ? "text-red-600" : "text-green-600"
//                     }`}
//                   >
//                     {item.market_cap_change_percentage_24h}%
//                   </TableCell>
//                   <TableCell>{item.current_price}</TableCell>

//                   <TableCell className="text-right">
//                     <Button
//                       onClick={() => handleRemoveFromWatchlist(item.id)}
//                       className="h-10 w-10 text-red-500"
//                       variant="outline"
//                       size="icon"
//                     >
//                       <TrashIcon className="h-6 w-6" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan="7" className="text-center">
//                   No items in your watchlist.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </ScrollArea>
//       </Table>
//     </div>
//   );
// };

// export default Watchlist;
