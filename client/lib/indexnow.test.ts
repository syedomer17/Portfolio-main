import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { notifyIndexNow } from './indexnow';

describe('notifyIndexNow', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
    // Suppress console logs during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('successfully notifies a single URL', async () => {
    (global.fetch as any).mockResolvedValue({ ok: true, status: 200 });

    const result = await notifyIndexNow('https://example.com/test');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: 1, failed: 0, total: 1 });
  });

  it('successfully notifies multiple URLs', async () => {
    (global.fetch as any).mockResolvedValue({ ok: true, status: 200 });

    const urls = ['https://example.com/1', 'https://example.com/2'];
    // Fast delay for testing
    const result = await notifyIndexNow(urls, { delayMs: 1 });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ success: 2, failed: 0, total: 2 });
  });

  it('handles invalid URL format', async () => {
    const result = await notifyIndexNow('invalid-url');

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual({ success: 0, failed: 1, total: 1 });
  });

  it('handles HTTP errors when throwOnError is false', async () => {
    (global.fetch as any).mockResolvedValue({ ok: false, status: 500 });

    const result = await notifyIndexNow('https://example.com/error');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: 0, failed: 1, total: 1 });
  });

  it('throws on HTTP errors when throwOnError is true', async () => {
    (global.fetch as any).mockResolvedValue({ ok: false, status: 500 });

    await expect(
      notifyIndexNow('https://example.com/error', { throwOnError: true })
    ).rejects.toThrow('IndexNow API returned 500');
  });
});
