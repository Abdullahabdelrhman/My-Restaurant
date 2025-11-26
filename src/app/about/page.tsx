"use client";
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
}

interface ChefSpecial {
  id: string;
  name: string;
  image: string;
  category: string;
  area: string;
}

const About: NextPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [chefSpecials, setChefSpecials] = useState<ChefSpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);

        // جلب بيانات فريق العمل من API
        const teamPromises = [];
        for (let i = 0; i < 3; i++) {
          teamPromises.push(
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(res => {
                if (!res.ok) throw new Error('فشل في جلب البيانات');
                return res.json();
              })
          );
        }

        // جلب أطباق خاصة من الشيف
        const specialsPromises = [];
        for (let i = 0; i < 4; i++) {
          specialsPromises.push(
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(res => {
                if (!res.ok) throw new Error('فشل في جلب البيانات');
                return res.json();
              })
          );
        }

        const teamResults = await Promise.all(teamPromises);
        const specialsResults = await Promise.all(specialsPromises);

        // تحويل بيانات الفريق
        const teamData: TeamMember[] = teamResults.map((result, index) => {
          const meal = result.meals[0];
          const roles = ["الشيف التنفيذي", "شيف الحلويات", "مدير المطعم"];
          const specialties = ["المأكولات العربية", "الحلويات الشرقية", "المأكولات البحرية"];
          
          return {
            id: meal.idMeal,
            name: meal.strMeal.substring(0, 10) + " " + meal.strMeal.substring(10, 15),
            role: roles[index],
            bio: `متخصص في ${specialties[index]} مع أكثر من ${10 + index} سنوات خبرة.`,
            image: meal.strMealThumb,
            specialty: meal.strCategory
          };
        });

        // تحويل البيانات للأطباق المميزة
        const specialsData: ChefSpecial[] = specialsResults.map((result) => {
          const meal = result.meals[0];
          
          return {
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea
          };
        });

        setTeamMembers(teamData);
        setChefSpecials(specialsData);

      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-amber-800">جاري تحميل البيانات...</p>
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
        <title>من نحن | مطعمنا</title>
        <meta name="description" content="تعرف على قصة مطعمنا وفريق العمل المميز" />
      </Head>

      {/* Hero Section */}
      <section className="bg-amber-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
          <p className="text-xl max-w-2xl mx-auto">
            قصة شغفنا بالطعام وتفانينا في تقديم أفضل تجربة طعام لعملائنا
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">قصتنا</h2>
              <p className="text-gray-700 mb-4">
                بدأ مطعمنا رحلته منذ أكثر من عقد من الزمان، عندما قرر مؤسسونا الجمع بين تقاليد الطهي
                الأصيلة واللمسات العصرية المبتكرة. من مطبخ صغير إلى واحد من أشهر المطاعم في المنطقة،
                ما زلنا نحافظ على نفس الشغف والجودة التي بدأنا بها.
              </p>
              <p className="text-gray-700 mb-4">
                نؤمن بأن الطعام الجيد لا يقتصر على المذاق فحسب، بل هو تجربة متكاملة تشمل الجودة والخدمة
                والجو العام. لذلك نحرص على اختيار أفضل المكونات الطازجة وتدريب فريقنا بأعلى المعايير.
              </p>
              <div className="flex gap-4 mt-8">
                <Link href="/menu" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors">
                  استعرض قائمتنا
                </Link>
                <Link href="/contact" className="bg-white hover:bg-amber-100 text-amber-600 border border-amber-600 px-6 py-3 rounded-lg transition-colors">
                  اتصل بنا
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="مطعمنا من الداخل"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-amber-100 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">فريقنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                  <p className="text-sm text-amber-800 mt-3">متخصص في: {member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Specials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">تخصصات الشيف</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefSpecials.map((special) => (
              <div key={special.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={special.image}
                    alt={special.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-900 mb-2">{special.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{special.category}</span>
                    <span>{special.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">الجودة</h3>
              <p>نستخدم أفضل المكونات الطازجة ونتأكد من أعلى معايير الجودة في كل طبق نقدمه.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">الخدمة</h3>
              <p>فريقنا مدرب على تقديم خدمة استثنائية تجعل كل زيارة تجربة لا تُنسى.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">الشغف</h3>
              <p>شغفنا بالطعام يدفعنا للابتكار والتطوير المستمر في قائمتنا وخدماتنا.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">زورونا</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            نحن نقع في قلب المدينة، مستعدون لاستقبالكم وتقديم تجربة طعام استثنائية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg transition-colors">
              احجز طاولتك
            </Link>
            <Link href="/menu" className="bg-white hover:bg-amber-100 text-amber-600 border border-amber-600 px-8 py-3 rounded-lg transition-colors">
              استعرض القائمة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;