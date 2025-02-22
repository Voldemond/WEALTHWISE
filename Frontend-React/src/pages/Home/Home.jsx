/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
} from "@/Redux/Coin/Action";
import fetchData from "./fetchMarketData"; // Import fetch function
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { MessageCircle } from "lucide-react";
import { sendMessage } from "@/Redux/Chat/Action";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import select UI

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [marketData, setMarketData] = useState(null); 
  const [globalData, setGlobalData] = useState(null); 
  const { coin, chatBot, auth, portfolio } = useSelector((store) => store); 
  const chatContainerRef = useRef(null);

  // Fetch coin list on page and category change
  useEffect(() => {
    console.log("Fetching coins data from API...");

    const fetchCoinData = async () => {
      try {
        const response = await fetch(`http://localhost:5153/api/Coin`);
        const data = await response.json();
        if (category === "all") {
          dispatch(fetchCoinList(data)); 
        } else if (category === "top50") {
          dispatch(fetchCoinList(data));  
        }
        console.log("Fetched Coin Data:", data);  
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [page, category]); 

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: "bitcoin", jwt: auth.jwt || localStorage.getItem("jwt") }));
  }, []);

  useEffect(() => {
    if (category === "top50") {
      dispatch(fetchCoinList());
    } else if (category === "trading") {
      dispatch(fetchTreadingCoinList());
    }
  }, [category]);

  useEffect(() => {
    console.log("1");
    const getMarketData = async () => {
      console.log("inside market data request");
      const data = await fetchData("TIME_SERIES_DAILY", "BTCUSD");
      console.log("2");
      if (data) {
        console.log("Market Data:", data);
        setMarketData(data); 
      }
    };
    getMarketData();
  }, []);

  useEffect(() => {
    const fetchGlobalMarketData = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      const data = await response.json();
      if (data) {
        setGlobalData(data);
      }
    };
    fetchGlobalMarketData();
  }, []);

  // Handle trading actions
  const handleTradeAction = (action, coin) => {
    if (action === "buy") {
      dispatch({
        type: "BUY_ASSET",
        payload: {
          id: coin.id,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          quantity: 1, 
        },
      });
    } else if (action === "sell") {
      dispatch({
        type: "SELL_ASSET",
        payload: {
          id: coin.id,
        },
      });
    } else {
      console.log(`Watchlist action selected for ${coin.name}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(sendMessage({ prompt: inputValue, jwt: auth.jwt || localStorage.getItem("jwt") }));
      setInputValue("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  if (coin.loading) return <SpinnerBackdrop />;

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[70%] border-r">
          <div className="p-3 flex items-center gap-4 ">
            <Button variant={category === "all" ? "default" : "outline"} onClick={() => setCategory("all")} className="rounded-full">
              All
            </Button>
            <Button variant={category === "top50" ? "default" : "outline"} onClick={() => setCategory("top50")} className="rounded-full">
              Top 50
            </Button>
          </div>

          <AssetTable category={category} coins={category === "all" ? coin.coinList : coin.top50} handleTradeAction={handleTradeAction} />

          {category === "all" && (
            <Pagination className="border-t py-3">
              <PaginationContent>
                <PaginationItem>
                  <Button variant="ghost" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </Button>
                </PaginationItem>
                {[1, 2, 3].map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink onClick={() => setPage(num)} isActive={page === num}>
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="cursor-pointer" onClick={() => setPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        <div className="hidden lg:block lg:w-[30%] p-5">
          <StockChart coinId="bitcoin" />
          <div className="flex gap-5 items-center">
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image?.large} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
                <p className="text-gray-400">{coin.coinDetails?.name}</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">${coin.coinDetails?.market_data?.current_price?.usd}</p>
              </div>
            </div>
          </div>

          {/* Global Market Data */}
          {globalData && (
            <div className="mt-5">
              <h2 className="text-lg font-bold">Global Market Overview</h2>
              <div className="mt-3">
                <p>Total Market Cap: ${globalData.data.total_market_cap?.usd}</p>
                <p>Total 24h Volume: ${globalData.data.total_volume?.usd}</p>
                <p>Market Cap Change (24h): {globalData.data.market_cap_change_percentage_24h_usd}%</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        <Button onClick={() => setIsBotRelease(!isBotRelease)} className="w-full h-[3rem] gap-2">
          <MessageCircle size={30} />
          Chat Bot
        </Button>
      </section>
    </div>
  );
};

export default Home;
