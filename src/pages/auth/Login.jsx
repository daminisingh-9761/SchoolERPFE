import Input from "/src/components/common/Input";
import Button from "/src/components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const[email,setEmail] = useState(""); 
  
  const[password,setPassword]= useState("");
  const navigate = useNavigate();
  
function handlelogin(){
  console.log("Login button clicked");
  console.log(email);
  console.log(password);
   if (email && password) {
    navigate("/dashboard");
    } else {
      alert("Please fill all fields");

    }
  }


 return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">

      {/* Main Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
        {/* Right Section */}
        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Please login to continue
          </p>

          {/* Form */}
          <div className="space-y-6">

            {/* Email */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>


              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e)=> setPassword(e.target.value)}
    
              />

            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">

              <div className="flex items-center gap-2">

                <input type="checkbox" />

                <span>
                  Remember Me
                </span>

              </div>

              <button className="text-blue-600 hover:underline">
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <Button
              text="Login"
               className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
              onClick={handlelogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;