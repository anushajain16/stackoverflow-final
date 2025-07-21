import React, { useState } from 'react';
import { Users, HelpCircle, BarChart3, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Users');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Users', icon: Users },
    { name: 'Questions', icon: HelpCircle },
    { name: 'Statistics', icon: BarChart3 }
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenuItem(menuName);

    if (menuName === 'Users'){
      navigate("/admin-home");
      setActiveMenuItem('Users')
    } 
    else if (menuName === 'Questions'){
      navigate("/admin/questions");
      setActiveMenuItem('Questions')
    } 
    else if (menuName === 'Statistics'){
      navigate("/admin/stats");
      setActiveMenuItem('Statistics')
    }
      

    console.log('Menu clicked:', menuName);
  };

  return (
    <aside className="hidden lg:block w-full lg:w-[18%] bg-global-2 border-r border-primary rounded-lg p-4 lg:p-6 sticky">
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center gap-2 p-2 rounded transition-colors duration-200 hover:bg-gray-50 ${
                  activeMenuItem === item.name ? 'bg-gray-50' : ''
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-global-2" />
                <span className="text-sm sm:text-base font-inter font-normal leading-5 text-global-2">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
