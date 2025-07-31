export const setRateLimit = async (appId, limit) => {
  try {
    const res = await fetch(`http://localhost:5500/dev/set-limit/${appId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error setting rate limit:", err);
    throw err;
  }
};
