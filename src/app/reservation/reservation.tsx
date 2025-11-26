// 📁 src/app/reservation/page.tsx

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">حجز طاولة</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">رقم الهاتف</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
              placeholder="05xxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">تاريخ الحجز</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">عدد الأشخاص</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
              min="1"
              placeholder="2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            تأكيد الحجز
          </button>
        </form>
      </div>
    </div>
  );
}
