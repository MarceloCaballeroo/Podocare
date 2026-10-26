# Política de seguridad

PodoCare maneja datos de salud de pacientes, por lo que se toman en serio los reportes de vulnerabilidades.

## Cómo reportar una vulnerabilidad

No abras un issue público. Usa el reporte privado de GitHub: pestaña **Security** → **Report a vulnerability**.

Incluye, si es posible:

- una descripción del problema y su impacto,
- los pasos para reproducirlo,
- la versión o el commit afectado.

Responderemos en un plazo razonable y te avisaremos cuando esté corregido.

## Alcance

Se consideran dentro del alcance la autenticación y el segundo factor (TOTP), las políticas de Row Level Security en PostgreSQL, la bitácora de auditoría, las Server Actions y el manejo de datos clínicos.

## Buenas prácticas del repositorio

- Los secretos se configuran por variables de entorno; `.env` no se versiona.
- La rama `main` solo admite cambios mediante pull request con CI exitosa.
- Dependabot y el escaneo de secretos con protección de push están activos.
