import { Button } from "@/components/ui/button"
import "./Auth.css"
import { useLocation, useNavigation } from "react-router-dom";
import ForgotPasswordForm from "./SigninForm";
import SigninForm from "./SignuinForm";
import SignupForm from "./SignupForm";

const Auth = () => {
    const navigate=useNavigate()
    return(
        <div className='h-screen relative authContainer'>
            <div className='absolute top-0 right-0  left-0 bottom-0 bg-[#030712] bg-opacity-50'>
                <div classame='bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2-translate-y-1/2 flex-col justify-centre items-centre h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2x1 shadow-white'>
                <h1 className="text-6x1 font-bold pb-9">WealthWise</h1>

                <section>
                    <SignupForm/>
                    <div className="flex items-centre justify-centre">
                      <span>Have a Account?</span>
                      <Button onClick={()=>navigate("/signin")}variant="ghost">

                      </Button>
                    </div>
                </section>
                </div>
            </div>
        </div>
    )
}

export default Auth
