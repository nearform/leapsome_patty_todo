# Ignite - Claude Skills Collection

A collection of custom Claude skills for Nearform projects, shareable via git and usable across Claude Code and Claude apps.

## Available Skills

### BRD Assistant

**Location:** `.claude/skills/brd-assistant/`

Creates Business Requirements Documents following Nearform standards.

**Triggers:** Writing BRDs, defining business requirements, analysing user personas, identifying strategic risks, documenting project scope.

**Files:**

- `SKILL.md` — Main skill definition
- `BRD-TEMPLATE.md` — Complete BRD structure

## Shared Resources

**Location:** `.claude/resources/`

Resources available to all skills:

- `TONE-OF-VOICE.md` — Nearform writing guidelines (UK English, human voice)

## Usage

### Claude Code (automatic - project skills)

Skills in `.claude/skills/` are automatically discovered when you run Claude Code in this repo.

```bash
# Just start Claude Code in the project
claude
```

### Claude Code (personal skills)

To make skills available across all your Claude Code projects:

```bash
./scripts/package-skill.sh brd-assistant
# Choose option 1
```

This copies the skill to `~/.claude/skills/` and shared resources to `~/.claude/resources/`.

### Claude App (claude.ai / desktop)

Skills for the Claude web and desktop app are stored on Anthropic's servers. To upload:

```bash
./scripts/package-skill.sh brd-assistant
# Choose option 2
```

Then:

1. Go to **claude.ai → Settings → Capabilities → Skills**
2. Upload the zip file from the `dist/` folder

## Install Script

The `scripts/package-skill.sh` script handles both destinations:

| Option          | Destination         | How it works                          |
| --------------- | ------------------- | ------------------------------------- |
| 1 - Claude Code | `~/.claude/skills/` | Copies files locally                  |
| 2 - Claude app  | `dist/*.zip`        | Creates self-contained zip for upload |

```bash
# Process a specific skill
./scripts/package-skill.sh brd-assistant

# Process all skills
./scripts/package-skill.sh
```

## Adding New Skills

1. Create a new folder: `.claude/skills/your-skill-name/`
2. Add `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: your-skill-name
   description: What it does and when to use it.
   ---
   ```
3. Add supporting files as needed
4. Reference shared resources: `[TONE-OF-VOICE.md](../../resources/TONE-OF-VOICE.md)`

## Team Sharing

This repo is designed for team collaboration:

**Claude Code:**

```bash
git pull
claude   # Skills are immediately available
```

**Claude app:**
Each team member runs the script once and uploads the zip:

```bash
./scripts/package-skill.sh
# Choose option 2, then upload via Settings → Capabilities → Skills
```

Organisation owners on Team/Enterprise plans can also provision skills organisation-wide.

## Structure

```
.claude/
├── resources/                    # Shared across all skills
│   └── TONE-OF-VOICE.md
└── skills/
    └── brd-assistant/
        ├── SKILL.md
        └── BRD-TEMPLATE.md

scripts/
└── package-skill.sh              # Installation/packaging script

dist/                             # Generated zips for Claude app (gitignored)
└── brd-assistant.zip
```
