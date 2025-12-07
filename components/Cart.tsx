import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, updateQuantity, removeItem, onCheckout, onContinueShopping }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + (subtotal > 0 ? shipping : 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 flex justify-center">
            <div className="bg-gray-100 p-6 rounded-full">
                <Trash2 className="h-12 w-12 text-gray-400" />
            </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-8">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
              {items.map((item) => (
                <li key={item.id} className="flex py-6 px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg">
                            <span className="font-medium text-gray-900 hover:text-gray-800">
                              {item.name}
                            </span>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                        <p className="mt-1 text-sm font-medium text-indigo-600">
                            {item.price.toLocaleString('vi-VN')} đ
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center border border-gray-300 rounded-md w-max">
                            <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-900 font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="absolute top-0 right-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500"
                          >
                            <span className="sr-only">Xóa</span>
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="bg-white shadow-sm rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Tóm tắt đơn hàng</h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tạm tính</dt>
                  <dd className="text-sm font-medium text-gray-900">{subtotal.toLocaleString('vi-VN')} đ</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Phí vận chuyển</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{shipping.toLocaleString('vi-VN')} đ</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Tổng cộng</dt>
                  <dd className="text-xl font-bold text-indigo-600">{total.toLocaleString('vi-VN')} đ</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={onCheckout}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Tiến hành thanh toán
                </button>
              </div>
              <div className="mt-4">
                  <button onClick={onContinueShopping} className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                      Tiếp tục mua sắm
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
