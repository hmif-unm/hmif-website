export const ADMIN_PASSWORD = "PASSWORDUPLOADHMIFWEB2026CIHUYHMIFUNM";

export function verifyAdminPassword(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  return password === ADMIN_PASSWORD;
}
