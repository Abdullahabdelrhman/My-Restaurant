"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // هنا تضيف مسح التوكن، أو منطق تسجيل الخروج الحقيقي
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: "الرئيسية", path: "/" },
    { name: "القائمة", path: "/menu" },
    { name: "عروض خاصة", path: "/offers" },
    { name: "عن المطعم", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* الشعار */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span
                className={`ml-2 text-xl font-bold ${
                  isScrolled ? "text-amber-600" : "text-white"
                }`}
              >
                مطعمنا
              </span>
            </div>
          </Link>

          {/* قائمة الديسكتوب */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative font-medium transition-colors ${
                  pathname === item.path
                    ? "text-amber-600"
                    : isScrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600"></span>
                )}
              </Link>
            ))}
          </div>

          {/* أزرار إضافية (الديسكتوب) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/order"
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isScrolled
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-white text-amber-600 hover:bg-amber-50"
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              طلب الآن
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  isScrolled
                    ? "border-amber-600 text-amber-600 hover:bg-amber-50"
                    : "border-white text-white hover:bg-white hover:text-amber-600"
                }`}
              >
                تسجيل الخروج
              </button>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  isScrolled
                    ? "border-amber-600 text-amber-600 hover:bg-amber-50"
                    : "border-white text-white hover:bg-white hover:text-amber-600"
                }`}
              >
                تسجيل الدخول
              </Link>
            )}
          </div>

          {/* زر الجوال */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {isMenuOpen ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* قائمة الجوال */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 bg-white">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.path
                      ? "bg-amber-100 text-amber-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/order"
                  className="w-full flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  طلب الآن
                </Link>

                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full block text-center text-amber-600 hover:text-amber-800 py-2 font-medium"
                  >
                    تسجيل الخروج
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full block text-center text-amber-600 hover:text-amber-800 py-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;