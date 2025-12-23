# Customer Journey Map Generator

## Objective

Generate a detailed Customer Journey Map as a CSV file that can be directly imported into MIRO. The map should capture the complete end-to-end customer experience from their perspective.

## Instructions

### Step 1: Extract Context

Review the project context to identify:

- **Persona/Actor**: Who is the primary user? What are their demographics, goals, and constraints?
- **Scenario**: What specific goal or task is being mapped?
- **Scope**: Where does the journey begin and end?
- **Channels**: What touchpoints exist (website, app, phone, email, in-person, etc.)?

### Step 2: Define Journey Stages

Based on the scenario, define 5-8 sequential stages. Common patterns include:

- Awareness → Consideration → Decision → Onboarding → Usage → Retention → Advocacy
- Discovery → Research → Evaluation → Purchase → Setup → Support → Renewal
- Need Recognition → Exploration → Comparison → Commitment → Activation → Engagement → Expansion

Choose or adapt stages that match the actual customer experience in the project context.

### Step 3: Populate Each Row

For each stage, extract or infer from project context:

| Row                         | Description                                          | Source Hints                                      |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| **Stage**                   | Name of the journey phase                            | Process flows, user stories                       |
| **Customer Goals**          | What the customer is trying to achieve in this stage | User research, personas, requirements             |
| **Actions**                 | Specific behaviors and steps taken                   | User flows, analytics, support tickets            |
| **Touchpoints**             | Channels, interfaces, and contact points used        | System architecture, channel list, integrations   |
| **Emotions**                | Emotional state (use format: "Primary / Secondary")  | User feedback, NPS comments, interview quotes     |
| **Pain Points**             | Frustrations, friction, and barriers                 | Support tickets, feedback, known issues, research |
| **Opportunities/Solutions** | Improvements to address pain points                  | Roadmap items, feature requests, best practices   |
| **KPIs**                    | Metrics to measure success at this stage             | Analytics, business objectives, SLAs              |

### Step 4: Output Format

Generate a CSV with this exact structure:

- **Row 1**: Headers (Stage, Customer Goals, Actions, Touchpoints, Emotions, Pain Points, Opportunities/Solutions, KPIs)
- **Rows 2+**: One row per journey stage
- **Columns**: Each column after Stage represents content for that row type

**CSV Format Example:**

```
Stage,Customer Goals,Actions,Touchpoints,Emotions,Pain Points,Opportunities/Solutions,KPIs
"[Stage 1 Name]","[Goal]","[Actions separated by semicolons]","[Touchpoints separated by semicolons]","[Emotion 1] / [Emotion 2]","[Pain points separated by semicolons]","[Opportunities separated by semicolons]","[KPI names]"
```

### Formatting Rules

- Wrap all cell values in double quotes
- Separate multiple items within a cell with semicolons
- Keep each cell concise but specific (aim for 10-50 words per cell)
- Use active voice for Actions ("Searches online" not "Online searching")
- Express Emotions as feeling words, optionally paired ("Curious / Overwhelmed")
- Frame Pain Points from customer's perspective
- Make Opportunities actionable and specific

### Quality Checks

Before outputting, verify:

- [ ] Stages flow logically from start to end of journey
- [ ] Each stage has content in ALL rows
- [ ] Pain Points align with the stage (not generic complaints)
- [ ] Opportunities directly address corresponding Pain Points
- [ ] KPIs are measurable and relevant to the stage
- [ ] Touchpoints exist in the project's actual technology/channel landscape

## Required Project Context

To generate an accurate journey map, the following information should be available:

**Essential:**

- User/customer personas or profiles
- Description of the service, product, or experience being mapped
- Known user touchpoints and channels

**Highly Valuable:**

- User research findings (interviews, surveys, usability tests)
- Support ticket themes or common complaints
- Analytics data (conversion funnels, drop-off points)
- Existing process flows or user stories

**Helpful:**

- Competitor analysis
- NPS or satisfaction survey results
- Business objectives and success metrics
- Technology/system inventory

## Output

Produce ONLY a properly formatted CSV file. No explanatory text, no markdown, no commentary—just the CSV content ready for MIRO import.
