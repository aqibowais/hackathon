// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Login } from "./Login";
// import { Signup } from "./Signup";

// const LoginSignup = () => {
//   const [isSignup, setIsSignup] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
//           {isSignup ? "Sign Up" : "Log In"}
//         </h2>
//         {isSignup ? <Signup /> : <Login />}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//             <span
//               className="text-purple-600 font-medium cursor-pointer"
//               onClick={() => setIsSignup(!isSignup)}
//             >
//               {isSignup ? "Log In" : "Sign Up"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#9AC747] mb-6">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        {isSignup ? <Signup /> : <Login />}
        <div className="mt-6 text-center">
          <p className="text-black">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-[#126FB3] font-medium cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
