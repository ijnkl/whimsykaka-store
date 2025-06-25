import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'login'; // 從網址讀取mode
  const [isLogin, setIsLogin] = useState(mode === 'login');

  useEffect(() => {
    setIsLogin(mode === 'login');
  }, [mode]);

  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    if (isLogin) {
      navigate('/auth?mode=register');
    } else {
      navigate('/auth?mode=login');
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!form.email || !form.password || (!isLogin && !form.name)) {
    setError('請填寫所有必填欄位');
    return;
  }
  
  if (isLogin) {
    localStorage.setItem('token', data.token); // 儲存 token
    alert('登入成功！');
    navigate('/dashboard'); // 或其他登入後頁面
  }

  try {
    const url = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { email: form.email, password: form.password, phone: form.phone };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      setError(data.message || '伺服器錯誤，請稍後再試');
      return;
    }

    if (isLogin) {
      // 假設後端回傳的 token 在 data.token
      localStorage.setItem('token', data.token);
      alert('登入成功！');
      navigate('/');  // 導回首頁
    } else {
      alert('註冊成功，請登入！');
      setIsLogin(true);
      // 清空密碼欄位讓使用者重新登入
      setForm(prev => ({ ...prev, password: '' }));
    }
  } catch (err) {
    setError('網路錯誤，請稍後再試');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? '會員登入' : '會員註冊'}
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="姓名"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="電話 (選填)"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="電子郵件"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="密碼"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? '登入' : '註冊'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? '還沒有帳號？' : '已經有帳號？'}{' '}
          <button
            onClick={toggleMode}
            className="text-blue-600 hover:underline font-semibold"
          >
            {isLogin ? '立即註冊' : '立即登入'}
          </button>
        </p>

        <p className="text-center text-sm mt-2">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            忘記密碼？
          </Link>
        </p>
      </div>
    </div>
  );
}
