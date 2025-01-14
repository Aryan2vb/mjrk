import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await login("mjrk@gmail.com", "manu");
      navigate("/dashboard");
    } catch (err) {
      setError("Demo login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (
    text: string,
    setCopiedState: (value: boolean) => void,
  ) => {
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image and Content */}
      <div className="relative w-full md:w-[55%] min-h-[300px] md:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Finance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:px-12 lg:px-16 text-white">
          <div className="max-w-md mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-8">
              Manage Your Finances with Confidence
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-8">
              Access your financial dashboard to track transactions, manage
              customers, and grow your business efficiently.
            </p>
            <div className="hidden md:flex space-x-6 lg:space-x-12">
              <div className="flex flex-col">
                <span className="text-3xl lg:text-4xl font-bold">1000+</span>
                <span className="text-base lg:text-lg opacity-80">
                  Active Users
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl lg:text-4xl font-bold">50k+</span>
                <span className="text-base lg:text-lg opacity-80">
                  Transactions
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl lg:text-4xl font-bold">99%</span>
                <span className="text-base lg:text-lg opacity-80">
                  Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-lg mb-6 md:mb-8">
              <LogIn className="w-8 md:w-10 h-8 md:h-10 text-white transform -rotate-12 transition-transform hover:rotate-0 duration-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500">
              Please sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/70 backdrop-blur-sm text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/70 backdrop-blur-sm text-base"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <a
                href="mailto:aryansoni3105@gmail.com?subject=Request%20for%20Account%20Access&body=Hello,%0D%0A%0D%0AI%20would%20like%20to%20request%20access%20to%20the%20system.%0D%0A%0D%0AThank%20you."
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Contact administrator
              </a>
            </div>

            {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Demo Credentials
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-100 cursor-pointer hover:bg-gray-100">
                    <span>Email:</span>
                    <CopyToClipboard
                      text="mjrk@gmail.com"
                      onCopy={() =>
                        handleCopy("mjrk@gmail.com", setCopiedEmail)
                      }
                    >
                      <span
                        className={`px-2 py-1 rounded text-blue-600 ${copiedEmail ? "bg-green-100 text-green-700" : ""}`}
                      >
                        mjrk@gmail.com{" "}
                        {copiedEmail && (
                          <span className="ml-1 text-green-600 text-xs">
                            Copied!
                          </span>
                        )}
                      </span>
                    </CopyToClipboard>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-100 cursor-pointer hover:bg-gray-100">
                    <span>Password:</span>
                    <CopyToClipboard
                      text="manu"
                      onCopy={() => handleCopy("manu", setCopiedPassword)}
                    >
                      <span
                        className={`px-2 py-1 rounded text-blue-600 ${copiedPassword ? "bg-green-100 text-green-700" : ""}`}
                      >
                        manu{" "}
                        {copiedPassword && (
                          <span className="ml-1 text-green-600 text-xs">
                            Copied!
                          </span>
                        )}
                      </span>
                    </CopyToClipboard>
                  </div>
                </div>
                <button
                  onClick={handleDemoLogin}
                  className="mt-2 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                  Login with Demo Credentials
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Use these credentials to explore the demo version
                </p>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
