import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "", name: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.email || !form.name) {
      setError("請輸入電子郵件與姓名");
      return;
    }

    // 可改為實際 API 呼叫
    alert(`忘記密碼送出: ${JSON.stringify(form)}`);
    setMessage("如果資訊正確，我們將寄送重設密碼連結至您的信箱");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">忘記密碼</h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {message && <div className="mb-4 text-green-600 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="電子郵件"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="姓名"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            送出
          </button>
          <p className="mt-6 text-center text-gray-600">
            已經有帳號？{" "}
            <Link to="/auth" className="text-blue-600 hover:underline font-semibold">
            回登入畫面
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
