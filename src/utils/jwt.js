export function parseJwt(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const json = decodeURIComponent(
      decoded.split("").map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join("")
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}
