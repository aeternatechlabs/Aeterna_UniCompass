interface MeetingEmailData {
  fullName: string;
  email: string;
  phone: string;
  preferredLocation?: string;
  preferredDate: Date | string;
  preferredTime: string;
  duration: 30 | 60;
  purpose: string;
}

const escapeHtml = (value: string): string => {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char);
};

const sanitizeSenderName = (name: string = ""): string => {
  return (
    name
      .replace(/[\r\n<>"]/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Student"
  );
};

const extractEmailAddress = (raw: string = ""): string => {
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  const angleMatch = trimmed.match(/<([^>]+)>/);
  const candidate = (angleMatch?.[1] ?? trimmed).trim();
  const emailRegex = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

  if (!emailRegex.test(candidate)) {
    throw new Error(`Invalid SENDER_EMAIL format in .env: "${raw}"`);
  }

  return candidate;
};

const normalizeBranchTag = (preferredLocation?: string): string => {
  const trimmed = preferredLocation?.trim();
  if (!trimmed) return "";

  const lower = trimmed.toLowerCase();
  if (lower === "bangalore" || lower === "bengaluru") return "[Bengaluru] ";
  if (lower === "mysore" || lower === "mysuru") return "[Mysuru] ";
  if (lower === "belagavi" || lower === "belgaum") return "[Belagavi] ";

  return `[${trimmed}] `;
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

const sendResendEmail = async (payload: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `Resend API error (${response.status}): ${JSON.stringify(result)}`,
    );
  }

  return result;
};

const createEmailTemplate = (
  heading: string,
  message: string,
  data: MeetingEmailData,
  isAdmin: boolean,
) => {
  const rows = [
    ["Student Name", data.fullName],
    ["Email Address", data.email],
    ["Phone Number", data.phone],
    ...(data.preferredLocation
      ? [["Preferred Location", data.preferredLocation]]
      : []),
    ["Preferred Date", formatDate(data.preferredDate)],
    ["Preferred Time", data.preferredTime],
    ["Duration", `${data.duration} minutes`],
    ["Meeting Purpose", data.purpose],
  ];

  const detailsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 8px;color:#64748b;font-size:14px;border-bottom:1px solid #e5e7eb;">
            ${escapeHtml(String(label ?? ""))}
          </td>
          <td style="padding:12px 8px;color:#1e293b;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">
            ${escapeHtml(String(value))}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:30px 12px;background:#f1f5f9;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="background:#073b4c;padding:30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;">Aeterna</h1>
              <p style="color:#d6eaf0;margin:8px 0 0;font-size:12px;letter-spacing:2px;">
                YOUR GLOBAL EDUCATION COMPANION
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">
              <span style="display:inline-block;background:#fef3c7;color:#92400e;padding:7px 12px;border-radius:20px;font-size:12px;">
                ${isAdmin ? "NEW MEETING REQUEST" : "REQUEST RECEIVED"}
              </span>

              <h2 style="color:#073b4c;margin:20px 0 10px;">
                ${escapeHtml(heading)}
              </h2>

              <p style="color:#64748b;font-size:14px;line-height:1.7;">
                ${escapeHtml(message)}
              </p>

              <h3 style="color:#073b4c;margin-top:28px;">Meeting Details</h3>

              <table width="100%" cellpadding="0" cellspacing="0"
                style="border-collapse:collapse;">
                ${detailsHtml}
              </table>

              <div style="margin-top:24px;padding:16px;background:#fffbeb;border-radius:8px;color:#92400e;font-size:14px;line-height:1.7;">
                <strong>Status: Pending Adviser Confirmation</strong><br/>
                This is a meeting request, not a confirmed appointment.
                ${isAdmin ? "Please check your availability and contact the student to confirm or suggest another time." : "Our adviser will review your preferred time and contact you with confirmation."}
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc;padding:22px;text-align:center;">
              <p style="color:#64748b;font-size:12px;margin:0;">
                © 2026 Aeterna. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export const sendMeetingRequestEmails = async (data: MeetingEmailData) => {
  const senderEmail = process.env.SENDER_EMAIL;
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!senderEmail || !notificationEmail) {
    throw new Error("SENDER_EMAIL or ADMIN_NOTIFICATION_EMAIL is missing.");
  }

  const cleanSenderEmail = extractEmailAddress(senderEmail);
  const safeSenderName = sanitizeSenderName(data.fullName);
  const branchTag = normalizeBranchTag(data.preferredLocation);

  const adminMessage = [
    "A new advisor meeting request has been submitted.",
    "",
    `Student: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.preferredLocation && `Preferred Location: ${data.preferredLocation}`,
    `Date: ${formatDate(data.preferredDate)}`,
    `Time: ${data.preferredTime}`,
    `Duration: ${data.duration} minutes`,
    `Purpose: ${data.purpose}`,
    "",
    "Status: Pending Adviser Confirmation",
  ]
    .filter(Boolean)
    .join("\n");

  const studentMessage = [
    `Hello ${data.fullName},`,
    "",
    "We have received your advisor meeting request.",
    "",
    data.preferredLocation && `Preferred location: ${data.preferredLocation}`,
    `Preferred date: ${formatDate(data.preferredDate)}`,
    `Preferred time: ${data.preferredTime}`,
    `Duration: ${data.duration} minutes`,
    "",
    "Your meeting is not confirmed yet. Our adviser will review your request and contact you.",
    "",
    "Thank you for choosing Aeterna.",
  ]
    .filter(Boolean)
    .join("\n");

  const results = await Promise.all([
    sendResendEmail({
      from: `${safeSenderName} (via Aeterna) <${cleanSenderEmail}>`,
      to: [notificationEmail.trim()],
      reply_to: data.email.trim(),
      subject: `${branchTag}New Advisor Meeting Request - Aeterna`,
      text: adminMessage,
      html: createEmailTemplate(
        "New Advisor Meeting Request",
        "A student has requested a personal consultation.",
        data,
        true,
      ),
    }),

    sendResendEmail({
      from: `Aeterna <${cleanSenderEmail}>`,
      to: [data.email.trim()],
      subject: "Your Meeting Request Has Been Received - Aeterna",
      text: studentMessage,
      html: createEmailTemplate(
        "Your Request Has Been Received!",
        "Thank you for requesting a personal consultation with our study-abroad adviser.",
        data,
        false,
      ),
    }),
  ]);

  return results;
};
