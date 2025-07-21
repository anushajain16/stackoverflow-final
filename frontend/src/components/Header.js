import { useNavigate } from 'react-router-dom';
import SearchView from '../ui/SearchView';
import Button from '../ui/Button';
import image1 from '../images/img_header_logo.svg'
import image2 from '../images/img_arrowright.svg'
import { useState } from 'react';
import { useEffect } from 'react';
const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);


  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("orgId");
  }

  return (
    <header className="bg-global-2 border-b border-primary  sm:px-5  sm:py-5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src={image1}
            alt="Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>

        {/* Search - Full width on mobile, 48% on larger screens */}
        <div className="w-full sm:w-full md:w-[48%] order-3 sm:order-2">
          <SearchView
            placeholder="Search"
            onSearch={handleSearch}
            className="w-full"
          />
        </div>

        {/* Auth Buttons */}
        {!isLogin ?(
        <div className="flex gap-2 sm:gap-2 order-2 sm:order-3 flex-shrink-0">
          <Button
            onClick={handleSignIn}
            variant="secondary"
            size="small"
            rightIcon={image2}
            className="text-xs sm:text-sm"
          >
            Sign in
          </Button>
          <Button
            onClick={handleRegister}
            variant="primary"
            size="small"
            className="text-xs sm:text-sm"
          >
            Register
          </Button>
        </div>):(
          <div className="flex gap-2 sm:gap-2 order-2 sm:order-3 flex-shrink-0 mr-5">
          <Button
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
            variant='primary'
            size="small"
            className='text-xs sm:text-sm'
          >
            Logout
          </Button>
          </div>

        )}
      </div>
        
    </header>
  );
};

export default Header;