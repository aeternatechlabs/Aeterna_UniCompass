interface AssistanceEmailData {
  type: "Counselling" | "Student Support";
  fullName: string;
  email: string;
  phone?: string;
  preferredLocation?: string;
  category?: string;
  country?: string;
  course?: string;
  subject?: string;
  message?: string;
}

const escapeHtml = (value: string = ""): string => {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char] ?? char);
};

const createEmailTemplate = (data: AssistanceEmailData) => {
  const isCounselling = data.type === "Counselling";

  const rows = [
    ["Full Name", data.fullName],
    ["Email Address", data.email],
    ["Phone Number", data.phone],
    ["Preferred Location", data.preferredLocation],
    ["Category", data.category],
    ["Country", data.country],
    ["Course", data.course],
    ["Subject", data.subject],
  ].filter(([, value]) => value);

  const detailsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 8px;color:#64748b;font-size:14px;border-bottom:1px solid #e5e7eb;">
            ${label}
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

        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="background:#073b4c;padding:30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:28px;">
                Aeterna
              </h1>
              <p style="color:#d6eaf0;margin:8px 0 0;font-size:12px;letter-spacing:2px;">
                YOUR GLOBAL EDUCATION COMPANION
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">

              <span style="display:inline-block;background:#dcfce7;color:#166534;padding:7px 12px;border-radius:20px;font-size:12px;">
                NEW REQUEST RECEIVED
              </span>

              <h2 style="color:#073b4c;margin:20px 0 10px;">
                New ${data.type} Request${data.preferredLocation ? ` (${escapeHtml(data.preferredLocation)})` : ""}
              </h2>

              <p style="color:#64748b;font-size:14px;line-height:1.7;">
                A student has submitted a new
                ${isCounselling ? "counselling" : "student support"}
                request through Aeterna.
              </p>

              <h3 style="color:#073b4c;margin-top:28px;">
                Student Information
              </h3>

              <table width="100%" cellpadding="0" cellspacing="0"
                style="border-collapse:collapse;">
                ${detailsHtml}
              </table>

              ${
                data.message
                  ? `
                    <h3 style="color:#073b4c;margin-top:28px;">Message</h3>
                    <div style="background:#f8fafc;padding:16px;border-radius:8px;color:#475569;font-size:14px;line-height:1.7;white-space:pre-wrap;">
                      ${escapeHtml(data.message)}
                    </div>
                  `
                  : ""
              }

              <p style="margin-top:28px;color:#475569;font-size:14px;line-height:1.7;">
                Please review this request and respond to the student as soon as possible.
              </p>

              <a href="mailto:${escapeHtml(data.email)}"
                style="display:inline-block;margin-top:12px;background:#073b4c;color:#ffffff;text-decoration:none;padding:13px 22px;border-radius:6px;font-size:14px;font-weight:bold;">
                Reply to Student
              </a>

            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc;padding:22px;text-align:center;">
              <p style="color:#64748b;font-size:12px;margin:0;">
                © 2026 Aeterna. All rights reserved.
              </p>
              <p style="color:#94a3b8;font-size:11px;margin-bottom:0;">
                Helping students find their global education pathway.
              </p>
            </td>
          </tr>

        </table>
      </body>
    </html>
  `;
};

export const sendAssistanceEmail = async (data: AssistanceEmailData) => {
  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !senderEmail || !notificationEmail) {
    throw new Error("Resend email environment variables are missing.");
  }

  const details = [
    `Request type: ${data.type}`,
    `Student name: ${data.fullName}`,
    `Student email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.preferredLocation && `Preferred location: ${data.preferredLocation}`,
    data.category && `Category: ${data.category}`,
    data.country && `Country: ${data.country}`,
    data.course && `Course: ${data.course}`,
    data.subject && `Subject: ${data.subject}`,
    data.message && `Message: ${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${data.fullName} (via Aeterna) <${senderEmail.trim()}>`,
      to: [notificationEmail.trim()],
      reply_to: data.email,
      subject: `New ${data.type} Request${data.preferredLocation ? ` - ${data.preferredLocation}` : ""} - Aeterna`,
      text: details,
      html: createEmailTemplate(data),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      `Resend API error (${response.status}): ${JSON.stringify(result)}`,
    );
  }

  console.log("Resend email sent successfully:", result.id);

  return result;
};
