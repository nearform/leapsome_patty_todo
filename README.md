# Ignite - Claude Skills Collection

A collection of custom Claude skills for Nearform Ignite projects, shareable via git and usable across Claude Code and Claude apps.

## Available Skills

### BRD Assistant

**Location:** `skills/brd-assistant/`

Creates Business Requirements Documents following Nearform standards.

**Triggers:** Writing BRDs, defining business requirements, analysing user personas, identifying strategic risks, documenting project scope.

**Files:**

- `SKILL.md` — Main skill definition
- `BRD-TEMPLATE.md` — Complete BRD structure

### PRD Assistant

**Location:** `skills/prd-assistant/`

Creates Product Requirements Documents following Nearform standards. Defines WHAT to build based on the BRD.

**Triggers:** Writing PRDs, defining features, specifying functional requirements, documenting user workflows, creating product specifications.

**Files:**

- `SKILL.md` — Main skill definition
- `PRD-TEMPLATE.md` — Complete PRD structure

### Workshop Facilitation Assistant

**Location:** `skills/workshop-facilitation-assistant/`

Assists with workshop facilitation by intelligently generating Customer Journey Maps, Experience Maps, or Service Design Blueprints as CSV files for MIRO import. Automatically infers user intent to select the appropriate visualization artifact.

**Triggers:** Facilitating workshops, creating journey maps, mapping experiences, documenting service workflows, visualizing customer journeys.

**Files:**

- `SKILL.md` — Main skill definition with intent inference logic
- `CUSTOMER-JOURNEY-MAP-TEMPLATE.md` — Customer journey map generation instructions
- `EXPERIENCE-MAP-TEMPLATE.md` — Experience map generation instructions
- `SERVICE-DESIGN-BLUEPRINT-TEMPLATE.md` — Service design blueprint generation instructions

## Shared Resources

**Location:** `resources/`

Resources available to all skills:

- `TONE-OF-VOICE.md` — Nearform writing guidelines (UK English, human voice)

## Prompts

**Location:** `prompts/`

Standalone prompt files for direct use in Claude conversations. These files are automatically generated from all skill templates when you run the packaging script.

**Available prompts:**

- `brd.md` — Create Business Requirements Documents
- `prd.md` — Create Product Requirements Documents
- `service-design-blueprint.md` — Generate service design blueprints
- `customer-journey-map.md` — Generate customer journey maps
- `experience-map.md` — Generate experience maps

**Usage:** Reference these files directly in your Claude conversations:

```
Follow the instructions in prompts/brd.md
```

**Note:** These files are generated from skill templates. To update them, modify the corresponding template files in the skill directories and run the packaging script.

### Generating Prompts

The script provides an interactive menu to generate prompts:

```bash
./scripts/manage-skills.py
# Choose "Generate prompts"
# Select skill(s) or "All skills"
```

This will generate prompt files in the `prompts/` folder from the skill templates.

## Usage

### Claude Code (personal skills)

To make skills available across all your Claude Code projects:

```bash
./scripts/manage-skills.py
# Choose "Install skills" → "Claude Code"
# Select skill(s) or "All skills"
```

This copies the skill(s) to `~/.claude/skills/` and shared resources to `~/.claude/resources/`. Restart Claude Code to use the skill(s).

### Claude App (claude.ai / desktop)

Skills for the Claude web and desktop app are stored on Anthropic's servers. To upload:

```bash
./scripts/manage-skills.py
# Choose "Install skills" → "Claude app"
# Select skill(s) or "All skills"
```

Then:

1. Go to **claude.ai → Settings → Capabilities → Skills**
2. Upload the zip file(s) from the `dist/` folder

## Install Script

The `scripts/manage-skills.py` script handles both destinations:

| Option          | Destination         | How it works                          |
| --------------- | ------------------- | ------------------------------------- |
| 1 - Claude Code | `~/.claude/skills/` | Copies files locally                  |
| 2 - Claude app  | `dist/*.zip`        | Creates self-contained zip for upload |

The script is fully interactive - simply run it and follow the prompts:

```bash
./scripts/manage-skills.py
```

## Adding New Skills

1. Create a new folder: `skills/your-skill-name/`
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
./scripts/manage-skills.py
# Choose option 1 to install to ~/.claude/skills/
```

**Claude app:**
Each team member runs the script once and uploads the zip:

```bash
./scripts/manage-skills.py
# Choose option 2, then upload via Settings → Capabilities → Skills
```

Organisation owners on Team/Enterprise plans can also provision skills organisation-wide.

## Structure

```
resources/                        # Shared across all skills
└── TONE-OF-VOICE.md

prompts/                          # Generated from all skill templates
├── brd.md
├── prd.md
├── service-design-blueprint.md
├── customer-journey-map.md
└── experience-map.md

skills/
├── brd-assistant/
│   ├── SKILL.md
│   └── BRD-TEMPLATE.md
├── prd-assistant/
│   ├── SKILL.md
│   └── PRD-TEMPLATE.md
└── workshop-facilitation-assistant/
    ├── SKILL.md
    ├── CUSTOMER-JOURNEY-MAP-TEMPLATE.md
    ├── EXPERIENCE-MAP-TEMPLATE.md
    └── SERVICE-DESIGN-BLUEPRINT-TEMPLATE.md

scripts/
└── manage-skills.py              # Skills management script

dist/                             # Generated zips for Claude app (gitignored)
├── brd-assistant-<commit-hash>.zip
├── prd-assistant-<commit-hash>.zip
└── workshop-facilitation-assistant-<commit-hash>.zip
```
