import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopBar() {
  return (
    <div className="bg-gray-900 text-white text-sm py-1 text-center">
      🚚 滿 2000 元免運費！限時優惠中～
    </div>
  );
}

function Logo() {
  return <div className="font-extrabold text-2xl text-blue-900">nuGen</div>;
}

function SearchBar() {
  return (
    <form className="flex-1 mx-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="搜尋商品..."
        className="w-full px-3 py-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}

function UserIcons() {
  return (
    <div className="flex space-x-6 text-xl cursor-pointer">
      <Link to="/auth" title="會員登入" className="hover:text-blue-600">
        👤
      </Link>
      <span title="購物車">🛒</span>
    </div>
  );
}

function SideDrawer({ isOpen, onClose, menuItems }) {
  const location = useLocation();

  return (
    <>
      {/* 遮罩 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 側邊欄 */}
      <aside
        className={`top 64px fixed left-0 w-64 text-black border border-white
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{height: "calc(100vh - 64px)" }}
      >
        
        <ul className="flex flex-col mt-4">
          {menuItems.map((item) => (
            <li key={item.path} onClick={onClose}>
              <Link
                to={item.path}
                className={`block px-5 py-3 border-b hover:bg-pink-200 hover:underline transition-colors duration-300" ${
                  location.pathname === item.path
                    ? "border-l-4 border-white bg-pink-800 font-bold"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "所有商品", path: "/products" },
    { name: "品牌故事", path: "/about" },
    { name: "聯絡我們", path: "/contact" },
  ];

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-12">
          {/* 漢堡按鈕 */}
          <button
            className="text-black lg:hidden focus:outline-none"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? "關閉選單" : "開啟選單"}
          >
            {drawerOpen ? (
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* 桌面選單 */}
          <ul className=" hidden lg:flex space-x-6 text-black ">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative flex justify-center items-centerpy-4 px-6 hover:text-pink-200 hover:underline transition-colors duration-300 ${
                    location.pathname === item.path ? "underline" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 手機側邊選單 */}
        <SideDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          menuItems={menuItems}
        />
      </div>
    </nav>
  );
}

export default function Header() {
  return (
    <header>
      <TopBar />
      <div className="flex items-center max-w-7xl mx-auto py-3 px-5">
        <Logo />
        <SearchBar />
        <UserIcons />
      </div>
      <NavBar />
    </header>
  );
}
