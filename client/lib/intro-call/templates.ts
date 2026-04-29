function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const T = {
  name: "Syed Omer Ali",
  site: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.syedomer.me").replace(
    /\/$/,
    "",
  ),
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
  font: "'Instagram Sans','Inter','Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
};

function siteDomain() {
  return T.site.replace(/^https?:\/\//, "");
}

function preheader(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(text)}</div>`;
}

function brandHeader() {
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

function detailsCard(rows: { label: string; value: string }[]) {
  const inner = rows
    .map(
      (r) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${T.border};" class="e-row-border">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${T.mono};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${T.mutedLow};width:90px;vertical-align:top;padding-right:14px;" class="e-muted-low">
                  ${escapeHtml(r.label)}
                </td>
                <td style="font-family:${T.font};font-size:14px;line-height:1.55;color:${T.text};word-break:break-word;" class="e-text">
                  ${r.value}
                </td>
              </tr>
            </table>
          </td>
        </tr>`,
    )
    .join("");
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px dashed ${T.borderMuted};border-radius:12px;background:${T.cardInner};" class="e-dashed-card">
          <tr>
            <td style="padding:6px 20px 14px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${inner}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function ctaButton(href: string, label: string) {
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

function noteBlock(label: string, text: string) {
  return `
    <tr>
      <td style="padding:22px 32px 0;">
        <p style="margin:0 0 6px;font-family:${T.mono};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${T.mutedLow};" class="e-muted-low">
          ${escapeHtml(label)}
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-left:3px solid ${T.accent};padding:6px 0 6px 16px;">
              <p style="margin:0;font-family:${T.font};font-size:14px;line-height:1.65;color:${T.text};" class="e-text">
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

function footerRow() {
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
              If something comes up and you need to reschedule, just reply to this email and I will sort it out.
            </td>
          </tr>
          <tr>
            <td style="padding-top:10px;font-family:${T.font};font-size:12px;color:${T.mutedLow};" class="e-muted-low">
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
        .e-row-border { border-color:#222222 !important; }
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

function meetLinkValueHtml(meetLink: string) {
  const safe = escapeHtml(meetLink);
  return `<a href="${safe}" style="color:${T.text};text-decoration:none;border-bottom:1px solid ${T.borderMuted};" class="e-text">${safe}</a>`;
}

function plainValue(text: string) {
  return escapeHtml(text);
}

export type IntroCallEmailData = {
  hostName: string;
  attendeeName: string;
  attendeeEmail: string;
  dateLabel: string;
  timeLabel: string;
  timezone: string;
  durationMinutes: number;
  location: "Google Meet" | "Phone";
  meetLink?: string;
  phoneNumber?: string;
  notes?: string;
  calendarUrl: string;
  guests?: string[];
};

function buildDetailRows(data: IntroCallEmailData) {
  const rows: { label: string; value: string }[] = [
    { label: "When", value: plainValue(`${data.dateLabel}`) },
    {
      label: "Time",
      value: plainValue(`${data.timeLabel} (${data.timezone})`),
    },
    { label: "Length", value: plainValue(`${data.durationMinutes} minutes`) },
    { label: "Where", value: plainValue(data.location) },
  ];
  if (data.location === "Google Meet" && data.meetLink) {
    rows.push({ label: "Meet link", value: meetLinkValueHtml(data.meetLink) });
  }
  if (data.location === "Phone" && data.phoneNumber) {
    rows.push({ label: "Phone", value: plainValue(data.phoneNumber) });
  }
  if (data.guests && data.guests.length) {
    rows.push({
      label: "Guests",
      value: plainValue(data.guests.join(", ")),
    });
  }
  return rows;
}

export function renderAttendeeEmail(data: IntroCallEmailData) {
  const greeting = `Hi ${data.attendeeName.split(" ")[0] || data.attendeeName},`;
  const lead =
    data.location === "Google Meet" && data.meetLink
      ? "Your intro call is booked. The Meet link below will work right when the call starts."
      : data.location === "Phone"
        ? "Your intro call is booked. I will call the number below at the scheduled time."
        : "Your intro call is booked. Details are below so you have everything in one place.";

  const rows = [
    brandHeader(),
    sectionLabel("Booking confirmed"),
    headline("Your intro call is set"),
    paragraph(greeting, { muted: false }),
    paragraph(lead, { muted: true }),
    detailsCard(buildDetailRows(data)),
    data.notes ? noteBlock("Your notes", data.notes) : "",
    ctaButton(data.calendarUrl, "Add to Google Calendar"),
    spacer(6),
    paragraph(
      "Reply to this email if anything changes or if you want to share something I should look at before we talk.",
      { muted: true },
    ),
    spacer(6),
    footerRow(),
  ].join("");

  return shell(rows, "Your intro call with Syed Omer Ali is booked");
}

export function renderAttendeeText(data: IntroCallEmailData) {
  const sep = "·".repeat(40);
  const lines = [
    `${T.name} · ${siteDomain()}`,
    sep,
    "",
    "BOOKING CONFIRMED",
    "Your intro call is set.",
    "",
    `Hi ${data.attendeeName},`,
    "",
    "Here are the details:",
    "",
    `When: ${data.dateLabel}`,
    `Time: ${data.timeLabel} (${data.timezone})`,
    `Length: ${data.durationMinutes} minutes`,
    `Where: ${data.location}`,
  ];
  if (data.location === "Google Meet" && data.meetLink) {
    lines.push(`Meet link: ${data.meetLink}`);
  }
  if (data.location === "Phone" && data.phoneNumber) {
    lines.push(`Phone: ${data.phoneNumber}`);
  }
  if (data.guests && data.guests.length) {
    lines.push(`Guests: ${data.guests.join(", ")}`);
  }
  if (data.notes) {
    lines.push("", "Your notes:", data.notes);
  }
  lines.push("", `Add to Google Calendar: ${data.calendarUrl}`);
  lines.push(
    "",
    "Reply to this email if you need to reschedule or share anything ahead of the call.",
    "",
    sep,
  );
  return lines.join("\n");
}

export function renderGuestEmail(data: IntroCallEmailData) {
  const lead = `${data.attendeeName} added you as a guest to an intro call with ${data.hostName}. Here are the details so you can join at the scheduled time.`;
  const rows = [
    brandHeader(),
    sectionLabel("You are invited"),
    headline(`${data.attendeeName} added you to an intro call`),
    paragraph(lead, { muted: true }),
    detailsCard(buildDetailRows(data)),
    data.notes ? noteBlock("Notes from the host", data.notes) : "",
    ctaButton(data.calendarUrl, "Add to Google Calendar"),
    spacer(6),
    paragraph(
      "If you have any questions before the call, reply to this email and I will get back to you.",
      { muted: true },
    ),
    spacer(6),
    footerRow(),
  ].join("");

  return shell(
    rows,
    `${data.attendeeName} added you to an intro call with ${data.hostName}`,
  );
}

export function renderGuestText(data: IntroCallEmailData) {
  const sep = "·".repeat(40);
  const lines = [
    `${T.name} · ${siteDomain()}`,
    sep,
    "",
    "YOU ARE INVITED",
    `${data.attendeeName} added you to an intro call with ${data.hostName}.`,
    "",
    `When: ${data.dateLabel}`,
    `Time: ${data.timeLabel} (${data.timezone})`,
    `Length: ${data.durationMinutes} minutes`,
    `Where: ${data.location}`,
  ];
  if (data.location === "Google Meet" && data.meetLink) {
    lines.push(`Meet link: ${data.meetLink}`);
  }
  if (data.location === "Phone" && data.phoneNumber) {
    lines.push(`Phone: ${data.phoneNumber}`);
  }
  if (data.notes) {
    lines.push("", "Notes from the host:", data.notes);
  }
  lines.push("", `Add to Google Calendar: ${data.calendarUrl}`);
  lines.push("", sep);
  return lines.join("\n");
}
