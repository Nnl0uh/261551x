export default function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.api_key;
  if (!apiKey) {
    return response.status(503).json({ error: "Donation service unavailable" });
  }

  return response.status(200).json({
    url: `https://nowpayments.io/donation?api_key=${encodeURIComponent(apiKey)}`,
  });
}

export const config = {
  runtime: "nodejs",
};

// Keep the handler cache-free so a rotated key is picked up immediately.
