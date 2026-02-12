# Service Blueprint Miro Skill

A Claude skill for generating comprehensive service blueprints optimised for Miro workshops, based on Marc Stickdorn's service design methodology.

## Quick Start

**Download and use:**
1. Download `service-blueprint-miro.skill`
2. Upload to Claude (claude.ai)
3. Ask Claude to create service blueprints for your scenarios

**Example prompts:**
- "Create a service blueprint for customer onboarding"
- "Generate a service blueprint for our order fulfilment process"
- "Map the current-state checkout experience as a service blueprint"

## What This Skill Does

Generates **Excel workbooks** optimised for Miro import, containing:
- **Complete service blueprints** with customer actions, frontstage/backstage operations, and systems
- **Personas** referenced in the blueprint
- **Pain points analysis** with supporting evidence
- **Opportunities** with prioritisation
- **Workshop facilitation guide**

When you drag the Excel file into Miro, it automatically converts to an editable grid format — perfect for interactive workshop facilitation.

## Key Features

✅ **Based on Marc Stickdorn's methodology** - Six core principles, 20-25 activity rule, hierarchical blueprints  
✅ **Miro-optimised** - Excel format that imports as individual editable cells  
✅ **Workshop-ready** - Includes facilitation guidance with liquid timing, dramatic arc, and group activities  
✅ **Industry examples** - Five complete blueprints across different contexts  
✅ **White-labeled** - Generic examples applicable to any project  

## Output Format

### Primary: Excel Workbook (5 sheets)
1. **Service Blueprint** - Complete blueprint with all swimlanes
2. **Personas** - User personas with goals and frustrations
3. **Pain Points Analysis** - Detailed issues with severity ratings
4. **Opportunities** - Improvement opportunities with prioritisation
5. **Workshop Guide** - Facilitation notes and timing

### Secondary: Markdown Documentation
- Blueprint overview and insights
- Import instructions for Miro
- Workshop preparation notes

## Service Blueprint Structure

Standard Stickdorn swimlanes:
- Physical Evidence (optional)
- Customer Actions
- Emotional Journey
- **LINE OF INTERACTION**
- Frontstage Actions
- **LINE OF VISIBILITY**
- Backstage Actions
- **LINE OF INTERNAL INTERACTION**
- Support Processes
- Pain Points
- Opportunities

Extended for complex systems:
- Logistics/Fulfilment Operations
- Data Systems
- Third-Party Services

## Documentation

### [SKILL.md](SKILL.md)
Main skill file with:
- Complete workflow (9 steps from scope definition to Excel generation)
- Stickdorn's six principles
- Hierarchical blueprint approach for managing complexity
- Best practices checklist
- Special considerations for different contexts (B2B, SaaS, logistics, multi-channel)

### [references/stickdorn-methodology.md](references/stickdorn-methodology.md)
Deep dive into methodology:
- Six core principles explained
- Service design as five lenses
- Blueprint vs journey map vs process map
- The pyramid approach (3 zoom levels)
- The 20-25 activity rule
- Waiting time as forgotten customer action
- Emotional journey integration
- Workshop best practices
- Liquid timing technique
- Dramatic arc energy management
- Maintenance and governance

### [references/blueprint-examples.md](references/blueprint-examples.md)
Five complete industry examples:
1. **B2B E-Commerce** - Business buyer ordering workflow
2. **Supply Chain Fulfilment** - Distribution centre operations
3. **SaaS Platform Onboarding** - New user setup journey
4. **Customer Support Escalation** - Technical issue resolution
5. **Multi-User Collaboration** - Team workflow with approval

Each example includes:
- Complete service blueprint table
- Key insights summary
- Priority opportunities
- Pain points with evidence

### [references/miro-workshop-guide.md](references/miro-workshop-guide.md)
Practical facilitation guidance:
- Pre-workshop preparation checklist (2-3x workshop duration)
- 3-hour workshop structure with timing
- Warm-up activities ("Yes, and..." improv)
- Liquid timing technique (7, 16, 19 min intervals)
- Dramatic arc energy management
- Group size variations (individual → pairs → full group)
- Handling common challenges
- Miro-specific tips (sticky note colours, board navigation, templates)
- Remote vs in-person considerations
- Post-workshop actions (within 24 hours, 1 week, ongoing)
- Quality checklist for final blueprints

## Methodology Credit

This skill is based on **Marc Stickdorn's** service design methodology from:
- "This is Service Design Doing" (2018)
- "This is Service Design Thinking" (2011)
- thisisservicedesignthinking.com
- thisisservicedesigndoing.com

Stickdorn's six principles:
1. Human-centred
2. Collaborative
3. Iterative
4. Sequential
5. Real
6. Holistic

## Using Miro MCP (Optional)

If you have Miro connector available:

**Good uses:**
- Supplementary analysis tables (structured table objects)
- Contextual documents and summaries
- Diagrams (system architecture, data flows)

**Not recommended:**
- Main service blueprint (Excel import creates superior grid format)

**Why Excel wins:**
- Creates individual editable cells vs structured table object
- "Sticky note on wall" feel for interactive workshops
- Each cell independently styleable and moveable

## Installation

### For Claude.ai users:
1. Download `service-blueprint-miro.skill`
2. Go to claude.ai
3. Navigate to Projects (if working within a project)
4. Upload the .skill file

### For developers/contributors:
```bash
git clone [repository-url]
cd service-blueprint-miro
# Edit SKILL.md or reference files
# Re-package using Anthropic's skill-creator tools
```

## Example Use Cases

- **Discovery workshops** - Map current-state services to identify improvement areas
- **Digital transformation** - Understand existing processes before redesigning
- **Customer experience initiatives** - Visualise end-to-end journeys
- **Process optimisation** - Identify bottlenecks and inefficiencies
- **Stakeholder alignment** - Create shared understanding across departments
- **Service design sprints** - Generate blueprints collaboratively with teams

## Contributing

Contributions welcome! To improve this skill:

1. Fork the repository
2. Edit SKILL.md or reference files
3. Test the updated skill
4. Submit a pull request with clear description of changes

Areas for contribution:
- Additional industry-specific examples
- More facilitation techniques
- Integration with other service design tools
- Translations to other languages

## License

[Add your preferred license here]

## Version

Current version: 1.0.0 (February 2025)

## Support

For questions or issues:
- Open an issue in this repository
- [Add your contact method if desired]

---

**Created by:** [Your name/organisation]  
**Based on:** Marc Stickdorn's Service Design Methodology  
**For:** Claude AI Projects
