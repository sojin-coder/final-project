// import React from 'react';
// import { CheckCircle, Coffee, ArrowLeft, Download } from 'lucide-react';

// const OrderSuccess = () => {
//   const orderNumber = "#CF-82910";
  
//   return (
//     <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
        
//         {/* Success Header */}
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//             <CheckCircle className="h-10 w-10 text-green-600" />
//           </div>
//           <h2 className="text-3xl font-bold text-stone-900">Brewing Success!</h2>
//           <p className="mt-2 text-stone-500">
//             Your caffeine fix is being prepared. We'll notify you when it's ready for pickup.
//           </p>
//         </div>

//         {/* Order Details Card */}
//         <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
//           <div className="flex justify-between items-center mb-4 pb-4 border-bold border-b border-stone-200">
//             <span className="text-sm font-medium text-stone-500">Order Number</span>
//             <span className="text-sm font-bold text-stone-900">{orderNumber}</span>
//           </div>
          
//           <div className="space-y-3">
//             <div className="flex justify-between text-sm">
//               <span className="text-stone-600">1x Oat Milk Latte (Large)</span>
//               <span className="font-medium text-stone-900">$5.50</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-stone-600">1x Butter Croissant</span>
//               <span className="font-medium text-stone-900">$3.75</span>
//             </div>
//             <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-stone-900">
//               <span>Total Paid</span>
//               <span>$9.25</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col space-y-3">
//           <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-orange-700 hover:bg-orange-800 transition-colors shadow-sm">
//             Track My Order
//           </button>
          
//           <div className="flex space-x-3">
//             <button className="flex-1 flex items-center justify-center px-4 py-3 border border-stone-200 text-sm font-medium rounded-xl text-stone-700 bg-white hover:bg-stone-50 transition-colors">
//               <Download className="w-4 h-4 mr-2" /> Receipt
//             </button>
//             <button className="flex-1 flex items-center justify-center px-4 py-3 border border-stone-200 text-sm font-medium rounded-xl text-stone-700 bg-white hover:bg-stone-50 transition-colors">
//               <ArrowLeft className="w-4 h-4 mr-2" /> Shop More
//             </button>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center">
//           <p className="text-xs text-stone-400 flex items-center justify-center">
//             <Coffee className="w-3 h-3 mr-1" /> Estimated wait: 5-8 minutes
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShoppingBag, 
  Truck, 
  MapPin, 
  CreditCard, 
  Home,
  ChevronRight,
  Printer
} from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};

  // បើគ្មានទិន្នន័យទេ ឱ្យវាត្រឡប់ទៅទំព័រ Menu វិញ
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order data not found.</h2>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* ផ្នែកជោគជ័យ (Success Header) */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-amber-900 p-8 text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-bounce">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2">Order successful!</h1>
            <p className="opacity-90">Thank you for supporting our store. Order code៖ #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* ព័ត៌មានអតិថិជន */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                  <MapPin size={20} className="text-amber-700" /> Shipping Location
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed">
                  <p className="font-semibold text-gray-800 text-base">{orderData.customerInfo.fullName}</p>
                  <p>{orderData.customerInfo.phone}</p>
                  <p>{orderData.customerInfo.address}</p>
                  <p>{orderData.customerInfo.city}</p>
                </div>
              </div>

              {/* ព័ត៌មានការទូទាត់ */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                  <CreditCard size={20} className="text-amber-700" /> Payment
                </h3>
                <div className="text-gray-600 text-sm">
                  <p className="capitalize">Method៖ <span className="font-semibold">{orderData.paymentMethod}</span></p>
                  <p>Date៖ {new Date(orderData.orderDate).toLocaleString('kh-KH')}</p>
                  <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    Already paid
                  </div>
                </div>
              </div>
            </div>

            {/* បញ្ជីមុខម្ហូប (Order Items) */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-700" />Menu product
              </h3>
              <div className="space-y-4">
                {orderData.orders.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden">
                        <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.product.title}</p>
                        <p className="text-xs text-gray-500">Number: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-700">${(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Sub-total</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t border-dashed">
                  <span>Total All</span>
                  <span className="text-amber-700">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* ប៊ូតុងសកម្មភាព */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                <Printer size={20} /> Print invoice
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition-all shadow-lg shadow-amber-200"
              >
                <Home size={20} /> Back to home
              </button>
            </div>
          </div>
        </div>

        {/* ព័ត៌មានបន្ថែម (Tracking status placeholder) */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Truck className="text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-gray-800">Delivery in progress</p>
              <p className="text-sm text-gray-500">Your food will arrive within 20-30 minutes.</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;