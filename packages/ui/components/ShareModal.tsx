"use client";

import React, { useState } from "react";
import { Share2, X, Copy, Check } from "lucide-react";

export function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to copy the current URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#E86C25] rounded-md hover:bg-[#c95d1f] transition-colors"
      >
        <Share2 size={16} />
        Share
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Share the Vibes
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Share ToriHub24 with your friends and community!
            </p>

            {/* Copy Link Section */}
            <div className="flex items-center gap-2 p-2 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1 px-2 py-1 text-sm bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-[#033832] rounded-md hover:bg-[#022b26] transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}