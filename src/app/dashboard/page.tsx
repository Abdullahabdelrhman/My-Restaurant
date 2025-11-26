"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// أنواع البيانات
interface Order {
  id: number;
  customer: string;
  items: number;
  total: number;
  status: string;
  time: string;
}

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
}

const Dashboard = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats] = useState({
    totalOrders: 124,
    pendingOrders: 8,
    completedOrders: 116,
    totalRevenue: 8450,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    };

    const mockOrders: Order[] = [
      {
        id: 1,
        customer: "أحمد محمد",
        items: 3,
        total: 120,
        status: "مكتمل",
        time: "٢٠ دقيقة",
      },
      {
        id: 2,
        customer: "فاطمة علي",
        items: 2,
        total: 85,
        status: "قيد التجهيز",
        time: "١٥ دقيقة",
      },
      {
        id: 3,
        customer: "خالد إبراهيم",
        items: 4,
        total: 160,
        status: "قيد التجهيز",
        time: "١٠ دقائق",
      },
      {
        id: 4,
        customer: "سارة عبدالله",
        items: 1,
        total: 45,
        status: "جديد",
        time: "٥ دقائق",
      },
    ];

    setOrders(mockOrders);
    fetchMeal();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatBox title="إجمالي الطلبات" value={stats.totalOrders} color="amber" />
              <StatBox title="طلبات مكتملة" value={stats.completedOrders} color="green" />
              <StatBox title="طلبات قيد الانتظار" value={stats.pendingOrders} color="blue" />
              <StatBox title="إجمالي الإيرادات" value={`${stats.totalRevenue} ر.س`} color="purple" />
            </div>

            {/* الطلبات */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-amber-800">الطلبات الحديثة</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-right">
                      <th className="px-4 py-2">رقم</th>
                      <th className="px-4 py-2">العميل</th>
                      <th className="px-4 py-2">العناصر</th>
                      <th className="px-4 py-2">الإجمالي</th>
                      <th className="px-4 py-2">الحالة</th>
                      <th className="px-4 py-2">الوقت</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b text-right">
                        <td className="px-4 py-3">#{order.id}</td>
                        <td className="px-4 py-3">{order.customer}</td>
                        <td className="px-4 py-3">{order.items}</td>
                        <td className="px-4 py-3">{order.total} ر.س</td>

                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "مكتمل"
                                ? "bg-green-100 text-green-800"
                                : order.status === "قيد التجهيز"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="px-4 py-3">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* وصفة اليوم */}
            {meal && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-amber-800">
                  وصفة اليوم
                </h2>

                <div className="flex flex-col lg:flex-row gap-6">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-900 mb-3">
                      {meal.strMeal}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {meal.strInstructions}
                    </p>

                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    >
                      مشاهدة التحضير
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "orders":
        return <SectionBox title="إدارة الطلبات" content="هنا إدارة الطلبات..." />;

      case "menu":
        return <SectionBox title="إدارة القائمة" content="هنا إدارة القائمة..." />;

      case "settings":
        return <SectionBox title="الإعدادات" content="هنا الإعدادات..." />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-amber-600 text-white flex flex-col pt-10">
        <div className="p-6 border-b border-amber-500">
          <h1 className="text-2xl font-bold">مطعمنا</h1>
          <p className="text-sm text-amber-200">لوحة التحكم</p>
        </div>

        <nav className="flex-1 p-4">
          {[
            { key: "dashboard", label: "📊 لوحة التحكم" },
            { key: "orders", label: "🛒 إدارة الطلبات" },
            { key: "menu", label: "📋 إدارة القائمة" },
            { key: "settings", label: "⚙️ الإعدادات" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full text-right py-3 px-4 rounded-lg mb-2 ${
                activeSection === item.key ? "bg-amber-700" : "hover:bg-amber-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-amber-500">
          <button
            onClick={handleLogout}
            className="w-full bg-amber-700 hover:bg-amber-800 py-3 px-4 rounded-lg"
          >
            🚪 تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-800">
            {{
              dashboard: "لوحة التحكم",
              orders: "إدارة الطلبات",
              menu: "إدارة القائمة",
              settings: "الإعدادات",
            }[activeSection]}
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">مدير النظام</p>
              <p className="text-sm text-gray-600">مرحباً بك!</p>
            </div>

            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
              م
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

// ثابت للألوان (بدل القيم الديناميكية)
const colorClasses: Record<
  string,
  { border: string; text: string }
> = {
  amber: {
    border: "border-amber-500",
    text: "text-amber-600",
  },
  green: {
    border: "border-green-500",
    text: "text-green-600",
  },
  blue: {
    border: "border-blue-500",
    text: "text-blue-600",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-600",
  },
};

// صندوق الإحصائيات
const StatBox = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) => {
  const cls = colorClasses[color];

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${cls.border}`}>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${cls.text}`}>{value}</p>
    </div>
  );
};

// صندوق الأقسام الأخرى
const SectionBox = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold text-amber-800 mb-4">{title}</h2>
    <p>{content}</p>
  </div>
);

export default Dashboard;
