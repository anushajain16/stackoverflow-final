
import que from '../images/img_icon.svg'
//import tag from '../images/img_label.svg'

import save from '../images/img_bookmark.svg'
import account from '../images/img_user.svg'

import gen from '../images/img_icon_blue_gray_400.svg'
import gaming from '../images/img_playstation_charge1.svg'
import movie from '../images/img_video_camera.svg'
import cat from '../images/img_dashboard_4.svg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Questions');
  const [activeCategory, setActiveCategory] = useState('General');
  const navigate = useNavigate();
  const orgId = localStorage.getItem('orgId');
  const menuItems = [
    { name: 'Questions', icon: que },
    { name: 'Saves', icon:  save},
    { name: 'My Account', icon: account }
  ];

  const categories = [
    { name: 'General', icon:  gen, li:"/general"},
    { name: 'Movies', icon: movie,li:"/movies" },
    { name: 'Gaming', icon: gaming, li:"/gaming" },
    {name:'All Categories',icon: cat, li:"../categories"}
  ];

  
  const handleMenuClick = (menuName) => {
    setActiveMenuItem(menuName);
    if(menuName==='Questions'){
      navigate(`/${orgId}`)
    }
    if(menuName==='Saves'){
      navigate("/saved")
    }
    if(menuName==='My Account'){
      navigate("/myaccount")
    }
    console.log('Menu clicked:', menuName);
  };

  const handleCategoryClick = (categoryName, categoryLink) => {
    setActiveCategory(categoryName);
    if(categoryName==='All Categories'){
      navigate("/categories")
    }
    else{
      navigate(`/questions?cat=${categoryName.toUpperCase()}`);
    }
    
    console.log('Category clicked:', categoryName);
  };

  
  return (
    <aside className="hidden lg:block w-full lg:w-[18%] bg-global-2 border-r border-primary rounded-lg p-4 lg:p-6 sticky">
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Main Menu Items */}
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-200 hover:bg-gray-50 ${
                activeMenuItem === item.name ? 'bg-gray-50' : ''
              }`}
            >
              <img 
                src={item.icon} 
                alt={item.name} 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <span className="text-sm sm:text-base font-inter font-normal leading-5 text-global-2">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Categories Section */}
        <div className="flex flex-col">
          <h3 className="text-sm font-inter font-semibold leading-4 text-global-4 mb-3 ml-2">
            Categories
          </h3>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name, category.li)}
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-200 hover:bg-gray-50 ${
                activeCategory === category.name ? 'bg-gray-50' : ''
              }`}
            >
              <img 
                src={category.icon} 
                alt={category.name} 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <span className="text-sm sm:text-base font-inter font-normal leading-5 text-global-2">
                {category.name}
              </span>
            </button>
           
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;