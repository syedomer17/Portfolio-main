/**
 * IndexNow Helper Utility
 * 
 * Makes it easy to notify search engines about content changes.
 * Use this whenever you publish, update, or delete content.
 * 
 * @example
 * ```typescript
 * // Single URL
 * await notifyIndexNow('https://syedomer.me/blogs/new-post');
 * 
 * // Multiple URLs
 * await notifyIndexNow([
 *   'https://syedomer.me/blogs/post-1',
 *   'https://syedomer.me/blogs/post-2'
 * ]);
 * ```
 */

const SITE_URL = 'https://syedomer.me';
const INDEXNOW_ENDPOINT = '/api/indexnow';

/**
 * Notify search engines via IndexNow about URL changes.
 * 
 * @param urls - Single URL string or array of URLs to notify
 * @param options - Configuration options
 * @returns Promise that resolves when all notifications are sent
 * 
 * @example
 * // After publishing a blog post
 * await notifyIndexNow(`https://syedomer.me/blogs/my-new-post`);
 * 
 * // After updating multiple projects
 * await notifyIndexNow([
 *   'https://syedomer.me/projects/project-1',
 *   'https://syedomer.me/projects/project-2'
 * ]);
 */
export async function notifyIndexNow(
  urls: string | string[],
  options?: {
    /** Whether to log results to console (default: true in dev, false in prod) */
    verbose?: boolean;
    /** Delay between requests in ms (default: 1100) */
    delayMs?: number;
    /** Whether to throw on error (default: false - silent fail) */
    throwOnError?: boolean;
  }
): Promise<{ success: number; failed: number; total: number }> {
  const {
    verbose = process.env.NODE_ENV === 'development',
    delayMs = 1100, // Rate limit: ~1 request per second
    throwOnError = false,
  } = options || {};

  const urlList = Array.isArray(urls) ? urls : [urls];
  const results = { success: 0, failed: 0, total: urlList.length };

  for (const url of urlList) {
    try {
      // Validate URL format
      if (!url.startsWith('http')) {
        throw new Error(`Invalid URL format: ${url} (must be absolute URL)`);
      }

      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        results.success++;
        if (verbose) {
          console.log(`✅ IndexNow notified: ${url}`);
        }
      } else {
        results.failed++;
        if (verbose) {
          console.warn(`⚠️ IndexNow failed (${response.status}): ${url}`);
        }
        if (throwOnError) {
          throw new Error(`IndexNow API returned ${response.status}`);
        }
      }
    } catch (error) {
      results.failed++;
      if (verbose) {
        console.error(`❌ IndexNow error for ${url}:`, error);
      }
      if (throwOnError) {
        throw error;
      }
    }

    // Rate limiting: wait between requests
    if (urlList.length > 1 && urlList.indexOf(url) < urlList.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  if (verbose && urlList.length > 1) {
    console.log(
      `📊 IndexNow Summary: ${results.success}/${results.total} successful`
    );
  }

  return results;
}

/**
 * Notify IndexNow about a blog post (convenience wrapper).
 * 
 * @param slug - Blog post slug (e.g., "my-new-post")
 */
export async function notifyBlogPost(slug: string) {
  return notifyIndexNow(`${SITE_URL}/blogs/${slug}`);
}

/**
 * Notify IndexNow about a project (convenience wrapper).
 * 
 * @param slug - Project slug
 */
export async function notifyProject(slug: string) {
  return notifyIndexNow(`${SITE_URL}/projects/${slug}`);
}

/**
 * Notify IndexNow about a case study (convenience wrapper).
 * 
 * @param slug - Case study slug
 */
export async function notifyCaseStudy(slug: string) {
  return notifyIndexNow(`${SITE_URL}/case-studies/${slug}`);
}

/**
 * Notify IndexNow about main section pages (convenience wrapper).
 * Useful after major site updates or deploys.
 */
export async function notifyMainPages() {
  return notifyIndexNow([
    SITE_URL,
    `${SITE_URL}/about`,
    `${SITE_URL}/projects`,
    `${SITE_URL}/blogs`,
    `${SITE_URL}/services`,
    `${SITE_URL}/certifications`,
    `${SITE_URL}/experiences`,
  ]);
}

/**
 * Schedule IndexNow notification to run after a delay.
 * Useful to wait for CDN cache to update before notifying search engines.
 * 
 * @param urls - URL(s) to notify
 * @param delayMs - Delay in milliseconds (default: 5000ms = 5 seconds)
 */
export function scheduleIndexNowNotification(
  urls: string | string[],
  delayMs: number = 5000
) {
  setTimeout(() => {
    notifyIndexNow(urls).catch((error) => {
      console.error('Scheduled IndexNow notification failed:', error);
    });
  }, delayMs);
}
