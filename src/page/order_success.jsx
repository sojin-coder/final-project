import React from 'react';
import { CheckCircle, Coffee, ArrowLeft, Download } from 'lucide-react';

const OrderSuccess = () => {
  const orderNumber = "#CF-82910";
  
  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
        
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900">Brewing Success!</h2>
          <p className="mt-2 text-stone-500">
            Your caffeine fix is being prepared. We'll notify you when it's ready for pickup.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
          <div className="flex justify-between items-center mb-4 pb-4 border-bold border-b border-stone-200">
            <span className="text-sm font-medium text-stone-500">Order Number</span>
            <span className="text-sm font-bold text-stone-900">{orderNumber}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">1x Oat Milk Latte (Large)</span>
              <span className="font-medium text-stone-900">$5.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">1x Butter Croissant</span>
              <span className="font-medium text-stone-900">$3.75</span>
            </div>
            <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-stone-900">
              <span>Total Paid</span>
              <span>$9.25</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-orange-700 hover:bg-orange-800 transition-colors shadow-sm">
            Track My Order
          </button>
          
          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center px-4 py-3 border border-stone-200 text-sm font-medium rounded-xl text-stone-700 bg-white hover:bg-stone-50 transition-colors">
              <Download className="w-4 h-4 mr-2" /> Receipt
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-3 border border-stone-200 text-sm font-medium rounded-xl text-stone-700 bg-white hover:bg-stone-50 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Shop More
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-xs text-stone-400 flex items-center justify-center">
            <Coffee className="w-3 h-3 mr-1" /> Estimated wait: 5-8 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;