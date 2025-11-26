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

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const promises = Array.from({ length: 8 }, () =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => {
            if (!res.ok) throw new Error('فشل في جلب البيانات');
            return res.json();
          })
        );

        const results = await Promise.all(promises);

        const menuData: CartItem[] = results.map((result) => {
          const meal = result.meals[0];
          const price = 30 + Math.floor(Math.random() * 40); // توليد سعر عشوائي
          return {
            id: meal.idMeal,
            name: meal.strMeal,
            price: price,
            quantity: 1,
            image: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea || 'International'
          };
        });

        setMenuItems(menuData);
      } catch (err) {
        setError('حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    const user = localStorage.getItem('user');

    if (!user) {
      alert('يرجى تسجيل الدخول أولاً لإضافة منتجات إلى السلة');
      router.push('/login');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const itemIndex = existingCart.findIndex((cartItem: CartItem) => cartItem.id === item.id);

    if (itemIndex > -1) {
      // المنتج موجود: نزود الكمية
      existingCart[itemIndex].quantity += 1;
    } else {
      // منتج جديد: نضيفه
      existingCart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // 🟢 تحويل إلى صفحة الطلب
    router.push('/order');
  };

  if (loading) {
    return <div className="text-center p-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <button onClick={() => window.location.reload()} className="btn">أعد المحاولة</button>
      </div>
    );
  }

  return (
    <div className="container m-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">قائمة الطعام</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-amber-900 mb-2">{item.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">{item.category} - {item.area}</span>
                <span className="text-amber-600 font-bold">{item.price} ر.س</span>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors"
              >
                أضف إلى السلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
