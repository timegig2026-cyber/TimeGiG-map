/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Trash2, Sparkles, Grid3X3, AlignLeft, Sun } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setContent('');
  };

  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
  }[fontSize];

  return (
    <div
      id="app-container"
      className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-zinc-100 selection:text-zinc-900 relative"
      style={{
        backgroundImage: showGrid
          ? 'radial-gradient(circle, #e4e4e7 1px, transparent 1px)'
          : 'none',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Top Navigation / Header */}
      <header
        id="app-header"
        className="w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xs sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              id="brand-icon"
              className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-medium text-sm shadow-xs"
            >
              W
            </div>
            <div>
              <h1 id="app-title" className="text-sm font-semibold text-zinc-900 tracking-tight">
                White Canvas
              </h1>
              <p className="text-xs text-zinc-400">Minimalist workspace</p>
            </div>
          </div>

          {/* Quick Toolbar */}
          <div id="toolbar-actions" className="flex items-center gap-1.5">
            <button
              id="toggle-grid-btn"
              onClick={() => setShowGrid(!showGrid)}
              title={showGrid ? 'Hide grid pattern' : 'Show subtle dot grid'}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                showGrid
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            {/* Font Size Selector */}
            <div id="font-size-group" className="flex items-center border border-zinc-200/80 rounded-lg p-0.5 ml-1">
              {(['sm', 'base', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  id={`font-size-${size}-btn`}
                  onClick={() => setFontSize(size)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    fontSize === size
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              id="copy-content-btn"
              onClick={handleCopy}
              disabled={!content}
              title="Copy to clipboard"
              className={`p-2 rounded-lg text-xs font-medium transition-all ml-1 ${
                copied
                  ? 'bg-emerald-50 text-emerald-600'
                  : content
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                  : 'text-zinc-300 cursor-not-allowed'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Clear Button */}
            <button
              id="clear-content-btn"
              onClick={handleClear}
              disabled={!content}
              title="Clear canvas"
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                content
                  ? 'text-zinc-500 hover:text-rose-600 hover:bg-rose-50'
                  : 'text-zinc-300 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 bg-white rounded-xl border border-zinc-200/80 shadow-xs focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5 transition-all flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Clean Scratchpad</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                <span>•</span>
                <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
              </div>
            </div>

            <textarea
              id="canvas-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin typing freely on this clean white canvas..."
              className={`w-full flex-1 p-6 resize-none outline-none font-sans text-zinc-800 placeholder:text-zinc-300 bg-transparent min-h-[420px] ${fontSizeClass}`}
              autoFocus
            />
          </div>
        </motion.div>

        {/* Floating status / subtle footer */}
        <footer id="app-footer" className="mt-6 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-zinc-400" />
            <span>Pure White Theme</span>
          </div>
          <div>
            <span>Press anywhere on the canvas to write</span>
          </div>
        </footer>
      </main>

      {/* Copied Toast Alert */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            id="toast-notification"
            className="fixed bottom-6 right-6 bg-zinc-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
