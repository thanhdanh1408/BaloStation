import React from 'react';
import { ShoppingCart, Menu, Backpack } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, setView, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <Backpack className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">BaloViet</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setView('home')} 
              className={`${currentView === 'home' ? 'text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => setView('products')} 
              className={`${currentView === 'products' ? 'text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Sản Phẩm
            </button>
            <button className="text-gray-500 hover:text-gray-900">Giới Thiệu</button>
          </div>

          <div className="flex items-center">
            <button 
              className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
              onClick={() => setView('cart')}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="md:hidden ml-4">
               <Menu className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
