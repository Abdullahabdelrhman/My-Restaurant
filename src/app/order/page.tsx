'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  area: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const OrderPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // تحميل بيانات المستخدم من localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // إذا لم يكن المستخدم مسجلاً، نعيده إلى صفحة التسجيل
      router.push('/login');
      return;
    }

    // تحميل عناصر السلة من localStorage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    } else {
      // إذا كانت السلة فارغة، نعيده إلى القائمة
      router.push('/menu');
    }
  }, [router]);

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
    
    if (updatedCart.length === 0) {
      router.push('/menu');
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return deliveryOption === 'delivery' ? 15 : 0;
  };

  const getGrandTotal = () => {
    return getTotal() + getDeliveryFee();
  };

  const handleSubmitOrder = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // هنا يمكنك إضافة منطق إرسال الطلب إلى الخادم
      // محاكاة عملية إرسال الطلب
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إنشاء تفاصيل الطلب
      const orderDetails = {
        id: Date.now().toString(),
        items: cartItems,
        total: getGrandTotal(),
        customer: user,
        deliveryOption,
        notes,
        date: new Date().toLocaleString('ar-SA')
      };
      
      // حفظ الطلب في localStorage (يمكن استبدال هذا بإرسال إلى الخادم)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, orderDetails]));
      
      // مسح السلة
      localStorage.removeItem('cart');
      
      // عرض رسالة نجاح
      alert(`تم تأكيد طلبك بنجاح! رقم الطلب: ${orderDetails.id}`);
      
      // التوجيه إلى صفحة التأكيد أو الصفحة الرئيسية
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-800">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">تأكيد الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* تفاصيل الطلب */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">عناصر الطلب</h2>
            
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-100 py-4">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 mr-4">
                  <h3 className="font-medium text-amber-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category} - {item.area}</p>
                  <p className="text-amber-700 font-medium">{item.price} ر.س</p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-amber-50 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:bg-amber-50 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="w-20 text-center font-bold text-amber-600 mx-4">
                    {item.price * item.quantity} ر.س
                  </span>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">ملاحظات على الطلب</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أضف ملاحظات خاصة لطلبك (اختياري)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
            />
          </div>
        </div>
        
        {/* معلومات الدفع والتوصيل */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">معلومات التوصيل</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">طريقة الاستلام</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryOption('delivery')}
                  className={`py-3 px-4 rounded-lg border transition-colors ${deliveryOption === 'delivery' ? 'bg-amber-100 border-amber-500 text-amber-700' : 'border-gray-300'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  توصيل
                </button>
                <button
                  onClick={() => setDeliveryOption('pickup')}
                  className={`py-3 px-4 rounded-lg border transition-colors ${deliveryOption === 'pickup' ? 'bg-amber-100 border-amber-500 text-amber-700' : 'border-gray-300'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  استلام
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">معلومات العميل</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.phone}</p>
                {deliveryOption === 'delivery' && (
                  <p className="text-gray-600 mt-1">{user.address}</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>المجموع</span>
                <span>{getTotal()} ر.س</span>
              </div>
              
              {deliveryOption === 'delivery' && (
                <div className="flex justify-between mb-2">
                  <span>رسوم التوصيل</span>
                  <span>{getDeliveryFee()} ر.س</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
                <span>الإجمالي</span>
                <span className="text-amber-600">{getGrandTotal()} ر.س</span>
              </div>
              
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg mt-6 font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    جاري تأكيد الطلب...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    تأكيد الطلب
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;