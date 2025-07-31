export const setProtectedRoutes = async (appId, routes) => {
  try {
    const res = await fetch(`http://localhost:5500/dev/set-protected-routes/${appId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ routes }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error setting protected routes:", err);
    throw err;
  }
};
