// File: api/notify-zoho.js
export default async function handler(req, res) {
  // 1. Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Link Zoho Webhook của bạn
  const ZOHO_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.33699b799b8a093aa0b15c063af753dd.d24c93d18cd16cccfe0f4f60a217f96d&isdebug=false';

  try {
    // 3. Server Vercel gửi dữ liệu sang Server Zoho (Không bị chặn CORS)
    const response = await fetch(ZOHO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Sent to Zoho successfully' });
    } else {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Zoho rejected', details: errorText });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}