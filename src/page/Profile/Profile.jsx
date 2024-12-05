import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifiedIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "@/components/ui/button";
import AccountVarificationForm from "./AccountVarificationForm";

const Profile = () => {
  const handleEnableTwoStepVerification = () => {
    console.log("Two Step Verification");
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email : </p>
                  <p className="text-gray-500">gauravpatil05@gmail.com : </p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">Full Name : </p>
                  <p className="text-gray-500">Gaurav Patil </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date Of Birth : </p>
                  <p className="text-gray-500">12/06/2001 </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality : </p>
                  <p className="text-gray-500">Indian</p>
                </div>
              </div>

              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address : </p>
                  <p className="text-gray-500">jalgaon : </p>
                </div>

                <div className="flex">
                  <p className="w-[9rem]">City : </p>
                  <p className="text-gray-500"> jalgaon </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Passcode : </p>
                  <p className="text-gray-500">0564104 </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country : </p>
                  <p className="text-gray-500">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>

                {true ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon />
                    <soan>Enabled</soan>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500 text-white">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enabled Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Varify Your Account?</DialogTitle>
                    </DialogHeader>

                    <AccountVarificationForm
                      handleSubmit={handleEnableTwoStepVerification}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
