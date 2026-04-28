import type { ResolvedContent } from "@/lib/newsletter/content";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------------------------------------------------------------
   Design tokens mirrored from the site (client/app/globals.css +
   Newsletter section). Two palettes: a LIGHT baseline used for
   inline styles, and a DARK override applied via class names
   inside an @media (prefers-color-scheme: dark) block. The result
   reads identically to the app in both modes on email clients
   that support color schemes (Apple Mail, iOS Mail, Outlook for
   Mac, Hey, Spark) and falls back gracefully everywhere else.
--------------------------------------------------------------- */
const T = {
  name: "Syed Omer Ali",
  site: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
  ).replace(/\/$/, ""),
  // Light baseline (inline)
  bg: "#ffffff",
  bgSoft: "#f8fafc",
  card: "#ffffff",
  cardInner: "#f8fafc",
  border: "#e2e8f0",
  borderMuted: "#cbd5e1",
  accent: "#f6c400",
  accentInk: "#0E0D09",
  text: "#0f172a",
  textHigh: "#0f172a",
  muted: "#475569",
  mutedLow: "#94a3b8",
  // Email-safe stack with Instagram Sans for clients that have it
  font: "'Instagram Sans','Inter','Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
};

function siteDomain() {
  return T.site.replace(/^https?:\/\//, "");
}

// Hidden preview text shown next to subject in inbox previews
function preheader(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(text)}</div>`;
}

function brandHeader() {
  // Mirrors the site's identity mark: accent square + name on the left,
  // domain in small caps on the right.
  return `
    <tr>
      <td style="padding:28px 32px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="vertical-align:middle;">
              <a href="${T.site}" style="color:${T.text};text-decoration:none;font-family:${T.font};font-weight:700;font-size:14px;letter-spacing:0.2px;" class="e-text">
                <span style="display:inline-block;width:10px;height:10px;background:${T.accent};border-radius:2px;margin-right:10px;vertical-align:middle;"></span>
                <span style="vertical-align:middle;">${escapeHtml(T.name)}</span>
              </a>
            </td>
            <td align="right" style="vertical-align:middle;">
              <a href="${T.site}" style="color:${T.mutedLow};text-decoration:none;font-family:${T.font};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;" class="e-muted-low">
                ${escapeHtml(siteDomain())}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px;">
        <div style="height:1px;background:${T.border};line-height:1px;font-size:0;" class="e-border-bg">&nbsp;</div>
      </td>
    </tr>`;
}

// Small-caps section label, same treatment used for "Newsletter" on the site
function sectionLabel(text: string, color = T.accent) {
  return `
    <tr>
      <td style="padding:26px 32px 0;">
        <p style="margin:0;font-family:${T.font};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${color};">
          ${escapeHtml(text)}
        </p>
      </td>
    </tr>`;
}

function headline(text: string) {
  return `
    <tr>
      <td style="padding:10px 32px 0;">
        <h1 style="margin:0;font-family:${T.font};font-size:26px;line-height:1.28;font-weight:700;color:${T.textHigh};letter-spacing:-0.3px;" class="e-text-high">
          ${escapeHtml(text)}
        </h1>
      </td>
    </tr>`;
}

function paragraph(text: string, { muted = true }: { muted?: boolean } = {}) {
  const color = muted ? T.muted : T.text;
  const cls = muted ? "e-muted" : "e-text";
  return `
    <tr>
      <td style="padding:14px 32px 0;">
        <p style="margin:0;font-family:${T.font};font-size:15px;line-height:1.7;color:${color};" class="${cls}">
          ${escapeHtml(text)}
        </p>
      </td>
    </tr>`;
}

// Dashed card that mirrors the Newsletter subscribe card on the site
function dashedCard(innerHtml: string) {
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px dashed ${T.borderMuted};border-radius:12px;background:${T.cardInner};" class="e-dashed-card">
          <tr>
            <td style="padding:18px 20px;">
              ${innerHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function ctaButton(href: string, label: string) {
  // Bulletproof button. The accent yellow reads identically in light
  // and dark, so no per-mode override is needed.
  return `
    <tr>
      <td style="padding:24px 32px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${T.accent};border-radius:10px;">
              <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 22px;font-family:${T.font};font-size:14px;font-weight:700;color:${T.accentInk};text-decoration:none;letter-spacing:0.2px;">
                ${escapeHtml(label)} &nbsp;&rarr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function secondaryLinks(extras?: { label: string; url: string }[]) {
  if (!extras || extras.length === 0) return "";
  const links = extras
    .map(
      (e, i) => `
        <a href="${escapeHtml(e.url)}" style="font-family:${T.font};font-size:13px;color:${T.text};text-decoration:none;border-bottom:1px solid ${T.borderMuted};padding-bottom:1px;margin-right:${i === extras.length - 1 ? 0 : 18}px;" class="e-text e-border-bottom">
          ${escapeHtml(e.label)} &rarr;
        </a>`
    )
    .join("");
  return `
    <tr>
      <td style="padding:18px 32px 0;">
        ${links}
      </td>
    </tr>`;
}

function tagChips(tags?: string[]) {
  if (!tags || tags.length === 0) return "";
  const chips = tags
    .map(
      (tag) => `
        <span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border:1px solid ${T.borderMuted};border-radius:999px;font-family:${T.mono};font-size:11px;letter-spacing:0.3px;color:${T.muted};background:${T.cardInner};" class="e-chip">
          ${escapeHtml(tag)}
        </span>`
    )
    .join("");
  return `
    <tr>
      <td style="padding:22px 32px 0;line-height:0;">
        ${chips}
      </td>
    </tr>`;
}

// Pull-quote style that mirrors the site's accented note
function noteBlock(text: string) {
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-left:3px solid ${T.accent};padding:6px 0 6px 16px;">
              <p style="margin:0;font-family:${T.font};font-size:15px;line-height:1.65;color:${T.text};font-style:italic;" class="e-text">
                ${escapeHtml(text).replace(/\n/g, "<br />")}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function spacer(height: number) {
  return `
    <tr>
      <td style="height:${height}px;line-height:${height}px;font-size:0;">&nbsp;</td>
    </tr>`;
}

function footerRow(unsubscribeUrl: string) {
  return `
    <tr>
      <td style="padding:28px 32px 0;">
        <div style="height:1px;background:${T.border};line-height:1px;font-size:0;" class="e-border-bg">&nbsp;</div>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:${T.font};font-size:12px;line-height:1.7;color:${T.mutedLow};" class="e-muted-low">
              You are on this list because you subscribed at
              <a href="${T.site}" style="color:${T.muted};text-decoration:none;" class="e-muted">${escapeHtml(siteDomain())}</a>.
              There is no filler here, just a note when something new ships.
            </td>
          </tr>
          <tr>
            <td style="padding-top:10px;font-family:${T.font};font-size:12px;color:${T.mutedLow};" class="e-muted-low">
              <a href="${escapeHtml(unsubscribeUrl)}" style="color:${T.muted};text-decoration:underline;" class="e-muted">Unsubscribe</a>
              &nbsp;&middot;&nbsp;
              <a href="${T.site}" style="color:${T.muted};text-decoration:none;" class="e-muted">Visit website</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:mohdsami038@gmail.com" style="color:${T.muted};text-decoration:none;" class="e-muted">Reply to me</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function shell(rows: string, previewText: string) {
  // Dark mode override block. Email clients that support
  // prefers-color-scheme will pick this up; the rest see the
  // light baseline carried in the inline styles.
  const darkStyle = `
    <style>
      @media (prefers-color-scheme: dark) {
        body, .e-body { background:#0B0D10 !important; color:#ebebeb !important; }
        .e-card { background:#0E0D09 !important; border-color:#2a2a28 !important; }
        .e-dashed-card { background:#0E0D09 !important; border-color:#333333 !important; }
        .e-text { color:#ebebeb !important; }
        .e-text-high { color:#ffffff !important; }
        .e-muted { color:#989898 !important; }
        .e-muted-low { color:#6b6b6b !important; }
        .e-border-bg { background:#333333 !important; }
        .e-border-bottom { border-bottom-color:#333333 !important; }
        .e-chip { background:#0E0D09 !important; border-color:#333333 !important; color:#989898 !important; }
        .e-frame { background:#0B0D10 !important; }
      }
      a { color: inherit; }
    </style>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>${escapeHtml(previewText)}</title>
    ${darkStyle}
    <!--[if mso]>
    <style type="text/css">body,table,td,a { font-family: Arial, sans-serif !important; }</style>
    <![endif]-->
  </head>
  <body class="e-body" style="margin:0;padding:0;background:${T.bgSoft};color:${T.text};-webkit-font-smoothing:antialiased;">
    ${preheader(previewText)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${T.bgSoft};" class="e-frame">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${T.card};border:1px solid ${T.border};border-radius:16px;" class="e-card">
            ${rows}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
            <tr>
              <td align="center" style="padding:18px 14px 0;font-family:${T.font};font-size:11px;color:${T.mutedLow};letter-spacing:0.4px;" class="e-muted-low">
                &copy; ${new Date().getFullYear()} ${escapeHtml(T.name)} &middot; Hyderabad, India
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* -------------------------- Announcement email -------------------------- */

export function renderAnnouncementEmail(params: {
  content: ResolvedContent;
  unsubscribeUrl: string;
  customNote?: string;
}) {
  const { content, unsubscribeUrl, customNote } = params;

  const rows = [
    brandHeader(),
    sectionLabel(content.kindLabel, T.accent),
    headline(content.title),
    paragraph(content.description, { muted: true }),
    customNote ? noteBlock(customNote) : "",
    ctaButton(content.url, content.ctaLabel),
    secondaryLinks(content.extras),
    tagChips(content.tags),
    // "At a glance" dashed card: mirrors the subscribe card on the site
    dashedCard(`
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:${T.mono};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${T.mutedLow};padding-bottom:6px;" class="e-muted-low">
            Link
          </td>
        </tr>
        <tr>
          <td style="font-family:${T.mono};font-size:13px;color:${T.text};word-break:break-all;" class="e-text">
            <a href="${escapeHtml(content.url)}" style="color:${T.text};text-decoration:none;" class="e-text">${escapeHtml(content.url)}</a>
          </td>
        </tr>
      </table>
    `),
    spacer(6),
    footerRow(unsubscribeUrl),
  ].join("");

  return shell(rows, `${content.kindLabel}: ${content.title}`);
}

export function renderAnnouncementText(params: {
  content: ResolvedContent;
  unsubscribeUrl: string;
  customNote?: string;
}) {
  const { content, unsubscribeUrl, customNote } = params;
  const sep = "·".repeat(40);
  const lines = [
    `${T.name} · ${siteDomain()}`,
    sep,
    "",
    content.kindLabel.toUpperCase(),
    content.title,
    "",
    content.description,
  ];
  if (customNote) lines.push("", customNote);
  lines.push("", `${content.ctaLabel}:`, content.url);
  if (content.extras?.length) {
    lines.push("");
    for (const e of content.extras) lines.push(`${e.label}: ${e.url}`);
  }
  if (content.tags?.length) {
    lines.push("", `Tags: ${content.tags.join(", ")}`);
  }
  lines.push("", sep, `Unsubscribe: ${unsubscribeUrl}`);
  return lines.join("\n");
}

/* ---------------------------- Welcome email ----------------------------- */

export function renderWelcomeEmail(unsubscribeUrl: string) {
  const bullet = (label: string, desc: string) => `
    <tr>
      <td style="padding:10px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align:top;padding-right:12px;">
              <span style="display:inline-block;width:6px;height:6px;background:${T.accent};border-radius:999px;margin-top:8px;"></span>
            </td>
            <td>
              <p style="margin:0;font-family:${T.font};font-size:14px;color:${T.text};font-weight:600;line-height:1.5;" class="e-text">${escapeHtml(label)}</p>
              <p style="margin:2px 0 0;font-family:${T.font};font-size:13px;color:${T.muted};line-height:1.55;" class="e-muted">${escapeHtml(desc)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const rows = [
    brandHeader(),
    sectionLabel("Welcome", T.accent),
    headline("You are in. Glad to have you here."),
    paragraph(
      "Thanks for subscribing. You will only hear from me when there is something genuinely worth reading: a new blog post, a shipped project, a fresh case study, or a recent certification.",
      { muted: true }
    ),
    dashedCard(`
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:${T.mono};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${T.mutedLow};padding-bottom:4px;" class="e-muted-low">
            What to expect
          </td>
        </tr>
        ${bullet("Occasional, not weekly", "No digests, no filler. Emails only when I publish something new.")}
        ${bullet("Short and direct", "A line or two about what shipped and why it matters.")}
        ${bullet("Easy to leave", "One click unsubscribe in the footer, no questions asked.")}
      </table>
    `),
    ctaButton(T.site, "Explore the portfolio"),
    spacer(10),
    paragraph(
      "If you ever want to say hi, just hit reply. These emails come straight from me.",
      { muted: true }
    ),
    spacer(6),
    footerRow(unsubscribeUrl),
  ].join("");

  return shell(rows, "Welcome to Syed Omer Ali's newsletter");
}

export function renderWelcomeText(unsubscribeUrl: string) {
  const sep = "·".repeat(40);
  return [
    `${T.name} · ${siteDomain()}`,
    sep,
    "",
    "WELCOME",
    "You are in. Glad to have you here.",
    "",
    "Thanks for subscribing. You will only hear from me when there is something genuinely worth reading: a new blog post, a shipped project, a fresh case study, or a recent certification.",
    "",
    "What to expect:",
    "  • Occasional, not weekly",
    "  • Short and direct",
    "  • One click unsubscribe",
    "",
    `Explore the portfolio: ${T.site}`,
    "",
    "Reply to this email any time to say hi.",
    "",
    sep,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");
}
