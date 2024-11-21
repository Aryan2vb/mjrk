import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Users, LogOut, Send, Calendar, Package, 
  LayoutGrid, Settings, HelpCircle, History,
  FileText, BarChart2, Menu
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { CustomerList } from './CustomerList';
import { AddCustomerForm } from './AddCustomerForm';
import clsx from 'clsx';

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      section: 'Banking',
      items: [
        { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
        { icon: History, label: 'History', path: '/dashboard/history' },
        { icon: BarChart2, label: 'Analysis', path: '/dashboard/analysis' },
        { icon: Send, label: 'Finances', path: '/dashboard/finances' },
      ]
    },
    {
      section: 'Services',
      items: [
        { icon: Send, label: 'Messages', path: '/dashboard/messages', badge: 9 },
        { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
        { icon: Package, label: 'Products', path: '/dashboard/products' },
      ]
    },
    {
      section: 'Other',
      items: [
        { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50',
          'transition-all duration-300 ease-in-out h-full bg-white shadow-xl',
          isSidebarOpen ? 'w-72' : 'w-20',
          'lg:flex flex-col',
          !isSidebarOpen && 'hidden lg:flex'
        )}
      >
        {/* User Profile */}
        <div className={clsx(
          'p-4 border-b',
          !isSidebarOpen && 'flex justify-center'
        )}>
          <div className={clsx(
            'flex items-center',
            isSidebarOpen ? 'space-x-3' : 'justify-center'
          )}>
            <div className="w-12 h-12 rounded-full bg-pink-200 overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isSidebarOpen && (
              <div>
                <h3 className="font-semibold text-gray-800">User Name</h3>
                <p className="text-sm text-gray-500">Session active</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-8">
              {isSidebarOpen && (
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {section.section}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={clsx(
                      'flex items-center w-full rounded-lg transition-colors',
                      isSidebarOpen ? 'p-3' : 'p-2 justify-center',
                      'text-gray-700 hover:bg-gray-100',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                    title={!isSidebarOpen ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isSidebarOpen && (
                      <>
                        <span className="ml-3 flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className={clsx(
          'p-4 border-t',
          !isSidebarOpen && 'flex justify-center'
        )}>
          <button
            onClick={handleLogout}
            className={clsx(
              'flex items-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors',
              isSidebarOpen ? 'w-full p-3' : 'p-2'
            )}
            title={!isSidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={clsx(
        'flex-1 p-4 lg:p-8',
        'transition-all duration-300',
        isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      )}>
        <div className="max-w-full mx-auto">
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/add" element={<AddCustomerForm />} />
            <Route path="/products" element={<div>Products Page</div>} />
            <Route path="/messages" element={<div>Messages Page</div>} />
            <Route path="/history" element={<div>History Page</div>} />
            <Route path="/analysis" element={<div>Analysis Page</div>} />
            <Route path="/finances" element={<div>Finances Page</div>} />
            <Route path="/documents" element={<div>Documents Page</div>} />
            <Route path="/help" element={<div>Help Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}