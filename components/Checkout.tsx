import React, { useState } from 'react';
import { CreditCard, Truck, QrCode } from 'lucide-react';

interface CheckoutProps {
    onSuccess: () => void;
    onBack: () => void;
    totalAmount: number;
}

export const Checkout: React.FC<CheckoutProps> = ({ onSuccess, onBack, totalAmount }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Thanh Toán Đơn Hàng</h2>
            
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-8">
                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">1. Thông tin giao hàng</h3>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nguyễn Văn A" />
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input type="tel" id="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</label>
                            <input type="text" id="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Số nhà, đường, phường/xã..." />
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">2. Phương thức thanh toán</h3>
                    <div className="space-y-4">
                        <div 
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}
                            onClick={() => setPaymentMethod('cod')}
                        >
                            <input 
                                id="cod" 
                                name="payment-method" 
                                type="radio" 
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" 
                            />
                            <label htmlFor="cod" className="ml-3 flex items-center cursor-pointer flex-1">
                                <Truck className="h-6 w-6 text-gray-500 mr-3" />
                                <span className="block text-sm font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                            </label>
                        </div>

                        <div 
                            className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}`}
                            onClick={() => setPaymentMethod('banking')}
                        >
                            <div className="flex items-center">
                                <input 
                                    id="card" 
                                    name="payment-method" 
                                    type="radio" 
                                    checked={paymentMethod === 'banking'}
                                    onChange={() => setPaymentMethod('banking')}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" 
                                />
                                <label htmlFor="card" className="ml-3 flex items-center cursor-pointer flex-1">
                                    <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                                    <span className="block text-sm font-medium text-gray-900">Chuyển khoản ngân hàng</span>
                                </label>
                            </div>
                            
                            {/* QR Code Section for Banking */}
                            {paymentMethod === 'banking' && (
                                <div className="mt-4 ml-7 bg-white p-4 rounded border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-2">Quét mã QR để thanh toán nhanh:</p>
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gray-100 p-2 rounded">
                                            <QrCode className="h-24 w-24 text-gray-800" />
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Ngân hàng: <strong>Vietcombank</strong></p>
                                            <p>Số TK: <strong>1234 5678 9999</strong></p>
                                            <p>Chủ TK: <strong>BALOVIET STORE</strong></p>
                                            <p>Nội dung: <strong>[Tên_SDT]</strong></p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-indigo-600 mt-2 italic">* Đơn hàng sẽ được xử lý sau khi nhận được thanh toán.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary & Submit */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium text-gray-900">Tổng thanh toán:</span>
                        <span className="text-2xl font-bold text-indigo-600">{totalAmount.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            type="button" 
                            onClick={onBack}
                            className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                            Quay lại giỏ hàng
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`flex-1 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Đang xử lý đơn hàng...' : `Thanh toán ${totalAmount.toLocaleString('vi-VN')} đ`}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};