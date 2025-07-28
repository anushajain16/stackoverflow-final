import React from 'react';
import Header from '../components/Header'
import Sidebar from '../components/SideBar';
import Button from '../ui/Button';
import arrow from "../images/img_arrowright.svg"
import { useNavigate } from 'react-router-dom';
const Welcome = () => {
  const name = localStorage.getItem('name');
    const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full bg-global-2">
      <Header /> {/* Navbar */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 lg:py-6 ">
        {/* Sidebar */}
        <Sidebar className="fixed top-0 left-0 h-screen w-64 bg-white shadow z-50"/>

        {/* Questions Content */}
        <main className="flex-1 bg-global-2">
            <h1 className="text-lg sm:text-xl font-inter font-medium text-global-1">
                Welcome to StackOverflow Clone!
            </h1>
            <br></br>
            <div className="welcome-container">
                <p>This platform helps you ask, answer, and explore questions in various domains.</p>
                <p><strong>Please sign in or register to continue.</strong></p>
            </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[20%] flex flex-col gap-6 lg:gap-8">
          {/* Welcome Card */}
          <div className="border border-primary rounded-md bg-global-2">
            <div className="p-2 sm:p-4">
              {localStorage.getItem("token") ? (
                <>
                <p className="text-sm sm:text-base font-inter font-normal text-global-2 mb-2 sm:mb-4">
                
                  Hello, <span className="font-semibold">{name.charAt(0).toUpperCase()+name.slice(1)}</span> 
                </p>
                <Button
                      variant="primary"
                      size="small"
                      className="text-m sm:text-sm pl-14 pr-14 ml-3"
                      onClick={() => navigate("../ask")}
                    >
                      Ask Question
                    </Button>
                  </>
              ) : (
                <>
                  <p className="text-sm sm:text-base font-inter font-normal text-global-2 mb-4 sm:mb-6">
                    Welcome!!<br />
                    To continue with the open-source Q&A platform software
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      variant="primary"
                      size="small"
                      className="text-xs sm:text-sm"
                      onClick={() => navigate("/signup")}
                    >
                      Register
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      rightIcon={arrow}
                      className="text-xs sm:text-sm"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>


          {/* FAQ Section */}
          <div className="border border-primary rounded-lg bg-global-2">
            <div className="p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-inter font-semibold  text-global-4 mb-4 sm:mb-6">
                Frequently Asked Questions
              </h3>
              <Button
                variant="primary"
                size="small"
                className="text-m sm:text-sm pl-14 pr-14 ml-3"
                onClick={()=>navigate("/FAQ")}
              >
                Have a Look
              </Button>
              
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Welcome;