import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-black ">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
        
        {/* 品牌區塊 */}
        <div>
          <div className="text-2xl font-extrabold text-blue-400 mb-2">nuGen</div>
          <p className="text-sm text-gray-400">美麗新生活，從 nuGen 開始。</p>
        </div>

        {/* 導覽連結 */}
        <div>
          <h4 className="font- mb-3">網站導覽</h4>
          <ul className="space-y-2 text-sm text-black">
            <li><Link to="/" className="hover:text-pink-200">首頁</Link></li>
            <li><Link to="/products" className="hover:text-pink-200">所有商品</Link></li>
            <li><Link to="/about" className="hover:text-pink-200">品牌故事</Link></li>
            <li><Link to="/contact" className="hover:text-pink-200">聯絡我們</Link></li>
          </ul>
        </div>

        {/* 聯絡資訊 */}
        <div>
          <h4 className="font-bold mb-3">聯絡資訊</h4>
          <ul className="space-y-2 text-sm text-black">
            <li>Email: a0923236134@gmail.com</li>
            <li>電話: 0800-123-456</li>
            <li>地址: 新北市三重區 長元街 100-1 號</li>
          </ul>
        </div>

        {/* 社群連結 */}
        <div>
          <h4 className="font-bold mb-3">追蹤我們</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">📘</a>
            <a href="#" className="hover:text-pink-400">📸</a>
            <a href="#" className="hover:text-sky-400">🐦</a>
          </div>
        </div>
      </div>

      {/* 版權資訊 */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 WildBoy. All rights reserved.
      </div>
    </footer>
  );
}
