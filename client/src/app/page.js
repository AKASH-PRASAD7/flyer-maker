"use client";

import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import DesignTypes from "@/components/home/design-types";
import DesignModal from "@/components/home/designs-modal";
import Header from "@/components/home/header";
import RecentDesigns from "@/components/home/recent-designs";
import SideBar from "@/components/home/sidebar";
import SubscriptionModal from "@/components/subscription/premium-modal";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import { getUserDesigns } from "@/services/design-service";
import { getUserSubscription } from "@/services/subscription-service";
import { useEditorStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
  const {
    setUserSubscription,
    setUserDesigns,
    showPremiumModal,
    setShowPremiumModal,
    showDesignsModal,
    setShowDesignsModal,
    userDesigns,
    setUserDesignsLoading,
    userDesignsLoading,
  } = useEditorStore();

  const fetchUserSubscription = async () => {
    const response = await getUserSubscription();

    if (response.success) setUserSubscription(response.data);
  };

  async function fetchUserDesigns() {
    setUserDesignsLoading(true);
    const result = await getUserDesigns();

    if (result?.success) {
      setUserDesigns(result?.data);
      setUserDesignsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserSubscription();
    fetchUserDesigns();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />
          
          {/* AI Flyer Generator Section */}
          <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 mb-12 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full translate-x-4 translate-y-4"></div>
            
            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  ✨ NEW: AI-Powered Content Generation
                </div>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Wand2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    AI Flyer Generator
                  </h2>
                </div>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Transform simple ideas into professional flyers with the power of AI. 
                  Just describe what you need, and watch our intelligent system create stunning, 
                  persuasive content that converts.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
                  <p className="text-gray-600 text-sm">Generate professional flyers in under 30 seconds</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Content</h3>
                  <p className="text-gray-600 text-sm">AI-powered copywriting that sells and converts</p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Beautiful Design</h3>
                  <p className="text-gray-600 text-sm">Professional templates for every occasion</p>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="text-center">
                <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-lg mb-6">
                  <div className="flex -space-x-2 mr-4">
                    {/* Dummy user avatars */}
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="text-left pr-4">
                    <p className="text-sm font-medium text-gray-900">Join 2,500+ users</p>
                    <p className="text-xs text-gray-600">creating amazing flyers daily</p>
                  </div>
                </div>
                <br />
                <Link href="/flyer-generator">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <Wand2 className="w-5 h-5 mr-3" />
                    Start Creating Now - It's Free! ✨
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 mt-3">No signup required • Generate unlimited flyers</p>
              </div>
            </div>
          </div>
          
          <DesignTypes />
          <AiFeatures />
          <RecentDesigns />
        </main>
      </div>
      <SubscriptionModal
        isOpen={showPremiumModal}
        onClose={setShowPremiumModal}
      />
      <DesignModal
        isOpen={showDesignsModal}
        onClose={setShowDesignsModal}
        userDesigns={userDesigns}
        setShowDesignsModal={setShowDesignsModal}
        userDesignsLoading={userDesignsLoading}
      />
    </div>
  );
}
