import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Plus, Check, ShoppingBag } from 'lucide-react';

interface ProductListProps {
  addToCart: (product: Product) => void;
  buyNow: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ addToCart, buyNow }) => {
  const [filter, setFilter] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
        setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Sản Phẩm Mới Nhất</h2>
            
            <div className="mt-4 md:mt-0 flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            filter === cat.id 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-95 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 px-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-indigo-600">
                  {product.price.toLocaleString('vi-VN')} đ
                </p>
              </div>
              <div className="px-4 mt-2 flex-grow">
                 <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                 <div className="mt-2 flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feat, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 rounded-md px-2 py-0.5 text-xs font-medium text-gray-600">
                            {feat}
                        </span>
                    ))}
                 </div>
              </div>
              <div className="p-4 mt-4 flex gap-2">
                <button
                  onClick={() => handleAdd(product)}
                  className={`flex-1 flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                      addedIds.includes(product.id)
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {addedIds.includes(product.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" /> Đã thêm
                      </>
                  ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" /> Thêm
                      </>
                  )}
                </button>
                <button
                  onClick={() => buyNow(product)}
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};