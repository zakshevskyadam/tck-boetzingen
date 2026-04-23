## Obsidian Memory

Project tag: `tck-boetzingen`

All vault notes MUST be written in English.

### When to write to the vault
- Before starting work, search the vault for relevant context with tag `tck-boetzingen`
- After completing significant work, create a session summary in `sessions/`
- When making architectural decisions, create a decision record in `projects/tck-boetzingen/decisions/`
- When solving non-trivial bugs, document the solution in `projects/tck-boetzingen/bugs/`
- For cross-project or tech-stack-wide decisions/bugs, use `shared/decisions/` or `shared/bugs/` instead
- Reusable patterns → `shared/patterns/`, coding standards → `shared/standards/`

### Naming conventions
- Session summaries: `sessions/YYYY-MM-DD-tck-boetzingen.md` (suffix `-2` if multiple per day)
- Decision records: `YYYY-MM-DD-<short-title>.md` (e.g., `2026-04-16-redis-for-sessions.md`)
- Bug solutions: `YYYY-MM-DD-<short-title>.md` (e.g., `2026-04-16-auth-token-expiry.md`)

### Tag rules
- Always include project tag `tck-boetzingen` and a type tag (`decision`, `bug`, `session`, `architecture`, `pattern`, `standard`)
- Area tags are freeform, lowercase, hyphenated (e.g., `auth`, `api`, `frontend`, `database`)
- Use templates in `templates/` for note structure
