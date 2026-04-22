import type { ResolvedContent } from "@/lib/newsletter/content";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Design tokens mirrored from the site (client/app/globals.css + Newsletter section)
const T = {
  name: "Syed Omer Ali",
  site: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me"
  ).replace(/\/$/, ""),
  // Colors
  bg: "#0E0D09",
  card: "#141310",
  cardInner: "#0E0D09",
  border: "#2A2A28",
  borderMuted: "#333333",
  accent: "#f6c400",
  accentInk: "#0E0D09",
  text: "#EBEBEB",
  textHigh: "#FFFFFF",
  muted: "#989898",
  mutedLow: "#6B6B6B",
  // Typography — email-safe stack with Instagram Sans fallback for clients that happen to have it
  font: "'Instagram Sans','Inter','Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
};

function siteDomain() {
  return T.site.replace(/^https?:\/\//, "");
}

// Preheader text — hidden preview that shows in inbox list next to subject
function preheader(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(text)}</div>`;
}

function brandHeader() {
  // Mirrors the site's top-left identity: accent square + name
  return `
    <tr>
      <td style="padding:28px 32px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align:middle;">
              <a href="${T.site}" style="color:${T.text};text-decoration:none;font-family:${T.font};font-weight:700;font-size:14px;letter-spacing:0.2px;">
                <span style="display:inline-block;width:10px;height:10px;background:${T.accent};border-radius:2px;margin-right:10px;vertical-align:middle;"></span>
                <span style="vertical-align:middle;">${escapeHtml(T.name)}</span>
              </a>
            </td>
            <td align="right" style="vertical-align:middle;">
              <a href="${T.site}" style="color:${T.mutedLow};text-decoration:none;font-family:${T.font};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;">
                ${escapeHtml(siteDomain())}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px;">
        <div style="height:1px;background:${T.borderMuted};line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>`;
}

