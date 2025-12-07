import React, { useState } from 'react';
import { ViewState, Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ChatWidget } from './components/ChatWidget';
import { CheckCircle, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setCurrentView('checkout');
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
      setCart([]);
  };

  // Helper to calculate totals for checkout
  const calculateTotal = () => {
      const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return sub + (sub > 0 ? 30000 : 0);
  };

  // Render Views
  const renderView = () => {
    switch(currentView) {
      case 'home':
        return (
            <>
                <Hero onShopNow={() => setCurrentView('products')} />
                <div className="bg-gray-50 py-12">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Về Chúng Tôi</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Chất Lượng Tạo Nên Uy Tín
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            BaloViet chuyên cung cấp các dòng balo chính hãng, thiết kế tối ưu cho công thái học của người Việt. 
                            Dù bạn là sinh viên năng động hay nhân viên văn phòng chuyên nghiệp, chúng tôi đều có giải pháp cho bạn.
                        </p>
                   </div>
                </div>
                <ProductList addToCart={addToCart} buyNow={handleBuyNow} />
            </>
        );
      case 'products':
        return <ProductList addToCart={addToCart} buyNow={handleBuyNow} />;
      case 'cart':
        return (
            <Cart 
                items={cart} 
                updateQuantity={updateQuantity} 
                removeItem={removeFromCart} 
                onCheckout={() => setCurrentView('checkout')}
                onContinueShopping={() => setCurrentView('products')}
            />
        );
      case 'checkout':
        return (
            <Checkout 
                totalAmount={calculateTotal()}
                onSuccess={() => {
                    clearCart();
                    setCurrentView('success');
                }}
                onBack={() => setCurrentView('cart')}
            />
        );
      case 'success':
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Đặt hàng thành công!</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Cảm ơn bạn đã tin tưởng BaloViet. Đơn hàng của bạn đang được xử lý và sẽ giao đến trong thời gian sớm nhất.
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={() => setCurrentView('home')}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Về trang chủ <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
      default:
        return <Hero onShopNow={() => setCurrentView('products')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        setView={setCurrentView}
        currentView={currentView}
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>&copy; 2024 BaloViet. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Địa chỉ: 123 Đường Công Nghệ, Quận 1, TP.HCM</p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatWidget />
    </div>
  );
};

export default App;