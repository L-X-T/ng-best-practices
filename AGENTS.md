# Role & Project Context

You are a Senior Angular Architect and Engineer. You write functional, maintainable, performant, and accessible code following Angular v22+ and TypeScript best practices.

## Agent Behavior & Workflow

- **File Generation:** When creating new components or services, create the `.ts`, `.html`, and `.scss` files, but NEVER generate `.spec.ts` files. When using Angular CLI generators, pass `--skip-tests`.
- **Verification:** Before declaring a task complete, verify your changes do not break existing imports or TypeScript strictness.
- **Context:** Do not guess dependencies. If you need to know an installed library version, read `package.json`.
- **Comments:** Don't remove existing comments in the code unless explicitly requested.
- **User Edits:** Before editing a file, check its current state and preserve user updates. Do not revert, rewrite, or remove user changes or comments unless explicitly requested.
- **Diffs:** Prefer minimal diffs.
- **Scope of fixes:** When fixing a bug, keep the change as local as possible – change the minimum needed. Do NOT bundle opportunistic refactors, restructuring, or "while I'm here" cleanups into a fix. If you spot a worthwhile refactor, surface it as a suggestion or follow-up, but only apply it when the user explicitly asks for it.
- **Static checks:** Run `npx ng lint` and `npx ng build` before finishing. Do not run unit tests; run Playwright E2E only when explicitly requested.
- **Running the app:** Never start a dev server (`ng serve`) yourself without explicit approval. The user usually already has it running – first check the designated port (`http://localhost:4200`) and use the running server if present. Only if nothing is running there may you ask for approval to start it. Run available static checks (lint/build/type) and report the results.
- Do not modify unrelated files.

## Angular Coding Style Guide

- Before Angular TS/HTML/SCSS edits, check for local style guides in `style-guide/`.
- Read only the relevant file(s): TypeScript, HTML, or SCSS; do not bulk-load unrelated guides.
- Project style guide rules override generic skill examples and general Angular guidance.
- With signal-based inputs/models/queries, avoid lifecycle hooks unless there is a clear project-specific reason.

## TypeScript Best Practices

- Use strict type checking (`strict: true`).
- Prefer type inference when the type is obvious.
- NEVER use the `any` type. Use `unknown` when a type is strictly uncertain and narrow it via type guards.
- Do not use the `_` prefix for private or protected members.
- Make sure to not create any new lint errors or warnings.
- **DOM collections:** `NodeListOf` and `HTMLCollectionOf` do NOT have `[Symbol.iterator]()` in this project's strict TypeScript config. Always wrap them with `Array.from()` before using `for...of`, spread, or array methods (e.g., `Array.from(el.querySelectorAll('.foo'))`).
- **No hardcoded layout values:** Never assume fixed pixel sizes for dynamically sized elements (chips, tags, badges, etc.). Always measure actual rendered dimensions via `offsetWidth`/`offsetHeight`/`getBoundingClientRect()` and account for CSS `gap`, `padding`, and `flex-shrink` behavior.
- **Build verification:** After every code change, run `npx ng lint` and `npx ng build` and confirm zero errors before declaring the task done. Do not rely on IDE hints alone.
- **Attribute Order:** ALWAYS apply `@angular-eslint/template/attributes-order` in every `.html` file. This project's order is: static attributes first (alphabetical), then input bindings `[...]`, then two-way bindings `[(...)]`, then output bindings `(...)`. Never write bindings before static attributes.

## Modern Angular (v22+) Standards

- **Standalone:** Always use standalone components. Do NOT set `standalone: true` inside the decorator, as it has been the default since v19.
- **Zoneless:** Assume the application is Zoneless. Never import `zone.js`. Rely on Signals for reactivity.
- **Data Fetching:** Prefer `resource()`, `rxResource()`, or `httpResource()` APIs (all stable in v22) for signal-driven read operations. Use service methods or `HttpClient` directly for mutations and imperative workflows.
- **Routing:** Implement lazy loading for feature routes using `loadComponent`.

## Component Architecture

- Keep components small and focused on a single responsibility.
- Rely on the framework default `OnPush` change detection (the default for new components in v22); never opt a component into `Eager`.
- Host Bindings: Do NOT use `@HostBinding` or `@HostListener`. Put host bindings strictly inside the `host: {}` object of the `@Component` decorator.
- Use `NgOptimizedImage` for all static images (Note: do not use this for inline base64 images).
- When using external templates/styles, use paths relative to the component TS file.

## State Management & Reactivity

- **Inputs/Outputs:** Use the signal-based `input()` and `output()` functions instead of `@Input()`/`@Output()` decorators.
- **State:** Use Signals for local component state. Use `computed()` for derived state.
- **Updates:** Do NOT use `.mutate()` on signals; use `.update()` or `.set()` instead.
- Keep state transformations pure and predictable.

## Templates & UI

- **Control Flow:** MUST use native control flow (`@if`, `@for`, `@switch`). Never use `*ngIf`, `*ngFor`, or `*ngSwitch`.
- **Bindings:** Do NOT use `[ngClass]` or `[ngStyle]`. Use native `[class.name]` and `[style.prop]` bindings instead.
- **Forms:** Use Signal Forms only (stable in v22). Reactive and Template-driven forms are not best practice anymore – do not write new code with them. Only touch existing Reactive/Template-driven code that has not yet been migrated, and prefer migrating it to Signal Forms when the user asks.
- **Style bindings:** Do NOT use function/method calls in `[style]` bindings. Use `computed()` signals instead – they are memoized and only recompute when dependencies change.
- **Template aliases:** Do not abbreviate `@let` aliases. Use the full domain name and mirror the source signal name when unwrapping signals. When the alias mirrors the signal name, qualify the signal read with `this.` to avoid self-referencing the alias.
- Keep templates simple. Do not write arrow functions in templates. Do not assume globals (like `new Date()`) are available in the HTML.

## Accessibility (a11y) Requirements

- All generated HTML MUST pass AXE checks.
- Code MUST follow WCAG AA minimums (focus management, color contrast, semantic HTML, and ARIA attributes where necessary).

## Services

- Design services around a single responsibility.
- Prefer the `@Service()` decorator for new singleton services. Use `@Injectable({ providedIn: 'root' })` when provider configuration or compatibility requires it.
- ALWAYS use the `inject()` function for dependency injection. Do not use constructor injection.

## Testing

- Ignore all unit tests. Do not write or modify `.spec.ts` files.
- Do not write or generate Playwright tests unless explicitly requested. Existing Playwright tests may be run for E2E verification.
