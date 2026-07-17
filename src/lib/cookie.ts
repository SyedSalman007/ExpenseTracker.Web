export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const regex = new RegExp("(^| )" + name + "=([^;]+)");
  const match = regex.exec(document.cookie);

  return match ? decodeURIComponent(match[2]) : null;
}
