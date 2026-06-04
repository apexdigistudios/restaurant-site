import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (localStorage.getItem('daddys-admin-auth') === 'true') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    // Simulate auth delay
    setTimeout(() => {
      if (email === 'admin@daddys.com' && password === 'pizza2026') {
        localStorage.setItem('daddys-admin-auth', 'true');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setLoginError('Invalid email or password. Hint: admin@daddys.com / pizza2026');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/[0.07] rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/[0.05] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative">
        {/* Card glow ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl blur opacity-25 animate-pulse-glow"></div>

        {/* Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-white/10 shadow-2xl shadow-red-900/20 overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="Daddy's Pizza" className="h-16 w-auto object-contain" />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Daddy's Pizza Admin Portal
              </h1>
              <p className="text-gray-400 text-sm">
                Manage your restaurant in real time.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 text-left">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setLoginError(''); }}
                    placeholder="admin@daddys.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Error */}
              {loginError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-400 text-xs">{loginError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <p className="text-gray-600 text-[11px] mt-6 text-center flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure admin access · Staff only
            </p>

            {/* Back to site */}
            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <Link
                to="/"
                className="text-gray-500 hover:text-white text-xs transition-colors duration-200 flex items-center justify-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Daddy's Pizza website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
