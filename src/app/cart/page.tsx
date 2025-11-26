'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  area: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    alert('تم تأكيد طلبك بنجاح! سيتم توصيل طلبك قريباً.');
    // هنا يمكنك إضافة منطق إضافي مثل إرسال الطلب إلى الخادم
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">سلة المشتريات</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">سلة التسوق فارغة</p>
          <button 
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full"
            onClick={() => window.history.back()}
          >
            العودة للتسوق
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 border border-amber-100">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-0 md:mr-6">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover rounded-lg" 
                />
              </div>
              
              <div className="flex-1 text-center md:text-right mb-4 md:mb-0">
                <h3 className="font-bold text-lg text-amber-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category} - {item.area}</p>
                <p className="text-amber-700 font-medium mt-1">{item.price} ر.س</p>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full"
                >
                  -
                </button>
                
                <span className="w-10 text-center font-medium">{item.quantity}</span>
                
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full"
                >
                  +
                </button>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 mr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="md:border-r-2 md:border-amber-200 md:pr-4 md:mr-4 mt-4 md:mt-0">
                <p className="text-amber-600 font-bold text-lg">{item.price * item.quantity} ر.س</p>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">الإجمالي:</span>
              <span className="text-2xl font-bold text-amber-700">{total} ر.س</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              تأكيد الشراء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;