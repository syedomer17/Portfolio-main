import nodemailer, { type Transporter } from "nodemailer";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
};

export function getSmtpConfig(): SmtpConfig | { error: string } {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_FROM"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    return { error: `Missing SMTP env: ${missing.join(", ")}` };
  }
  const port = Number(process.env.SMTP_PORT);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (!process.env.SMTP_SECURE && port === 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if ((user && !pass) || (!user && pass)) {
    return { error: "SMTP_USER and SMTP_PASS must be set together" };
  }
  return {
    host: process.env.SMTP_HOST!,
    port: Number.isFinite(port) ? port : 465,
    secure,
    user,
    pass,
    from: process.env.NEWSLETTER_FROM || process.env.SMTP_FROM!,
  };
}

export function createPooledTransporter(cfg: SmtpConfig): Transporter {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.user && cfg.pass ? { user: cfg.user, pass: cfg.pass } : undefined,
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    family: 4,
  } as any);
}

export type SendResult = {
  sent: number;
  failed: number;
  failures: { email: string; reason: string }[];
};

export async function sendBulkPerRecipient(params: {
  transporter: Transporter;
  from: string;
  recipients: { email: string; unsubscribeUrl: string }[];
  subject: string;
  render: (input: { unsubscribeUrl: string }) => { html: string; text: string };
  concurrency?: number;
  batchDelayMs?: number;
  listUnsubscribeBase?: string; // e.g. https://syedomer.me/api/newsletter/unsubscribe
}): Promise<SendResult> {
  const concurrency = Math.max(1, params.concurrency ?? 3);
  const delay = Math.max(0, params.batchDelayMs ?? 150);
  const result: SendResult = { sent: 0, failed: 0, failures: [] };

  let cursor = 0;
  const workers: Promise<void>[] = [];

  const sendOne = async (r: { email: string; unsubscribeUrl: string }) => {
    const body = params.render({ unsubscribeUrl: r.unsubscribeUrl });
    try {
      await params.transporter.sendMail({
        from: params.from,
        to: r.email,
        subject: params.subject,
        html: body.html,
        text: body.text,
        headers: {
          "List-Unsubscribe": `<${r.unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      result.sent += 1;
    } catch (err) {
      result.failed += 1;
      result.failures.push({
        email: r.email,
        reason: err instanceof Error ? err.message : String(err),
      });
    }
  };

  const worker = async () => {
    while (true) {
      const i = cursor++;
      if (i >= params.recipients.length) return;
      await sendOne(params.recipients[i]);
      if (delay) await new Promise((res) => setTimeout(res, delay));
    }
  };

  for (let i = 0; i < concurrency; i++) workers.push(worker());
  await Promise.all(workers);

  return result;
}
