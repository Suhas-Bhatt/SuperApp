import React, { useState, useEffect } from 'react';

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isRunning || totalSeconds <= 0) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setFinished(true);
          playNotification();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  const playNotification = () => {
    if (isMuted) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 880;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) { /* ignore */ }
  };

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setInitialTotal(total);
      setIsRunning(true);
      setFinished(false);
    }
  };

  const handlePause = () => setIsRunning(false);
  const handleResume = () => { if (totalSeconds > 0) setIsRunning(true); };
  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setInitialTotal(0);
    setFinished(false);
    setHours(0);
    setMinutes(5);
    setSeconds(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (totalSeconds > 0) {
          setIsRunning((prev) => !prev);
        } else {
          handleStart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSeconds, hours, minutes, seconds]);

  const displayHours = Math.floor(totalSeconds / 3600);
  const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  const displaySeconds = totalSeconds % 60;
  const pad = (v) => v.toString().padStart(2, '0');

  const progressPct = initialTotal > 0 ? ((initialTotal - totalSeconds) / initialTotal) * 100 : 0;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          ⏱️ Countdown Timer
        </h2>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 text-gray-500 hover:bg-slate-50 transition-colors"
          title={isMuted ? 'Unmute timer sound' : 'Mute timer sound'}
        >
          {isMuted ? '🔇 Muted' : '🔊 Sound On'}
        </button>
      </div>

      {totalSeconds === 0 && !finished ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center font-medium">Set your timer duration</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Hours', value: hours, setter: setHours, max: 23 },
              { label: 'Minutes', value: minutes, setter: setMinutes, max: 59 },
              { label: 'Seconds', value: seconds, setter: setSeconds, max: 59 },
            ].map(({ label, value, setter, max }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 text-center">{label}</label>
                <input
                  type="number"
                  min="0"
                  max={max}
                  value={value}
                  onChange={(e) => setter(Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="input-field text-center text-2xl font-extrabold text-indigo-700 py-3"
                />
              </div>
            ))}
          </div>
          <button onClick={handleStart} className="btn-primary w-full py-3 text-base font-bold mt-2">
            ▶ Start Timer
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Circular-ish progress indicator */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Time display */}
          <div className={`text-center py-4 rounded-2xl transition-all duration-500 ${
            finished
              ? 'bg-emerald-50 border-2 border-emerald-200'
              : totalSeconds <= 10 && isRunning
                ? 'bg-red-50 border-2 border-red-200 animate-pulse'
                : 'bg-indigo-50 border border-indigo-100'
          }`}>
            <div className={`text-6xl font-extrabold font-mono tracking-tight ${
              finished ? 'text-emerald-600' : totalSeconds <= 10 && isRunning ? 'text-red-600' : 'text-indigo-600'
            }`}>
              {pad(displayHours)}:{pad(displayMinutes)}:{pad(displaySeconds)}
            </div>

            {finished && (
              <p className="mt-2 text-emerald-600 font-bold text-sm animate-bounce">🎉 Time's up!</p>
            )}
            {isRunning && !finished && (
              <div className="mt-2 flex justify-center items-center gap-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-500 font-semibold text-xs uppercase tracking-wide">Running</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center flex-wrap">
            {!isRunning && totalSeconds > 0 && (
              <button onClick={handleResume} className="btn-primary px-5">▶ Resume</button>
            )}
            {isRunning && (
              <button onClick={handlePause} className="btn-primary px-5">⏸ Pause</button>
            )}
            <button onClick={handleReset} className="btn-secondary px-5">↺ Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerWidget;
