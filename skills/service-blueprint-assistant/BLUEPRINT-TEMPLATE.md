# Service Design Blueprint Generator

## Objective

Generate a detailed Service Blueprint as a CSV file that can be directly imported into MIRO. The blueprint should visualise the relationship between customer actions, frontstage employee actions, backstage processes, support systems, and physical evidence across the entire service journey.

## Instructions

### Step 1: Extract Context

Review the project context to identify:

- **Service Scope**: What service or experience is being blueprinted?
- **Customer Journey**: What are the key phases the customer moves through?
- **Actors**: Who are the frontstage employees, backstage teams, and support functions?
- **Systems**: What technology, integrations, and tools support the service?
- **Constraints**: What policies, regulations, or SLAs govern the process?

### Step 2: Define Journey Phases

Based on the service, define 8-20 sequential phases. These should be more granular than journey map stages. Include:

- Preparation/setup phases (even if customer is not yet involved)
- Each distinct customer interaction moment
- Post-service phases (follow-up, retention, escalation paths)

Name phases descriptively with timing where relevant:

- "1. Application Submission (Day 1)"
- "2. Initial Review (Days 1-2)"
- "3. Assessment Scheduling (Days 2-5)"

### Step 3: Populate Each Row (Swimlane)

For each phase, extract or infer from project context:

| Swimlane                          | Description                                                                                                       | Source Hints                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **PHYSICAL EVIDENCE**             | Tangible artifacts the customer sees or receives: documents, emails, interfaces, signage, confirmations           | UI designs, email templates, document inventory                        |
| **CUSTOMER ACTIONS**              | What the customer does at this phase; use "Not involved yet" or "Awaiting [X]" for phases without customer action | User flows, journey maps, process docs                                 |
| **FRONTSTAGE ACTIONS**            | Visible employee actions (human-to-human or human-to-system interactions the customer observes)                   | SOPs, role descriptions, customer-facing process docs                  |
| **BACKSTAGE ACTIONS**             | Invisible employee actions that support the frontstage (data entry, reviews, approvals, preparations)             | Internal process docs, workflow diagrams, team responsibilities        |
| **SUPPORT PROCESSES**             | Systems, integrations, APIs, databases, and automated processes that enable the service                           | System architecture, integration maps, tech stack docs                 |
| **PAIN POINTS**                   | Current friction, inefficiencies, manual workarounds, risks, and failure points                                   | Support tickets, process audits, stakeholder interviews, known issues  |
| **OPPORTUNITIES FOR IMPROVEMENT** | Automation, AI applications, process redesign, system integrations to address pain points                         | Roadmap, feature requests, industry best practices, technology options |
| **TIME**                          | Duration or timing of this phase relative to key milestone                                                        | Process SLAs, workflow timing, scheduling docs                         |

### Step 4: Output Format

Generate a CSV with this exact structure:

- **Column 1**: "Blueprint Element" (contains row labels)
- **Columns 2+**: One column per journey phase

**Row order (exactly):**

1. Blueprint Element (header row with phase names)
2. PHYSICAL EVIDENCE
3. CUSTOMER ACTIONS
4. FRONTSTAGE ACTIONS
5. BACKSTAGE ACTIONS
6. SUPPORT PROCESSES
7. PAIN POINTS
8. OPPORTUNITIES FOR IMPROVEMENT
9. TIME

**CSV Format Example:**

```
"Blueprint Element","1. Phase Name","2. Phase Name","3. Phase Name"
"PHYSICAL EVIDENCE","[Evidence items separated by commas]","[Evidence items]","[Evidence items]"
"CUSTOMER ACTIONS","[Actions or 'Not involved yet']","[Actions]","[Actions]"
"FRONTSTAGE ACTIONS","[Visible employee actions]","[Actions]","[Actions]"
"BACKSTAGE ACTIONS","[Invisible employee actions]","[Actions]","[Actions]"
"SUPPORT PROCESSES","[Systems, tools, integrations]","[Processes]","[Processes]"
"PAIN POINTS","[Current problems and friction]","[Problems]","[Problems]"
"OPPORTUNITIES FOR IMPROVEMENT","[Solutions, automation, AI opportunities]","[Solutions]","[Solutions]"
"TIME","[Duration/timing]","[Duration/timing]","[Duration/timing]"
```

### Formatting Rules

- Wrap all cell values in double quotes
- Separate multiple items within a cell with commas or semicolons
- Be specific and detailed—aim for 20-100 words per cell for substantive rows
- Use consistent terminology for systems and roles throughout
- Include specific system names (not just "database" but "Salesforce CRM")
- Reference actual job titles and team names from the project context
- For PAIN POINTS: Be specific about what breaks, why it's painful, and impact
- For OPPORTUNITIES: Include specific technology solutions (e.g., "AI-powered matching engine" not just "automation")

### Key Service Blueprint Concepts to Apply

**Lines of Interaction** (implicit in structure):

- Above FRONTSTAGE ACTIONS = customer-visible
- Below FRONTSTAGE ACTIONS = invisible to customer

**Moments of Truth**: Highlight critical customer touchpoints in CUSTOMER ACTIONS where quality is judged

**Fail Points**: Emphasise in PAIN POINTS where service commonly breaks down

**Wait Points**: Note in TIME where customers experience delays

## Required Project Context

To generate an accurate service blueprint, the following information should be available:

**Essential:**

- Description of the service being blueprinted
- Process flows or workflow documentation
- List of systems, tools, and integrations
- Team/role structure

**Highly Valuable:**

- Current SOPs (Standard Operating Procedures)
- System architecture or integration diagrams
- Known issues, pain points, or process audits
- SLAs and timing requirements
- Stakeholder interview notes

**Helpful:**

- Support ticket analysis
- Employee feedback on process friction
- Technology roadmap or improvement backlog
- Regulatory or policy constraints
- Historical performance data

## Output

Produce ONLY a properly formatted CSV file. No explanatory text, no markdown, no commentary—just the CSV content ready for MIRO import.
