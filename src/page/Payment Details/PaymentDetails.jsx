import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentDetailsForm from "./PaymentDetailsForm";

const PaymentDetails = () => {
  return (
    <div className="px-20 ">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>

      {false ? (
        <Card>
          <CardHeader>
            <CardTitle>Yes Bank</CardTitle>
            <CardDescription>A/C No : ***********1651</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder</p>
              <p className="text-gray-400"> : Gaurav</p>
            </div>

            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400"> : YESB0000001</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="py-6"> Add Payment Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="pb-5">
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;