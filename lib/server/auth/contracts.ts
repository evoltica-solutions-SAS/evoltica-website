import type { Role, Session } from "@/lib/domain";

/**
 * Contrato del proveedor de identidad (ADR-012). La implementación real se
 * decide en ADR-013; mientras tanto no existe ningún proveedor en producción.
 *
 * Reglas que toda implementación debe cumplir (SECURITY_GUIDE):
 * - Contraseñas con hash lento (argon2id o bcrypt) o delegadas al proveedor; nunca en claro.
 * - Sesión en cookie httpOnly + Secure + SameSite=Lax, con expiración y rotación.
 * - Respuestas idénticas para "usuario no existe" y "contraseña incorrecta".
 * - Recuperación por token de un solo uso, con vencimiento corto, enviado por correo.
 * - Límite de intentos por IP y por cuenta.
 */

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "ACCOUNT_LOCKED"
  | "EMAIL_TAKEN"
  | "TOKEN_INVALID"
  | "RATE_LIMITED"
  | "NOT_CONFIGURED";

export type AuthResult<T = void> = { ok: true; value: T } | { ok: false; error: AuthErrorCode };

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  taxId?: string;
  /** Aceptación explícita de la política de tratamiento de datos (Ley 1581). */
  acceptedPrivacyPolicyAt: string;
}

export interface AuthProvider {
  /** Valida credenciales y emite la cookie de sesión. */
  signIn(email: string, password: string): Promise<AuthResult<Session>>;
  signUp(input: SignUpInput): Promise<AuthResult>;
  /** Siempre responde ok (no revela si el correo existe). */
  requestPasswordReset(email: string): Promise<AuthResult>;
  resetPassword(token: string, newPassword: string): Promise<AuthResult>;
  /** Lee y verifica la cookie de la petición actual. */
  getSession(): Promise<Session | null>;
  signOut(): Promise<void>;
}

/** Destino por defecto de cada rol tras iniciar sesión. */
export const HOME_BY_ROLE: Record<Role, string> = {
  CLIENTE: "/app",
  ADMIN: "/admin",
};
