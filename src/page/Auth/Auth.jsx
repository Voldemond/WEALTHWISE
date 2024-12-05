import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="authContainer h-screen relative text-white">
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">
        <div className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 box flex flex-col justify-center items-center  h-[35rem] w-[30rem]  rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white px-10">
          <h1 className="text-6xl text-white font-bold pb-9">Wealth Wise</h1>

          {location.pathname == "/signup" ? (
            <section className="w-full">
              <SignupForm />
              <div className="flex items-center justify-center">
                <span> already have account </span>
                <Button onClick={() => navigate("/signin")} variant="ghost">
                  signin
                </Button>
              </div>
            </section>
          ) : location.pathname == "/forgot-password" ? (
            <section className="w-full">
              <ForgotPasswordForm />
              <div className="flex items-center justify-center mt-2">
                <span> back to login </span>
                <Button onClick={() => navigate("/signin")} variant="ghost">
                  signin
                </Button>
              </div>
            </section>
          ) : (
            <section className="w-full">
              <SigninForm />
              <div className="flex items-center justify-center">
                <span> {"don't already account"} </span>
                <Button onClick={() => navigate("/signup")} variant="ghost">
                  signup
                </Button>
              </div>

              <div className="mt-10">
                <Button
                  onClick={() => navigate("/forgot-password")}
                  variant="outline"
                  className="text-black w-full py-5"
                >
                  Forgot Password
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
