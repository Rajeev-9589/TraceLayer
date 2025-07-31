export const testProtectedEndpoint = async (apiKey) => {
  try {
    const res = await fetch(`http://localhost:5500/api/fakeapi`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error testing protected endpoint:", err);
    return { message: "Request failed" };
  }
};
