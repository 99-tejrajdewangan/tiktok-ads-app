import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="mt-16 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2026 TikTok Ads Creative Flow. This is a demo application.</p>
          <p className="text-sm mt-2">Not affiliated with TikTok. Mock APIs for demonstration only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;