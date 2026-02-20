# IndexNow Implementation Guide

## What is IndexNow?

IndexNow is a simple protocol that allows websites to instantly notify search engines about content changes (new, updated, or deleted URLs). It was created by Microsoft (Bing) and Yandex, and is now supported by multiple search engines.

**Benefits:**
- ⚡ **Instant indexing** - Search engines discover your changes immediately instead of waiting for crawls
- 🚀 **Faster ranking** - New content appears in search results within minutes to hours
- 💚 **Eco-friendly** - Reduces unnecessary crawling, saving server resources and energy
- 🆓 **Free** - No cost to use

**Supported Search Engines:**
- Bing (Microsoft)
- Yandex
- Seznam.cz
- Naver (via Bing partnership)

---

## Your Current Setup

**API Endpoint:** `/api/indexnow`  
**Key:** `16d89017-b30f-4066-8c65-99ece2a9316c`  
**Key File Location:** `/public/16d89017-b30f-4066-8c65-99ece2a9316c.txt`  
**Domain:** `syedomer.me`

---

## When to Use IndexNow

### ✅ Use For:

1. **New Blog Posts**
   ```
   Publish blog → Notify IndexNow → Search engines index immediately
   ```

2. **Updated Content**
   ```
   Edit existing page → Notify IndexNow → Search engines re-crawl
   ```

3. **New Projects/Case Studies**
   ```
   Add new project → Notify IndexNow → Appears in Bing/Yandex
   ```

4. **Deleted Pages**
   ```
   Remove page → Notify IndexNow → Search engines remove from index
   ```

5. **Major Content Updates**
   ```
   Rewrite service page → Notify IndexNow → Fresh content indexed
   ```

### ❌ Don't Use For:

- Minor typo fixes
- CSS/styling changes
- Changes that don't affect content (like adding analytics)
- Every single page on deploy (rate limits apply)
- Internal API routes or admin pages

---

## How to Use IndexNow

### Method 1: Manual API Call (For Testing)

**Using cURL:**
```bash
# Test from terminal
curl -X POST https://syedomer.me/api/indexnow \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://syedomer.me/blogs/new-post"
  }'
```

**Using Postman:**

1. Create a new POST request
2. Set URL: `https://syedomer.me/api/indexnow`
3. Go to **Headers** tab:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to **Body** tab:
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter:
     ```json
     {
       "url": "https://syedomer.me/blogs/your-blog-slug"
     }
     ```
5. Click **Send**

**Expected Response (Success):**
```json
{
  "success": true,
  "status": 200,
  "message": "Search engines notified successfully"
}
```

**Expected Response (Error):**
```json
{
  "success": false,
  "error": "Rate limited. Please wait before submitting more URLs.",
  "status": 429
}
```

### Method 2: From Your Code (Automated)

**Example: Notify when publishing a new blog post**

```typescript
// In your blog publish handler or CMS
async function publishBlog(slug: string) {
  // 1. Save/publish the blog
  await saveBlogToDatabase(slug);

  // 2. Notify IndexNow
  try {
    await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: \`https://syedomer.me/blogs/\${slug}\`
      })
    });
  } catch (error) {
    console.error('IndexNow notification failed:', error);
    // Don't block publish if IndexNow fails
  }
}
```

**Example: Batch notify multiple URLs**

```typescript
// Notify search engines about all projects
async function notifyAllProjects(projectSlugs: string[]) {
  for (const slug of projectSlugs) {
    await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: \`https://syedomer.me/projects/\${slug}\`
      })
    });
    
    // Rate limit: wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### Method 3: Post-Deploy Hook (CI/CD)

Add to your GitHub Actions or Vercel deploy script:

```yaml
# .github/workflows/deploy.yml
- name: Notify IndexNow
  run: |
    curl -X POST https://syedomer.me/api/indexnow \\
      -H "Content-Type: application/json" \\
      -d '{"url": "https://syedomer.me"}'
```

---

## Integration Examples

### 1. Blog Publishing Workflow

```typescript
// app/api/blogs/publish/route.ts
export async function POST(req: Request) {
  const { slug, content } = await req.json();
  
  // Save blog
  await db.blogs.create({ slug, content });
  
  // Notify IndexNow (fire-and-forget)
  fetch('/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: \`https://syedomer.me/blogs/\${slug}\`
    })
  }).catch(console.error);
  
  return Response.json({ success: true });
}
```

### 2. Sitemap + IndexNow Strategy

When you deploy new content:

```typescript
// scripts/notify-search-engines.ts
const NEW_URLS = [
  'https://syedomer.me/blogs/new-article',
  'https://syedomer.me/projects/new-project',
];

