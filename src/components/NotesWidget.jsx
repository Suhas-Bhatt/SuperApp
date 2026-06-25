import React from 'react';
import { useStore } from '../store/useStore';

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleChange = (e) => setNotes(e.target.value);

  const handleClear = () => {
    if (window.confirm('Clear all notes? This cannot be undone.')) {
      setNotes('');
    }
  };

  const charCount = notes.length;
  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📝 Quick Notes
        </h2>
        <button
          onClick={handleClear}
          disabled={!notes}
          className="text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>

      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes here… They are automatically saved to your browser."
        className="w-full h-36 p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                   resize-none transition-all duration-200 text-sm leading-relaxed placeholder-gray-400
                   hover:bg-white hover:border-slate-300"
      />

      {/* Stats bar */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
          <span>💾</span> Auto-saved to browser
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
          <span>{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
          <span className="text-gray-200">|</span>
          <span>{charCount} char{charCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default NotesWidget;
