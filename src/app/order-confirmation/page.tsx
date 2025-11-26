"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DishInCart {
  idMeal: string;
  strMeal: string;
  quantity: number;
  strMealThumb: string;
}

export default function OrderConfirmation() {
  const [cart, setCart] = useState<DishInCart[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const cartStr = localStorage.getItem("cart");
    if (cartStr) {
      setCart(JSON.parse(cartStr));
    }
  }, []);

  const handleConfirmOrder = () => {
    localStorage.removeItem("cart"); // تفريغ السلة بعد التأكيد
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-amber-50">
        <h1 className="text-3xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
        <p className="mb-6">شكرًا لاختيارك مطعمنا. سيتم تجهيز طلبك قريبًا.</p>
        <Link href="/" className="text-amber-600 hover:underline font-semibold">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-semibold mb-4">سلة الطلبات فارغة</h1>
        <Link href="/menu" className="text-amber-600 hover:underline">
          تصفح القائمة لإضافة طلبات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">تأكيد الطلب</h1>
      <ul className="space-y-4">
        {cart.map(({ idMeal, strMeal, quantity, strMealThumb }) => (
          <li
            key={idMeal}
            className="flex items-center border rounded p-4 shadow-sm"
          >
            <Image
              src={strMealThumb}
              alt={strMeal}
              width={80}
              height={80}
              className="rounded object-cover mr-4"
            />
            <div className="flex-grow">
              <h2 className="font-semibold text-lg">{strMeal}</h2>
              <p>الكمية: {quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleConfirmOrder}
        className="mt-8 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg w-full transition-colors"
      >
        تأكيد الطلب
      </button>
    </div>
  );
}