async function notifySearchEngines() {
  for (const url of NEW_URLS) {
    await fetch('https://syedomer.me/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
  }
}

notifySearchEngines();
```

---

## Best Practices

### 1. Rate Limiting
- Don't spam IndexNow with every request
- Wait at least 1 second between URL submissions
- Batch updates when possible

### 2. URL Format
```typescript
// ✅ Correct - Full absolute URL
{ url: "https://syedomer.me/blogs/post" }

// ❌ Wrong - Relative path
{ url: "/blogs/post" }
```

### 3. Error Handling
```typescript
try {
  const res = await fetch('/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: newUrl })
  });
  
  if (!res.ok) {
    console.warn('IndexNow failed, but content is live');
  }
} catch (error) {
  // Never block user-facing operations
  console.error('IndexNow error:', error);
}
```

### 4. When to Re-notify
- ✅ Content changed significantly (paragraphs rewritten)
- ✅ New sections added
- ✅ Page structure changed
- ❌ Fixed a typo
- ❌ Changed button color

### 5. Environment Variables

**Q: Should NODE_ENV be set to production?**  
**A:** Yes, in production environments.

**How it affects IndexNow:**

```typescript
// Development (NODE_ENV=development)
// ✅ Verbose logging enabled
// ✅ All errors logged to console
// ✅ Each IndexNow request details printed

// Production (NODE_ENV=production)
// ✅ Silent operation (no console spam)
// ✅ Errors still caught and handled
// ✅ Only critical errors logged
```

**Current Implementation:**
- API Route: Logs only in development (`process.env.NODE_ENV === 'development'`)
- Helper Library: Verbose mode auto-enabled in development

**For Local Testing:**
```bash
# Use development mode (verbose)
NODE_ENV=development npm run dev

# Test production behavior locally
NODE_ENV=production npm run dev
```

**For Vercel Production:**
Vercel automatically sets `NODE_ENV=production` - no configuration needed.

**Override verbose logging in production (if needed):**
```typescript
// Force logging even in production
await notifyIndexNow(url, { verbose: true });

// Force silent mode even in development
await notifyIndexNow(url, { verbose: false });
```

---

## Verifying It Works

### Check Bing Index Status
1. Go to: https://www.bing.com/webmasters
2. Add your site if not already added
3. Check URL Inspection tool for your submitted URLs
4. Typically indexed within 1-24 hours

### Monitor in Logs
Add logging to your IndexNow route:

```typescript
// app/api/indexnow/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const { url } = body;

  console.log('[IndexNow] Notifying:', url);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "syedomer.me",
      key: "16d89017-b30f-4066-8c65-99ece2a9316c",
      urlList: [url],
    }),
  });

  console.log('[IndexNow] Response:', response.status);

  return NextResponse.json({
    success: response.ok,
    status: response.status
  });
}
```

---

## Common Issues

### 1. "Invalid Key" Error
**Cause:** Key file missing or incorrect  
**Fix:** Ensure `/public/16d89017-b30f-4066-8c65-99ece2a9316c.txt` exists with just the key as content

### 2. "Rate Limited" Error
**Cause:** Too many requests  
**Fix:** Wait 1+ seconds between submissions

### 3. URLs Not Indexed
**Cause:** Various (robots.txt blocking, low content quality, etc.)  
**Fix:** 
- Check robots.txt allows crawling
- Verify URL is publicly accessible
- Ensure content is substantial (not thin content)

---

## Quick Start Checklist

- [x] IndexNow API route exists at \`/api/indexnow\`
- [x] Key file exists at \`/public/16d89017-b30f-4066-8c65-99ece2a9316c.txt\`
- [ ] Test API manually: \`curl -X POST https://syedomer.me/api/indexnow -d '{"url":"https://syedomer.me"}'\`
- [ ] Integrate into blog/project publishing workflow
- [ ] Add to deploy scripts for major updates
- [ ] Monitor Bing Webmaster Tools for indexing status

---

## Example: Full Production Setup

```typescript
// lib/indexnow.ts
export async function notifyIndexNow(urls: string | string[]) {
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  for (const url of urlList) {
    try {
      const res = await fetch('/api/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (res.ok) {
        console.log('✅ IndexNow notified:', url);
      } else {
        console.warn('⚠️ IndexNow failed:', url, res.status);
      }
    } catch (error) {
      console.error('❌ IndexNow error:', url, error);
    }
    
    // Rate limit: 1 request per second
    if (urlList.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 1100));
    }
  }
}

// Usage in your code:
// await notifyIndexNow('https://syedomer.me/blogs/new-post');
// await notifyIndexNow([url1, url2, url3]);
```

---

## Resources

- **IndexNow Docs:** https://www.indexnow.org/documentation
- **Bing Webmaster Tools:** https://www.bing.com/webmasters
- **Test Your Setup:** https://www.indexnow.org/
- **Status Codes:** 
  - 200 = Success
  - 202 = Accepted (queued)
  - 400 = Bad request
  - 403 = Forbidden (invalid key)
  - 429 = Rate limited

---

**Bottom Line:**  
Use IndexNow whenever you publish, update, or delete significant content. It's a simple POST request that helps search engines discover your changes faster. Low effort, high impact for SEO.
