export function buildWelcomeEmail(position: number): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the list</title>
</head>
<body style="margin:0;padding:0;background-color:#030303;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#030303;min-height:100vh;">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

          <!-- Wordmark -->
          <tr>
            <td style="padding-bottom:48px;">
              <span style="font-size:13px;font-weight:600;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase;">
                Dirac
              </span>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0;font-size:28px;font-weight:600;line-height:1.3;color:#ffffff;">
                You're in.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.55);">
                We're building Dirac — one intelligent inbox that reads, writes, and sorts your email for you. No tabs, no clutter, no busywork.
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.55);">
                You're <strong style="color:rgba(255,255,255,0.85);">#${position}</strong> on the waitlist. We'll reach out when it's your turn.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.55);">
                That's it. No action needed on your end.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="height:1px;background-color:rgba(255,255,255,0.08);"></div>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 16px;font-size:13px;font-weight:600;letter-spacing:0.5px;color:rgba(255,255,255,0.35);text-transform:uppercase;">
                What we're working on
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.5);">
                    <span style="color:rgba(255,255,255,0.2);margin-right:12px;">—</span>
                    Unified inbox across all your accounts
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.5);">
                    <span style="color:rgba(255,255,255,0.2);margin-right:12px;">—</span>
                    AI that drafts in your voice
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.5);">
                    <span style="color:rgba(255,255,255,0.2);margin-right:12px;">—</span>
                    Triage and catch up in seconds
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="height:1px;background-color:rgba(255,255,255,0.08);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="margin:0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.2);">
                Dirac · You received this because you signed up for early access.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
