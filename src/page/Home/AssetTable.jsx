import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
  const navigate=useNavigate()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Coin</TableHead>
          <TableHead>SYMBOL</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>MARKET CAP</TableHead>
          <TableHead>24H</TableHead>
          <TableHead className="text-right">PRICE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {[1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item,index)=> <TableRow key ={index}>

          <TableCell  onClick={()=>navigate(`/market/bitcoin`)} className="font-medium flex items-center gap-2">
         <Avatar className="-z-50">
         <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />

         </Avatar>
         <span>Bitcoin</span>
          </TableCell>
          <TableCell>BTC </TableCell>
          <TableCell> 85243176885</TableCell>
          <TableCell> 1891787977486</TableCell>
          <TableCell> 2109.1</TableCell>
          
          <TableCell className="text-right">$95596</TableCell>
        </TableRow>)}
       
      </TableBody>
    </Table>
  );
};

export default AssetTable;