// The site uses small-caps labels above section content (e.g. the "Newsletter" header)
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
        <h1 style="margin:0;font-family:${T.font};font-size:26px;line-height:1.28;font-weight:700;color:${T.textHigh};letter-spacing:-0.3px;">
          ${escapeHtml(text)}
        </h1>
      </td>
    </tr>`;
}

function paragraph(text: string, { muted = true }: { muted?: boolean } = {}) {
  const color = muted ? T.muted : T.text;
  return `
    <tr>
      <td style="padding:14px 32px 0;">
        <p style="margin:0;font-family:${T.font};font-size:15px;line-height:1.7;color:${color};">
          ${escapeHtml(text)}
        </p>
      </td>
    </tr>`;
}

// "Dashed card" — matches the Newsletter subscribe card on the site
function dashedCard(innerHtml: string) {
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px dashed ${T.borderMuted};border-radius:12px;">
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
  // Bulletproof button pattern for Outlook + modern clients
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
        <a href="${escapeHtml(e.url)}" style="font-family:${T.font};font-size:13px;color:${T.text};text-decoration:none;border-bottom:1px solid ${T.borderMuted};padding-bottom:1px;margin-right:${i === extras.length - 1 ? 0 : 18}px;">
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
        <span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border:1px solid ${T.borderMuted};border-radius:999px;font-family:${T.mono};font-size:11px;letter-spacing:0.3px;color:${T.muted};background:${T.cardInner};">
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

// Block-quote style that mirrors the site's pull-quote
function noteBlock(text: string) {
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-left:3px solid ${T.accent};padding:6px 0 6px 16px;">
              <p style="margin:0;font-family:${T.font};font-size:15px;line-height:1.65;color:${T.text};font-style:italic;">
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
        <div style="height:1px;background:${T.borderMuted};line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:${T.font};font-size:12px;line-height:1.7;color:${T.mutedLow};">
              You're on this list because you subscribed at
              <a href="${T.site}" style="color:${T.muted};text-decoration:none;">${escapeHtml(siteDomain())}</a>.
              No filler — I only email when there's new work.
            </td>
          </tr>
          <tr>
            <td style="padding-top:10px;font-family:${T.font};font-size:12px;color:${T.mutedLow};">
              <a href="${escapeHtml(unsubscribeUrl)}" style="color:${T.muted};text-decoration:underline;">Unsubscribe</a>
              &nbsp;&middot;&nbsp;
              <a href="${T.site}" style="color:${T.muted};text-decoration:none;">Visit website</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:mohdsami038@gmail.com" style="color:${T.muted};text-decoration:none;">Reply to me</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function shell(rows: string, previewText: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark only" />
    <meta name="supported-color-schemes" content="dark" />
    <title>${escapeHtml(previewText)}</title>
    <!--[if mso]>
    <style type="text/css">body,table,td,a { font-family: Arial, sans-serif !important; }</style>
    <![endif]-->
  </head>
  <body style="margin:0;padding:0;background:${T.bg};color:${T.text};-webkit-font-smoothing:antialiased;">
    ${preheader(previewText)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${T.bg};">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${T.card};border:1px solid ${T.border};border-radius:16px;">
            ${rows}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
            <tr>
              <td align="center" style="padding:18px 14px 0;font-family:${T.font};font-size:11px;color:${T.mutedLow};letter-spacing:0.4px;">
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
    // "At a glance" dashed card — mirrors the subscribe card on the site
    dashedCard(`
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:${T.mono};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${T.mutedLow};padding-bottom:6px;">
            Link
          </td>
        </tr>
        <tr>
          <td style="font-family:${T.mono};font-size:13px;color:${T.text};word-break:break-all;">
            <a href="${escapeHtml(content.url)}" style="color:${T.text};text-decoration:none;">${escapeHtml(content.url)}</a>
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
  const lines = [
    `${T.name} — ${siteDomain()}`,
    "—".repeat(32),
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
  lines.push("", "—".repeat(32), `Unsubscribe: ${unsubscribeUrl}`);
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
              <p style="margin:0;font-family:${T.font};font-size:14px;color:${T.text};font-weight:600;line-height:1.5;">${escapeHtml(label)}</p>
              <p style="margin:2px 0 0;font-family:${T.font};font-size:13px;color:${T.muted};line-height:1.55;">${escapeHtml(desc)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const rows = [
    brandHeader(),
    sectionLabel("Welcome", T.accent),
    headline("You're in — glad to have you."),
    paragraph(
      "Thanks for subscribing. You'll only hear from me when there's something worth reading — a new blog post, a shipped project, a case study, or a certification.",
      { muted: true }
    ),
    dashedCard(`
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-family:${T.mono};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${T.mutedLow};padding-bottom:4px;">
            What to expect
          </td>
        </tr>
        ${bullet("Occasional, not weekly", "No digests, no filler. Emails only when I publish.")}
        ${bullet("Short and direct", "A line or two about what I shipped and why it matters.")}
        ${bullet("Easy to leave", "One-click unsubscribe in the footer. No questions asked.")}
      </table>
    `),
    ctaButton(T.site, "Explore the portfolio"),
    spacer(10),
    paragraph(
      "If you ever want to say hi, just hit reply — these emails come from me directly.",
      { muted: true }
    ),
    spacer(6),
    footerRow(unsubscribeUrl),
  ].join("");

  return shell(rows, "Welcome to Syed Omer Ali's newsletter");
}

export function renderWelcomeText(unsubscribeUrl: string) {
  return [
    `${T.name} — ${siteDomain()}`,
    "—".repeat(32),
    "",
    "WELCOME",
    "You're in — glad to have you.",
    "",
    "Thanks for subscribing. You'll only hear from me when there's something worth reading — a new blog post, a shipped project, a case study, or a certification.",
    "",
    "What to expect:",
    "  • Occasional, not weekly",
    "  • Short and direct",
    "  • One-click unsubscribe",
    "",
    `Explore the portfolio: ${T.site}`,
    "",
    "Reply to this email any time to say hi.",
    "",
    "—".repeat(32),
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");
}
