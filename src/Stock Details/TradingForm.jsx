import { input } from "@/components/ui/input"

const TreadingForm = () => {
    const handleChnage = () => {

    }
    return(
        <div className="space-y-10 p-5">
            <div>
                <div className="flex gap-4 items-centre justify-between">
                    <Input
                    className="py-7 focus:outline-none"
                    placeholder="Enter Amount..."
                    onChange={handleChange}
                    type="number"
                    name="amount"
                    />
                    <div>
                      <p className="border text-2x1 flex justify-centre items-centre w-36 h-14 rounded-md">4563</p>  
                    </div>

                </div>
                {false && <h1 className="text-red-600 text-centre pt-4">Insufficient wallet balance to buy</h1>}
            </div>
            <div className="flex items-centre justify-between">
                <p>Order Type</p>
                <p>Market Order</p>

            </div>
            <div className="flex items-centre justify-between">
                <p>{orderType=="BUY"?"Avaliable Case":"Avaliable Quantity"}</p>
                <p>
                    {orderType=="BUY"?9000:23.08}
                    </p>


            </div>
            <div>
                <Button className={`w-full py-6 ${orderType=="SELL"?"bg-red-600 text-white":""}`}>
                  {orderType}  
                </Button>
                <Button
                variant="link"
                className="w-full mt-5 text-xl"
                 onClick={()=>setOrderType(orderType=="BUY"?"SELL":"BUY")}>
                    {orderType=="BUY"?"Or Sell":"Or Buy"}
                </Button>
            </div>


        </div>
    )
}
export default TreadingForm
