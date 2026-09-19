/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

export default function App() {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div
      id="app-root"
      className="min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between selection:bg-zinc-100 selection:text-zinc-900"
    >
      {/* Clean White Canvas Template Area */}
      <main id="main-canvas" className="flex-1 w-full flex items-center justify-center p-6">
        {/* Subtle minimalist placeholder area */}
        <div id="template-placeholder" className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 mb-3 shadow-xs">
            <Briefcase className="w-5 h-5 stroke-[1.75]" />
          </div>
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            GiGs
          </p>
        </div>
      </main>

      {/* Bottom Menu Bar */}
      <nav
        id="bottom-menu-bar"
        aria-label="Bottom Navigation"
        className="sticky bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-zinc-100 px-6 py-2.5 z-50 flex items-center justify-center"
      >
        <div className="max-w-md w-full flex items-center justify-center">
          <motion.button
            id="menu-item-gigs"
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsActive(!isActive)}
            className={`group flex flex-col items-center justify-center gap-1 px-8 py-2 rounded-xl transition-all ${
              isActive
                ? 'text-zinc-900'
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <div
              id="gigs-icon-wrapper"
              className={`p-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'group-hover:bg-zinc-50 text-zinc-400'
              }`}
            >
              <Briefcase className="w-5 h-5 stroke-[2]" />
            </div>
            <span
              id="gigs-label"
              className={`text-xs tracking-tight font-medium ${
                isActive ? 'text-zinc-900 font-semibold' : 'text-zinc-400'
              }`}
            >
              GiGs
            </span>
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
