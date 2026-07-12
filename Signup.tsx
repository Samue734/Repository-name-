import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'IT Support',
  'Legal',
];

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.employeeId || !formData.email || !formData.department || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await signup(
      formData.fullName,
      formData.employeeId,
      formData.email,
      formData.department,
      formData.password
    );

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-surface-grey flex">
      {/* Left: Signup Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl border border-border-light shadow-card p-10">
            {/* Back Button */}
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-navy-600 hover:text-navy-900 mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Sign In</span>
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-navy-900 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="13" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="2" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="13" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.3)"/>
                </svg>
              </div>
              <h1 className="text-h2 text-navy-900">Create Account</h1>
              <p className="text-caption text-navy-600 mt-1">Register as an Employee</p>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-3 rounded-lg bg-blue-50 border-l-4 border-royal">
              <p className="text-caption text-navy-700">
                Creating an account registers you as an Employee. Administrative roles are assigned only by system administrators.
              </p>
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
                  <label className="block text-h4 text-navy-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full h-12 px-4 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="EMP-12345"
                    className="w-full h-12 px-4 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Company Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full h-12 px-4 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Department Request</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-border-light text-navy-900 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200 bg-white"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
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

                <div>
                  <label className="block text-h4 text-navy-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full h-12 px-4 pr-12 rounded-lg border border-border-light text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-4 focus:ring-royal/10 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-600 hover:text-navy-900"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-royal hover:bg-royal-dark text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? 'Creating Account...' : 'Create Employee Account'}
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-navy-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-royal hover:text-royal-dark font-medium"
              >
                Sign In
              </button>
            </p>
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
        
        {/* Feature Points */}
        <div className="absolute bottom-12 left-12 right-12 space-y-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-royal/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E6AF8" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Secure Authentication</h3>
                <p className="text-xs text-navy-600 mt-1">Enterprise-grade security with role-based access control</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-900">Role-Based Access</h3>
                <p className="text-xs text-navy-600 mt-1">Administrative roles assigned by system administrators only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
