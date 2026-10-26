# Guía de commits

Formato: [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).

```
<tipo>(<alcance>): <descripción>
```

## Tipos

| Tipo | Uso | SemVer |
|---|---|---|
| `feat` | funcionalidad nueva | MINOR |
| `fix` | corrección de un error | PATCH |
| `perf` | mejora de rendimiento | PATCH |
| `docs` | documentación | — |
| `test` | tests | — |
| `refactor` | cambio interno sin cambiar comportamiento | — |
| `ci` | GitHub Actions | — |
| `build` | dependencias, Docker, empaquetado | PATCH |
| `chore` | tareas varias | — |

## Reglas

- Descripción en **imperativo**, minúscula y sin punto final: `feat(atenciones): registra la atención`. No `registré` ni `Registra.`.
- **Un commit = un cambio lógico.** El código y su test van juntos; la documentación va aparte.
- El **cuerpo** explica el *por qué*, no el *qué* (el qué se ve en el diff).
- Referenciar el issue en el cuerpo con `refs #6`. No cerrar issues desde el commit: se cierran al mergear el PR.
- Cambio incompatible: `feat(api)!:` y una línea `BREAKING CHANGE: ...` al final.

## Alcances del proyecto

`patients`, `atenciones`, `agenda`, `auth`, `configuracion`, `clinical-rules`, `db`, `docs`.

## Versionamiento (SemVer)

`package.json` sigue `MAYOR.MENOR.PARCHE`, y la versión se deriva de los tipos de commit desde el tag anterior:

- solo `fix`/`perf`/`build` → PARCHE
- al menos un `feat` → MENOR
- algún `BREAKING CHANGE` → MAYOR

Mientras el proyecto esté en `0.x` la API no se considera estable, pero la regla se respeta igual.

El bump se hace **en `main`, al mergear**, nunca en la rama de trabajo:

```bash
git switch main && git pull
npm version minor -m "chore(release): %s"
git push --follow-tags
```

`npm version` actualiza `package.json`, crea el commit `chore(release): 0.2.0` y el tag `v0.2.0`.

## Ejemplos

```
feat(atenciones): registra atenciones con diagnóstico CIE-10
fix(patients): lee los antecedentes desde ficha_antecedente
docs: adopta Conventional Commits y versionamiento semántico
test(clinical-rules): fija el caso conservador de una evaluación vacía
```

## Ramas y Pull Requests

La convención del repositorio vive en [`.github/pull_request_template.md`](.github/pull_request_template.md).

- La rama sale de `main` actualizado y se nombra `feature/<nombre-descriptivo>` en kebab-case: `feature/registro-atenciones-cie10`.
- Una rama = un PR. No se commitea directo a `main`: la protección de rama lo bloquea.
- El PR completa los tres bloques de la plantilla: qué se hizo, cómo probarlo y el issue vinculado.
- **No cerrar issues con `Closes #`.** En estas entregas el issue queda abierto: escribir `Relacionado con #6`.
- La aprobación es el botón **Approve** de GitHub (Files changed → Review changes → Approve). Un comentario que diga "aprobado" no cuenta y deja el merge bloqueado.

## Historial de commits

Se escribe en Conventional Commits. No se reescribe el historial de una rama ya publicada: si hay que corregir un commit, se agrega otro con `fix` o `refactor`.

