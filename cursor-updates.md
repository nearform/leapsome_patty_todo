# Cursor Updates

Changelog of changes made during development sessions.

---

## 2025-03-10

### Add Service Blueprint Miro skill (Option B)
- Pulled content from remote branch `add-service-blueprint-miro-skill` without merging.
- Extracted skill into `.cursor/skills/nf-workshop-facilitation-assistant/service-blueprint-miro/` (README.md, SKILL.md, references/, service-blueprint-miro.skill).
- No merge conflicts; local layout unchanged.

### Merge branches and push main
- Committed local restructure (root .cursor, docs, package at root; removed packages/Design Scaffolding Mobile).
- Merged origin/main and remote feature branches into main; pushed main to origin.

### Remove duplicate service-blueprint-miro (old path)
- Deleted `skills/workshop-facilitation-assistant/service-blueprint-miro/`; canonical location is `.cursor/skills/nf-workshop-facilitation-assistant/service-blueprint-miro/`.

### README: add migration plan documentation
- Linked [docs/migration-plan.md](docs/migration-plan.md) in Documentation section and under Customization (design system replacement).

