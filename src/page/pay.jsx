import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Trash2
} from 'lucide-react';

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state?.product;
  
  const [quantity, setQuantity] = useState(initialProduct?.quantity || 1);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment here
    const orderData = {
      product: initialProduct,
      quantity: quantity,
      subtotal: priceValue * quantity,
      tax: (priceValue * quantity) * 0.1,
      total: (priceValue * quantity) * 1.1,
      paymentMethod,
      customerInfo: formData
    };
    console.log('Processing payment...', orderData);
    // Navigate to success page or show confirmation
    alert(`Payment processed successfully! Total: $${orderData.total.toFixed(2)}`);
  };

  // Format price to number for calculations
  const priceValue = initialProduct?.price ? parseFloat(initialProduct.price.replace('$', '')) : 0;
  const subtotal = priceValue * quantity;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (!initialProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Product Selected</h2>
          <p className="text-gray-600 mb-8">Please select a product to proceed with checkout.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-800 transition-all inline-flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <ChevronLeft size={24} className="text-amber-700" />
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Checkout Form - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Product Summary Card with Quantity */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag size={24} className="text-amber-700" />
                Order Summary
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 bg-amber-50 rounded-2xl">
                <img 
                  src={initialProduct.image} 
                  alt={initialProduct.title}
                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{initialProduct.title}</h3>
                  <p className="text-amber-700 text-2xl font-bold mb-2">${priceValue.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      👍 {initialProduct.likes} likes
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      quantity <= 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105'
                    }`}
                  >
                    <Minus size={18} />
                  </button>
                  
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105 transition-all flex items-center justify-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Price Breakdown for this item */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Price per item:</span>
                  <span>${priceValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
                  <span>Subtotal for this item:</span>
                  <span className="text-amber-700">${(priceValue * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <User size={24} className="text-amber-700" />
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="+855 12 345 678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    required
                  >
                    <option value="">Select City</option>
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
                  <Truck size={16} /> Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="Street, Building, etc."
                  required
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-amber-700" />
                Payment Method
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
                  <span className="text-sm font-medium">Credit Card</span>
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
                  <span className="text-sm font-medium">Cash on Delivery</span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CreditCard size={16} /> Card Number
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
                        <Calendar size={16} /> Expiry Date
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
                    <label className="text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* KHQR Payment */}
              {paymentMethod === 'khqr' && (
                <div className="text-center p-8 bg-amber-50 rounded-2xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KHQR://payment?amount=${total.toFixed(2)}`} 
                    alt="KHQR Code"
                    className="w-48 h-48 mx-auto mb-4"
                  />
                  <p className="text-gray-700 mb-2">Scan with your banking app</p>
                  <p className="text-sm text-gray-500">Amount: ${total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                </div>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === 'cash' && (
                <div className="p-8 bg-amber-50 rounded-2xl text-center">
                  <Truck size={48} className="mx-auto text-amber-700 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
                  <p className="text-gray-600 mb-2">Pay when you receive your order</p>
                  <p className="text-sm text-gray-500">Quantity: {quantity} item(s)</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Price per item</span>
                  <span>${priceValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Quantity</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between text-gray-600 border-t pt-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-amber-700">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-800 hover:to-amber-900 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Lock size={20} />
                Confirm Payment (${total.toFixed(2)})
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming your payment, you agree to our Terms of Service and Privacy Policy
              </p>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
                <Lock size={16} />
                <span>Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;