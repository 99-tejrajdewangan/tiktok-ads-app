import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import TikTokOAuth from '../components/Auth/TikTokOAuth';
import AdCreationForm from '../components/AdForm/AdCreationForm';
import { LogOut, CheckCircle, Sparkles } from 'lucide-react';

const HomePage = () => {
  const { accessToken, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {accessToken ? (
            // User is connected - Show ad creation form
            <div className="space-y-8">
              {/* User info header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {user?.name?.charAt(0) || 'T'}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Welcome, {user?.name || 'Advertiser'}!
                      </h2>
                      <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        TikTok Ads Account Connected
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Ad creation form */}
              <AdCreationForm />
            </div>
          ) : (
            // User is NOT connected - Show OAuth screen
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  TikTok Ads Creative Flow
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Create engaging TikTok ads with smart music selection and real-time validation
                </p>
              </div>
              
              {/* OAuth Component */}
              <TikTokOAuth />
              
              {/* Features grid */}
              <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="text-purple-600 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Connect</h3>
                  <p className="text-gray-600">
                    Secure OAuth 2.0 connection to TikTok Ads
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="text-purple-600 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Create</h3>
                  <p className="text-gray-600">
                    Build ads with intelligent validation and music options
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="text-purple-600 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Submit</h3>
                  <p className="text-gray-600">
                    Handle API errors gracefully with clear user guidance
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

