"use client";

import { useRouter } from "next/navigation";
import Button from "@/Components/Button";
import { useAuth } from "@/Context/AuthContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});


function LandingPage() {
  const { token } = useAuth()
  const router = useRouter();
  const handleStart = () => {
    // console.log(navigator.mediaDevices.getDisplayMedia())
    if (!navigator.mediaDevices?.getDisplayMedia) {
      alert("Screen sharing is not supported in this browser.");
      return;
    }
    router.push("/screentest");
  };

  return (
    <div className={`${poppins.variable}`}>

      <main className="min-h-screen flex flex-col items-center justify-center gap-6">
        {/* <h1 className="text-3xl font-bold">Screen Share Test App</h1> */}
        <div className='w-[500px] sm:w-full md:w-full lg:w-full'>
            <div className=" w-full hero bg-base-200 min-h-screen">
              <div className=" md:flex justify-center gap-20 mt-20">
                <div>
                <img
                  src='../imgs/screenshareimg1.jpeg'
                  className="  md:w-[500px]"
                  />
                  </div>
                <div className="w-[500px] mt-10 md:mt-0 text-center md:text-start">
                  <h1 className="text-5xl font-bold"><span className='text-blue-500'>O</span>verview <span className='text-blue-500'>O</span>f <span className='text-blue-500'>S</span>creenSharing <span className='text-blue-500'>T</span>echnology</h1>
                  <p className=" text-[18px] p-10 md:p-0 mt-10 md:mt-5">
                   Screen sharing is a feature that allows a user to display their device screen to others in real time over the internet. It is commonly used in online meetings, presentations, remote support, and collaborative work.
                  </p>
                </div>
              </div>
               {token ? <div className="flex justify-center mt-10 mb-4"><Button onClick={handleStart} >
          Start Screen Test
        </Button></div> : <span className="flex justify-center mt-10 text-blue-500 text-[20px] font-semibold">Login to start Screen test</span>}
            </div>
          <div >
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage