import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AssetTable({ coins, category, handleTradeAction, currentUser }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [action, setAction] = useState(""); // "buy" or "sell"
  const navigate = useNavigate();

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleBuyClick = (coin) => {
    setAction("buy");
    setSelectedCoin(coin);
  };

  const handleSellClick = (coin) => {
    setAction("sell");
    setSelectedCoin(coin);
  };

  const handleConfirmAction = () => {
    handleTradeAction(action, selectedCoin, quantity, currentUser);
    setSelectedCoin(null); // Close modal after trade
    setAction("");
    setQuantity(1);
  };

  return (
    <Table className="px-5 border-t relative">
      <ScrollArea className={category === "all" ? "h-[74vh]" : "h-[82vh]"}>
        <TableHeader>
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            <TableHead className="py-4">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coins && coins.length > 0 ? (
            coins.map((item) => (
              <TableRow className="cursor-pointer" key={item.id}>
                <TableCell
                  className="font-medium flex items-center gap-2"
                  onClick={() => navigate(`/market/${item.id}`)}
                >
                  <Avatar className="-z-50">
                    <AvatarImage src={item.image || "default-image.png"} alt={item.symbol} />
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.marketCap}</TableCell>
                <TableCell className={item.change24h < 0 ? "text-red-600" : "text-green-600"}>
                  {item.change24h}%
                </TableCell>
                <TableCell className="text-right">${item.price}</TableCell>

                <TableCell className="text-right">
                  <Button variant="outline" className="mr-2" onClick={() => handleBuyClick(item)}>Buy</Button>
                  <Button variant="outline" className="mr-2" onClick={() => handleSellClick(item)}>Sell</Button>
                  <Button 
  variant="outline" 
  onClick={() => handleTradeAction("watchlist", item)}>
  Watchlist
</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ScrollArea>

      {/* Buy/Sell Quantity Modal */}
{selectedCoin && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md w-96 shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">
        {action === "buy" ? `Buy ${selectedCoin.name}` : `Sell ${selectedCoin.name}`}
      </h2>

      <div className="flex flex-col items-center gap-4">
        {/* Quantity Input with Buttons */}
        <div className="flex items-center gap-3">
          <Button onClick={handleDecreaseQuantity} disabled={quantity <= 1}>-</Button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-20 text-center border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleIncreaseQuantity}>+</Button>
        </div>

        {/* Total Price */}
        <p className="text-center text-lg font-semibold">
          Total: ${(selectedCoin.price * quantity).toFixed(2)}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between w-full">
          <Button className="flex-1 mx-1" onClick={handleConfirmAction}>
            Confirm {action}
          </Button>
          <Button className="flex-1 mx-1" variant="outline" onClick={() => setSelectedCoin(null)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
)}

    </Table>
  );
}
