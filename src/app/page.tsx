"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Dish {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  [key: string]: any;
}

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  image: string;
}

export default function Home() {
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomDishes = async () => {
      try {
        setLoading(true);
        const dishes: Dish[] = [];

        for (let i = 0; i < 4; i++) {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          if (!response.ok) {
            throw new Error("فشل في جلب البيانات");
          }
          const data = await response.json();
          dishes.push(data.meals[0]);
        }

        setFeaturedDishes(dishes);
        setError(null);
      } catch (err) {
        console.error("Error fetching dishes:", err);
        setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomDishes();
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "أحمد السعدي",
      comment: "أفضل مطعم في المدينة! الطعام كان رائعًا والخدمة ممتازة.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "فاطمة محمد",
      comment: "تجربة رائعة، ننوي العودة قريبًا مع العائلة.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "خالد العتيبي",
      comment: "الطعام كان لذيذًا والجو رائع، أنصح الجميع بتجربته.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const generateRandomPrice = () => {
    return `${Math.floor(Math.random() * 30) + 35} ر.س`;
  };

  // دالة لإضافة الطبق للسلة
  const handleAddToCart = (dish: Dish) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("يرجى تسجيل الدخول أولاً لإضافة الطلب.");
      window.location.href = "/login";
      return;
    }

    const cartStr = localStorage.getItem("cart");
    const cart = cartStr ? JSON.parse(cartStr) : [];

    // تحقق إذا الطبق موجود مسبقًا، زود الكمية لو حبيت
    const existingIndex = cart.findIndex(
      (item: Dish) => item.idMeal === dish.idMeal
    );
    if (existingIndex >= 0) {
      // إذا حبيت تزيد كمية
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // توجه لصفحة الطلبات
    window.location.href = "/order";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="مطعمنا"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            مرحباً بكم في مطعمنا
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            استمتع بأشهى المأكولات المحضرة بأيدي أمهر الطهاة باستخدام أفضل
            المكونات الطازجة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg transition-colors"
            >
              تصفح القائمة
            </Link>
            <Link
              href="/offers"
              className="bg-transparent hover:bg-white text-white hover:text-amber-600 border-2 border-white px-8 py-3 rounded-lg text-lg transition-colors"
            >
              العروض الخاصة
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            لماذا تختار مطعمنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
              <p className="text-gray-600">
                نستخدم أفضل المكونات الطازجة في جميع أطباقنا.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">خدمة سريعة</h3>
              <p className="text-gray-600">
                توصيل الطلبات بسرعة وجودة عالية.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">تنوع المأكولات</h3>
              <p className="text-gray-600">
                قائمة طعام متنوعة ترضي جميع الأذواق.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            أطباق مميزة
          </h2>
          {loading && <p className="text-center">جاري التحميل...</p>}
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="relative h-48">
                  <Image
                    src={dish.strMealThumb}
                    alt={dish.strMeal}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{dish.strMeal}</h3>
                  <p className="text-sm text-gray-600 flex-grow">
                    {dish.strInstructions.slice(0, 50)}...
                  </p>
                  <p className="mt-2 font-bold">{generateRandomPrice()}</p>
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="mt-3 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md transition-colors"
                  >
                    أضف إلى الطلب
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            آراء العملاء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ id, name, comment, rating, image }) => (
              <div
                key={id}
                className="bg-amber-50 rounded-lg p-6 shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                  loading="lazy"
                />
                <h3 className="font-semibold text-lg mb-2">{name}</h3>
                <p className="text-gray-700 mb-3">"{comment}"</p>
                <div className="flex space-x-1 justify-center">
                  {Array.from({ length: rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.375 2.455a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.374-2.455a1 1 0 00-1.176 0l-3.374 2.455c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.01 9.385c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.958z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-600 text-white py-6 text-center">
        &copy; 2024 مطعمنا. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
