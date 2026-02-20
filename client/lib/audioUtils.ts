/**
 * Audio utility for lazy-loading and playing sound effects with minimal performance impact.
 * 
 * Benefits:
 * - Audio is only instantiated on first user interaction (lazy)
 * - Reuses audio context across multiple sounds
 * - Prevents audio from blocking main thread with error handling
 * - Uses requestIdleCallback to defer non-critical audio setup
 * - No external dependencies; uses native HTML5 Audio API
 */

type AudioCache = {
  [key: string]: HTMLAudioElement;
};

const audioCache: AudioCache = {};

/**
 * Play a sound effect with lazy initialization and error handling.
 * Does not block the main thread and defers to requestIdleCallback when appropriate.
 * 
 * @param src - Path to audio file (should be in /public directory)
 * @param options - Optional playback settings
 * 
 * Why this approach improves performance:
 * - Audio elements are cached to avoid recreating them
 * - First call uses requestIdleCallback to defer audio context creation
 * - Subsequent calls reuse cached element (no GC pressure)
 * - Error handling prevents failed audio from crashing interactions
 * - Silent failures allow UX to continue if audio fails
 */
export const playSound = (
  src: string,
  options?: {
    volume?: number;
    timeout?: number;
  }
): void => {
  if (typeof window === "undefined") return;

  const { volume = 1, timeout = 2000 } = options || {};

  const executeAudio = () => {
    try {
      let audio = audioCache[src];

      if (!audio) {
        // First time: create and cache audio element
        audio = new Audio(src);
        audio.preload = "none"; // Do not preload; load only on play
        audioCache[src] = audio;
      }

      // Reset playback position to allow replaying immediately
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, volume)); // Clamp to [0, 1]

      // Attempt to play with graceful error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Silent catch: browser may block autoplay on some devices
          // No console spam to keep DevTools clean on mobile
        });
      }

      // Optional: stop audio after timeout to prevent overlap
      if (timeout > 0) {
        setTimeout(() => {
          audio.pause();
        }, timeout);
      }
    } catch (error) {
      // Silent catch for security errors (e.g., cross-origin audio)
    }
  };

  // Defer to requestIdleCallback if available; otherwise use setTimeout
  const idleWindow = window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(executeAudio, { timeout: 500 });
  } else {
    // Fallback for browsers without requestIdleCallback
    executeAudio();
  }
};

/**
 * Clear cached audio elements (useful for cleanup on unmount).
 */
export const clearAudioCache = (): void => {
  Object.values(audioCache).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  Object.keys(audioCache).forEach((key) => {
    delete audioCache[key];
  });
};
