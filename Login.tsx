import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-surface-grey flex">
      {/* Left: Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl border border-border-light shadow-card p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-navy-900 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="13" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="2" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="13" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.3)"/>
                </svg>
              </div>
              <h1 className="text-h2 text-navy-900">AssetFlow</h1>
              <p className="text-caption text-navy-600 mt-1">Enterprise Asset & Resource Management</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-12 px-4 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 pr-12 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-600 hover:text-navy-900"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-border-light text-royal focus:ring-royal"
                    />
                    <span className="text-sm text-navy-700">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-royal hover:text-royal-dark font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-royal hover:bg-royal-dark text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-navy-600">OR</span>
                </div>
              </div>

              {/* Create Account Link */}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full h-12 border border-border-light hover:border-royal hover:text-royal text-navy-700 font-medium rounded-lg transition-all duration-200"
              >
                Create Employee Account
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-3 rounded-lg bg-blue-50 border border-royal/10">
              <p className="text-caption text-navy-600 mb-2 font-medium">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-navy-600 font-mono">
                <p>admin@assetflow.com (Admin)</p>
                <p>manager@assetflow.com (Asset Manager)</p>
                <p>head@assetflow.com (Department Head)</p>
                <p>employee@assetflow.com (Employee)</p>
                <p className="text-navy-500 mt-1">Any password works</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Illustration (Desktop Only) */}
      <div className="hidden lg:block w-[55%] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/login-illustration.jpg)',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
          }}
        />
        <div className="absolute inset-0 bg-navy-900/20" style={{ borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px' }} />
        
        {/* Floating Stats Cards */}
        <div className="absolute bottom-12 left-12 right-12 flex gap-4">
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-caption text-navy-600">Total Assets</p>
            <p className="text-h2 text-navy-900 mt-1">2,759</p>
            <div className="mt-2 flex items-center gap-1 text-success text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5"/>
              </svg>
              <span>+12.5%</span>
            </div>
          </div>
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-caption text-navy-600">Utilization</p>
            <p className="text-h2 text-navy-900 mt-1">87.3%</p>
            <div className="mt-2 flex items-center gap-1 text-success text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5"/>
              </svg>
              <span>+3.2%</span>
            </div>
          </div>
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-caption text-navy-600">Cost Savings</p>
            <p className="text-h2 text-navy-900 mt-1">$124K</p>
            <div className="mt-2 flex items-center gap-1 text-success text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5"/>
              </svg>
              <span>+8.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
