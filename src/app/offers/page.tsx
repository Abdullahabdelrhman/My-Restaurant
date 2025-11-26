"use client";
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Offer {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  expiry: string;
  category: string;
}

const Offers: NextPage = () => {
  const [currentOffers, setCurrentOffers] = useState<Offer[]>([]);
  const [upcomingOffers, setUpcomingOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // جلب 3 وجبات عشوائية من API للعروض الحالية
        const currentPromises = [];
        for (let i = 0; i < 3; i++) {
          currentPromises.push(
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(res => {
                if (!res.ok) throw new Error('فشل في جلب البيانات');
                return res.json();
              })
          );
        }
        
        // جلب وجبتين للعروض القادمة
        const upcomingPromises = [];
        for (let i = 0; i < 2; i++) {
          upcomingPromises.push(
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(res => {
                if (!res.ok) throw new Error('فشل في جلب البيانات');
                return res.json();
              })
          );
        }
        
        const currentResults = await Promise.all(currentPromises);
        const upcomingResults = await Promise.all(upcomingPromises);
        
        // تحويل البيانات إلى شكل مناسب للعروض
        const currentOffersData: Offer[] = currentResults.map((result, index) => {
          const meal = result.meals[0];
          const originalPrice = (40 + Math.floor(Math.random() * 40)).toString();
          const discountPrice = (parseInt(originalPrice) * 0.8).toFixed(0);
          
          return {
            id: meal.idMeal,
            title: meal.strMeal,
            description: meal.strInstructions?.substring(0, 100) + '...' || 'وصف غير متوفر',
            price: `${discountPrice} ر.س`,
            originalPrice: `${originalPrice} ر.س`,
            image: meal.strMealThumb,
            expiry: `2023-${12 - index}-${30 - index*5}`,
            category: meal.strCategory
          };
        });
        
        const upcomingOffersData: Offer[] = upcomingResults.map((result, index) => {
          const meal = result.meals[0];
          const originalPrice = (40 + Math.floor(Math.random() * 40)).toString();
          const discountPrice = (parseInt(originalPrice) * 0.7).toFixed(0);
          
          return {
            id: meal.idMeal,
            title: meal.strMeal,
            description: meal.strInstructions?.substring(0, 100) + '...' || 'وصف غير متوفر',
            price: `${discountPrice} ر.س`,
            originalPrice: `${originalPrice} ر.س`,
            image: meal.strMealThumb,
            expiry: `2023-${11 - index}-${15 - index*5}`,
            category: meal.strCategory
          };
        });
        
        setCurrentOffers(currentOffersData);
        setUpcomingOffers(upcomingOffersData);
        
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-800">جاري تحميل العروض...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>العروض الخاصة | مطعمنا</title>
        <meta name="description" content="اكتشف أحدث العروض والخصومات الحصرية في مطعمنا" />
      </Head>

      {/* Hero Section */}
      <section className="bg-amber-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">العروض الخاصة</h1>
          <p className="text-xl max-w-2xl mx-auto">
            استفد من عروضنا الحصرية وخصوماتنا المميزة على مختلف وجباتنا
          </p>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">العروض الحالية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                    حتى {offer.expiry}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-900">{offer.title}</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                      {offer.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-amber-600">{offer.price}</span>
                    <span className="text-lg text-gray-500 line-through">{offer.originalPrice}</span>
                  </div>
                  
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors">
                    احجز الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Offers */}
      <section className="py-16 bg-amber-100 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">العروض القادمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                    تبدأ في {offer.expiry}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-900">{offer.title}</h3>
                    <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
                      {offer.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-amber-600">{offer.price}</span>
                    <span className="text-md text-gray-500 line-through">{offer.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-amber-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا البريدية</h2>
          <p className="mb-6">كن أول من يعرف عن عروضنا الخاصة والخصومات الحصرية</p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg transition-colors"
            >
              اشترك الآن
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Offers;