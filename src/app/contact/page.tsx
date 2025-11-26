// pages/contact.tsx
"use client"; // ⬅️ لازم تكون أول سطر

import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال النموذج
    console.log('تم إرسال النموذج:', formData);
    alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>اتصل بنا | مطعمنا</title>
        <meta name="description" content="تواصل مع فريق مطعمنا لأي استفسارات أو حجوزات" />
      </Head>

      {/* Hero Section */}
      <section className="bg-amber-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك واستقبال ملاحظاتك وآرائك
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">أرسل رسالة</h2>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors w-full"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">معلومات التواصل</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">العنوان</h3>
                <p className="text-gray-700 mb-2">
                  <i className="fas fa-map-marker-alt text-amber-600 ml-2"></i>
                  شارع المطاعم، المنطقة المركزية، الرياض
                </p>
                <p className="text-gray-500">المملكة العربية السعودية</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">وسائل التواصل</h3>
                <p className="text-gray-700 mb-2">
                  <i className="fas fa-phone text-amber-600 ml-2"></i>
                  +966 12 345 6789
                </p>
                <p className="text-gray-700 mb-2">
                  <i className="fas fa-envelope text-amber-600 ml-2"></i>
                  info@matamna.com
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">ساعات العمل</h3>
                <p className="text-gray-700 mb-2">الأحد - الخميس: ١٠ صباحاً - ١٠ مساءً</p>
                <p className="text-gray-700 mb-2">الجمعة - السبت: ١٢ ظهراً - ١١ مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">موقعنا</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9310345732657!2d46.67529591500194!3d24.71355158411211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f01063a3cc68f%3A0xb2e432fba6204d0c!2z2YPZhNmE2KfYqNmI2LTZgQ!5e0!3m2!1sar!2ssa!4v1692965824503!5m2!1sar!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مطعمنا"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
