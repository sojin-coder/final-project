import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Mail,
  ShoppingBag,
  ChevronLeft,
  Truck,
  Smartphone,
  Plus,
  Minus,
  Trash2,
  CirclePlus,
} from 'lucide-react';

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsFromMenu = location.state?.cartItems || [];
  
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  // Load orders from cart items or localStorage
  useEffect(() => {
    if (cartItemsFromMenu.length > 0) {
      // Convert cart items to orders format
      const initialOrders = cartItemsFromMenu.map(item => ({
        product: {
          id: item.id,
          title: item.name,
          price: `$${item.price}`,
          image: item.image,
          likes: item.likes
        },
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        tax: (item.price * item.quantity) * 0.1,
        total: (item.price * item.quantity) * 1.1,
      }));
      setOrders(initialOrders);
      // Save to localStorage
      localStorage.setItem('checkoutOrders', JSON.stringify(initialOrders));
    } else {
      // Load from localStorage if no cart items
      const savedOrders = localStorage.getItem('checkoutOrders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, [cartItemsFromMenu]);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('checkoutOrders', JSON.stringify(orders));
    }
  }, [orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (type, orderIndex) => {
    const updatedOrders = [...orders];
    if (type === 'increase') {
      updatedOrders[orderIndex].quantity += 1;
    } else if (type === 'decrease' && updatedOrders[orderIndex].quantity > 1) {
      updatedOrders[orderIndex].quantity -= 1;
    }
    
    // Recalculate totals for the updated order
    const priceValue = parseFloat(updatedOrders[orderIndex].product.price.replace('$', ''));
    updatedOrders[orderIndex].subtotal = priceValue * updatedOrders[orderIndex].quantity;
    updatedOrders[orderIndex].tax = updatedOrders[orderIndex].subtotal * 0.1;
    updatedOrders[orderIndex].total = updatedOrders[orderIndex].subtotal + updatedOrders[orderIndex].tax;
    
    setOrders(updatedOrders);
  };

  const handleRemoveOrder = (orderIndex) => {
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
  };

  const handleAddMoreItems = () => {
    navigate('/menu');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (orders.length === 0) {
      alert('Please order food in advance.!');
      return;
    }
    
    // Calculate overall totals
    const overallSubtotal = orders.reduce((sum, order) => {
      const priceValue = parseFloat(order.product.price.replace('$', ''));
      return sum + (priceValue * order.quantity);
    }, 0);
    
    const overallTax = overallSubtotal * 0.1;
    const overallTotal = overallSubtotal + overallTax;
    
    const orderData = {
      orders: orders,
      subtotal: overallSubtotal,
      tax: overallTax,
      total: overallTotal,
      paymentMethod,
      customerInfo: formData,
      orderDate: new Date().toISOString()
    };
    
    console.log('Processing payment...', orderData);
    
    // Clear orders after successful payment
    setOrders([]);
    localStorage.removeItem('checkoutOrders');
    localStorage.removeItem('cartItems');
    
    alert(`Successfully ordered! Total: $${overallTotal.toFixed(2)}`);
    navigate('/order-success', { state: { orderData } });
  };

  // Calculate overall totals
  const overallSubtotal = orders.reduce((sum, order) => {
    const orderPrice = parseFloat(order.product.price.replace('$', ''));
    return sum + (orderPrice * order.quantity);
  }, 0);
  
  const overallTax = overallSubtotal * 0.1;
  const overallTotal = overallSubtotal + overallTax;

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No items in the basket!</h2>
          <p className="text-gray-600 mb-8">Please select a dish to order.</p>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-800 transition-all inline-flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <ChevronLeft size={24} className="text-amber-700" />
            </button>
            <h1 className="text-4xl font-bold text-gray-800">Confirm order</h1>
          </div>
          <button
            onClick={handleAddMoreItems}
            className="bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition-all flex items-center gap-2"
          >
            <CirclePlus size={20} />
            Add more menu        
             </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* All Orders */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ShoppingBag size={24} className="text-amber-700" />
                Ordered menu ({orders.length} items)
              </h2>
              
              <div className="space-y-4">
                {orders.map((order, index) => {
                  const orderPrice = parseFloat(order.product.price.replace('$', ''));
                  return (
                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                      <img 
                        src={order.product.image} 
                        alt={order.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{order.product.title}</h3>
                        <p className="text-amber-700 font-bold">${orderPrice.toFixed(2)}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange('decrease', index)}
                          disabled={order.quantity <= 1}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            order.quantity <= 1 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          <Minus size={18} />
                        </button>
                        
                        <span className="w-12 text-center font-bold text-xl">{order.quantity}</span>
                        
                        <button
                          onClick={() => handleQuantityChange('increase', index)}
                          className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all flex items-center justify-center"
                        >
                          <Plus size={18} />
                        </button>
                        
                        <button
                          onClick={() => handleRemoveOrder(index)}
                          className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all flex items-center justify-center ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[120px]">
                        <p className="font-bold text-gray-800 text-lg">
                          ${(orderPrice * order.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">សរុបរង</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <User size={24} className="text-amber-700" />
                Contact information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} /> Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="012 345 678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> City / Province
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    required
                  >
                    <option value="">Select city/province</option>
                    <option value="Phnom Penh">Phnom Penh</option>
                    <option value="Siem Reap">Siem Reap</option>
                    <option value="Battambang">Battambang</option>
                    <option value="Sihanoukville">Sihanoukville</option>
                    <option value="Kampot">Kampot</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Truck size={16} /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="phteahlekh,  phlauv,  sangkeat"
                  required
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-amber-700" />
                Payment method
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-amber-700 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <CreditCard size={32} className={paymentMethod === 'card' ? 'text-amber-700' : 'text-gray-500'} />
                  <span className="text-sm font-medium">Credit card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('khqr')}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'khqr' 
                      ? 'border-amber-700 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Smartphone size={32} className={paymentMethod === 'khqr' ? 'text-amber-700' : 'text-gray-500'} />
                  <span className="text-sm font-medium">KHQR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === 'cash' 
                      ? 'border-amber-700 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Truck size={32} className={paymentMethod === 'cash' ? 'text-amber-700' : 'text-gray-500'} />
                  <span className="text-sm font-medium">Payment upon receipt</span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CreditCard size={16} /> Card number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar size={16} /> Deadline
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock size={16} /> CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        placeholder="123"
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name on card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="JOHN DOE"
                    />
                  </div>
                </div>
              )}

              {/* KHQR Payment */}
              {paymentMethod === 'khqr' && (
                <div className="text-center p-8 bg-amber-50 rounded-2xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KHQR://payment?amount=${overallTotal.toFixed(2)}`} 
                    alt="KHQR Code"
                    className="w-48 h-48 mx-auto mb-4"
                  />
                  <p className="text-gray-700 mb-2">Scan with your banking app</p>
                  <p className="text-sm text-gray-500">Amount: ${overallTotal.toFixed(2)}</p>
                </div>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === 'cash' && (
                <div className="p-8 bg-amber-50 rounded-2xl text-center">
                  <Truck size={48} className="mx-auto text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Payment upon receipt</h3>
                  <p className="text-gray-600">Please prepare the money properly.</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {orders.map((order, index) => {
                  const orderPrice = parseFloat(order.product.price.replace('$', ''));
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="truncate">{order.product.title} x{order.quantity}</span>
                      <span className="font-semibold">${(orderPrice * order.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-4 mb-6 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>total</span>
                  <span>${overallSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${overallTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping cost</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl">
                    <span>total amount</span>
                    <span className="text-amber-700">${overallTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={orders.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
                  orders.length > 0 
                    ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Lock size={20} />
                Confirm payment (${overallTotal.toFixed(2)})
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming payment, you agree to the terms of use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;