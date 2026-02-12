---
name: service-blueprint-miro
description: Generate comprehensive service blueprints optimised for Miro boards with multiple swimlanes mapping current-state customer journeys, operations, logistics, and system interactions. Use for mapping complex B2B commerce platforms, supply chain workflows, multi-stakeholder service delivery, retail/wholesale operations, or any service requiring frontstage/backstage visualisation. Triggers include requests to create service blueprints, map customer journeys, visualise end-to-end processes, or document current-state service delivery for discovery workshops and service design work.
---

# Service Blueprint for Miro

Generate current-state service blueprints optimised for Miro with comprehensive swimlane structures that map customer actions, frontstage interactions, backstage operations, and supporting systems.

## Core Service Blueprint Structure

Service blueprints reveal how services work from customer experience through to backend systems. The standard structure uses horizontal swimlanes separated by key dividing lines:

### Essential Swimlanes (Top to Bottom)

1. **Physical Evidence** (optional) - Tangible touchpoints customers encounter
2. **Customer Actions** - What the customer does at each stage
3. **Emotional Journey** (recommended) - Customer satisfaction/frustration levels
4. **LINE OF INTERACTION** *(divider)*
5. **Frontstage Actions** - Visible employee/system interactions with customers
6. **LINE OF VISIBILITY** *(divider)*
7. **Backstage Actions** - Employee actions invisible to customers
8. **LINE OF INTERNAL INTERACTION** *(divider)*
9. **Support Processes** - Internal systems, teams, and infrastructure

### Extended Swimlanes for Complex Systems

For B2B commerce, retail, supply chain, and multi-stakeholder services, extend with:

10. **Logistics/Fulfilment Operations** - Supply chain, warehouse, delivery coordination
11. **Data Systems** - ERP, databases, analytics platforms
12. **Third-Party Services** - External vendors, APIs, payment processors
13. **Time** (when relevant) - Duration, SLAs, cutoff times, waiting periods
14. **Pain Points** (recommended) - Known issues, bottlenecks, failures
15. **Opportunities** (recommended) - Improvement areas, innovation possibilities

**When to include TIME swimlane:**
- Services with strict SLAs or time-bound processes
- Time-critical operations (order cutoffs, delivery windows, response times)
- Regulatory requirements with timing constraints
- When waiting time is a significant pain point
- Multi-day or multi-week processes where timing matters

**Format options for TIME:**
- Duration: "15 minutes", "2-3 business days"
- Deadlines: "Must complete by 7am", "48-hour SLA"
- Waiting periods: "Customer waits 5-10 minutes"
- Peak periods: "High volume 7-9am"

## Miro Output Format

**Primary: Excel Workbook for Miro Import**

Generate multi-sheet Excel workbooks optimised for Miro import. When dragged into Miro, each cell converts to an individual editable element in a grid layout — perfect for interactive workshops.

**Excel workbook structure (5 sheets):**

**Sheet 1: Service Blueprint** - Main blueprint with all swimlanes
**Sheet 2: Personas** - User personas referenced in blueprint
**Sheet 3: Pain Points Analysis** - Detailed pain points with evidence
**Sheet 4: Opportunities** - Improvement opportunities with prioritisation
**Sheet 5: Workshop Guide** - Facilitation notes and timing

**Why Excel import works best:**
- Miro converts each cell to individually editable element
- Creates visual grid with "sticky note on wall" feel
- Each cell can be independently styled, coloured, moved
- Perfect for interactive workshop facilitation

**Excel format example:**

| Stages → | 1. Discovery | 2. Planning | 3. Ordering | 4. Fulfilment |
|----------|-------------|------------|-------------|--------------|
| Physical Evidence | Website homepage | Order history screen | Shopping cart | Order confirmation email |
| Customer Actions | Browses catalogue | Reviews past orders | Adds items to cart | Submits order |
| Emotional Journey | 😐 Neutral | 😊 Satisfied | 😟 Frustrated | 😊 Relieved |
| ━━━ LINE OF INTERACTION ━━━ | | | | |
| Frontstage: Platform UI | Displays products & offers | Shows order history | Shows cart summary | Displays confirmation |
| Frontstage: Account Manager | - | May call to check in | - | - |
| ━━━ LINE OF VISIBILITY ━━━ | | | | |
| Backstage: Sales Team | Updates campaigns | Monitors accounts | - | Processes order |
| Backstage: Operations | - | - | - | Assigns to fulfilment route |
| ━━━ LINE OF INTERNAL INTERACTION ━━━ | | | | |
| Support: ERP System | Provides product data | Retrieves order history | Checks inventory | Records transaction |
| Support: Database | Stores user session | Caches data | Holds cart state | Commits order record |
| Time | - | 2-3 minutes | 5-8 minutes (peak: 10+ min) | Instant confirmation |
| Pain Points | 🔴 Offers hard to find | | 🔴 Slow page performance | |
| Opportunities | 💡 Personalised recommendations | 💡 AI-suggested reordering | 💡 Multi-user cart | 💡 Real-time fulfilment tracking |

**Note:** TIME swimlane shown above is optional - include only when timing/SLAs are critical to the service.

**Secondary: Markdown Documentation**

Also generate markdown documentation for:
- Stakeholder briefing
- Workshop preparation
- Reference during facilitation

Markdown is supplementary — Excel is the primary workshop deliverable.

## Stickdorn's Six Principles (Apply to All Blueprints)

Every service blueprint must reflect these six core principles:

1. **Human-centred** - Consider ALL affected people (customers, employees, partners, third parties)
2. **Collaborative** - Created WITH stakeholders, not FOR them
3. **Iterative** - Living document that evolves through cycles
4. **Sequential** - Visualise service as a sequence of interrelated actions over time
5. **Real** - Ground in actual research, real scenarios, tangible evidence
6. **Holistic** - Address needs across entire service and business

## Workflow for Generating Service Blueprints

### Step 1: Define Scope and Scenario

Before creating the blueprint, establish:
- **Specific scenario** - One linear story, not branches (e.g., "Customer places order" not "Customer interacts with platform")
- **Target scope** - Aim for 20-25 customer activities per blueprint
- **Zoom level** - Is this high-level overview, stage detail, or process flow?
- **Persona** - Which specific user type is this journey for?

**Key principle**: Process maps have branches; journey maps tell one person's linear story to maintain empathy.

### Step 2: Identify Stages/Phases

Break the journey into 4-7 major stages that span horizontally across the blueprint. Stages should represent meaningful shifts in context or goal.

**Example for e-commerce:**
- Awareness → Planning → Ordering → Fulfilment → Delivery → Follow-up

### Step 3: Map Customer Actions First

Start with what the customer DOES at each stage. Use specific, observable actions written in present tense:
- "Logs into platform"
- "Searches for products"
- "Reviews order history"
- "Submits order"

**Critical**: Include WAITING TIME in customer actions. "Waits for system response" is an action that organisations often forget.

### Step 4: Add Emotional Journey

For each customer action, capture emotional state using descriptive language or emojis:
- 😊 Satisfied / Positive
- 😐 Neutral / Functional
- 😟 Frustrated / Negative
- 😤 Very frustrated / Blocker

This reveals pain points and highlights where experience improvement matters most.

### Step 5: Build Frontstage Layer

Map visible interactions customers see:
- **Human-to-human**: Customer speaks with account manager
- **Human-to-computer**: Customer interacts with platform interface
- **Computer-to-human**: System sends confirmation email

### Step 6: Document Backstage Actions

Map internal employee activities invisible to customers:
- Processing orders
- Coordinating with operations
- Updating inventory systems
- Scheduling deliveries

**Important**: Multiple backstage roles may need separate swimlanes (e.g., Backstage: Sales Team, Backstage: Operations Coordinator).

### Step 7: Add Support Processes

Document systems, infrastructure, and third-party services that enable delivery:
- ERP systems
- Databases
- Payment processors
- Distribution centres
- Third-party APIs

### Step 8: Flag Key Moments

Use additional swimlanes to highlight:
- **Pain Points** (🔴) - Where service breaks down, bottlenecks occur, frustration peaks
- **Opportunities** (💡) - Where innovation could improve experience, quick wins, automation potential

### Step 9: Add Time Dimension (When Relevant)

**Include TIME swimlane when:**
- Service has strict SLAs or regulatory timing requirements
- Time-critical cutoffs exist (ordering deadlines, delivery windows)
- Waiting time is a known pain point
- Process spans multiple days/weeks and timing matters
- Peak vs off-peak variations significantly impact service

**What to document:**
- Expected duration for each step ("2-3 minutes", "24-48 hours")
- Time constraints ("Order by 7am for same-day delivery", "48-hour response SLA")
- Peak periods and variations ("High volume 7-9am", "Slower during lunch")
- Waiting time ("Customer waits 5-10 min for confirmation")

**When NOT to include TIME:**
- Simple, fast services where timing isn't a differentiator
- Timing is highly variable with no meaningful patterns
- Would clutter the blueprint without adding insight

### Step 10: Generate Excel Workbook

Create Excel workbook with 5 sheets as specified in Presentation Format section. Ensure:
- Proper cell formatting for Miro import
- Clear headers and labels
- Consistent structure across all blueprints
- Each swimlane in its own row
- Stages as columns across the top

### Step 10: Create Supporting Documentation

Generate markdown documentation to accompany Excel workbook:
- Blueprint overview and key insights
- Pain points analysis with evidence
- Prioritised opportunities
- Import instructions for Miro
- Workshop facilitation notes

## Complexity Management: Hierarchical Blueprints

For complex services, create a **pyramid of linked blueprints** at different zoom levels:

**Level 1: Lifecycle Overview**
- High-level view of entire customer relationship
- 4-7 major stages
- Links down to stage-level blueprints

**Level 2: Stage Detail**
- Deep dive into one specific stage
- 20-25 customer actions
- Links down to process flows

**Level 3: Process Flow**
- Granular view of specific subprocess
- Technical implementation detail

**Implementation in Miro**: Create separate boards for each level, use hyperlinks or Miro board links to navigate between zoom levels.

## Using Miro MCP (Optional - Supplementary Only)

If you have Miro connector available, use it for **supplementary content only**, not the main blueprint:

**Good uses for Miro MCP:**
- Create analysis tables (Pain Points, Opportunities as structured table objects)
- Add contextual documents (workshop guides, insights summaries)  
- Generate diagrams (system architecture, data flows)

**Don't use Miro MCP for:**
- Main service blueprint grid (Excel import creates superior editable grid format)
- Core workshop materials (the grid from Excel import is more tactile and flexible)

**Why Excel import wins:**
- Miro MCP creates structured table objects, not the individual editable cells needed for workshops
- Excel import gives you the "sticky note on wall" feel essential for interactive facilitation
- Each cell from Excel becomes independently styleable, moveable element

## Special Considerations for Different Contexts

### B2B Commerce & Wholesale

- **Expanded support processes**: Multiple ERP systems, distribution centres, logistics coordination
- **Additional backstage roles**: Account management, category managers, operations coordinators
- **System swimlanes**: Separate lanes for different technical systems (ERP, PIM, CRM integration)
- **Multi-stakeholder consideration**: Business customers, their staff, account managers, operations all appear
- **Time dimension**: Often critical for ordering cutoffs, delivery windows, SLA commitments - **consider TIME swimlane**

**TIME swimlane example for B2B:**
- "Order submission by 2pm for next-day delivery"
- "Account approval: 24-48 hours"
- "Typical order cycle: 15-20 minutes"
- "Peak ordering: Monday mornings 7-9am"

### Supply Chain & Logistics

- **Time-critical elements**: Cutoff times, delivery windows, peak periods - **strongly recommend TIME swimlane**
- **Operations swimlane**: Separate dedicated lane for warehouse/distribution operations
- **Data flow emphasis**: How information flows between systems (orders, inventory, routing)
- **Third-party integration**: External vendors, delivery partners, payment processors

**TIME swimlane example for logistics:**
- "Order by 7am for same-day dispatch"
- "Picking: 15-30 min depending on order size"
- "Peak period 7-9am (300% volume increase)"
- "Delivery window: 2-hour slots"

### Multi-Channel Services

- **Channel lane**: Document whether interaction is web, mobile, in-person, phone
- **Consistency mapping**: Highlight where experience differs across channels
- **Handoff points**: Flag where customer switches between channels

### SaaS & Digital Platforms

- **User roles**: Distinguish between different user types (admin, end-user, viewer)
- **API interactions**: Show third-party integrations and webhooks
- **System health**: Monitoring, error handling, status pages
- **Self-service vs support**: Balance between automated and human assistance
- **Time dimension**: Usually less critical unless SLAs are central to value proposition - **TIME swimlane typically optional**

## Presentation Format

**Primary Deliverable: Excel Workbook**

Generate multi-sheet Excel workbook (.xlsx) with:

**Sheet 1: Service Blueprint**
- Complete blueprint with all swimlanes
- Properly formatted for Miro import
- Cell-based structure that converts to editable grid

**Sheet 2: Personas**
- Key personas referenced in blueprint
- Photo, goals, frustrations, context

**Sheet 3: Pain Points Analysis**
- Detailed pain points with supporting evidence
- Severity ratings
- Affected stakeholders

**Sheet 4: Opportunities**
- Improvement opportunities linked to pain points
- Effort/impact assessment
- Priority recommendations

**Sheet 5: Workshop Guide**
- Facilitation notes and timing
- Key questions for discussion
- Next steps template

**Secondary Deliverable: Markdown Documentation**

Also provide markdown summary including:
1. **Blueprint title** clearly stating the scenario
2. **Persona reference** indicating which user this represents
3. **Key insights summary** (3-5 bullet points highlighting main findings)
4. **Priority opportunities** (top 2-3 improvements to consider)
5. **Import instructions** for dragging Excel into Miro

**Import workflow:**
1. Open target Miro board
2. Drag Excel file onto canvas
3. Miro converts to editable grid automatically
4. Apply colour coding in Miro interface (blue for customer, green for frontstage, etc.)
5. Ready for interactive workshop facilitation

## Best Practices Checklist

Before finalising any service blueprint, verify:

- [ ] Journey starts where CUSTOMER experience starts (not where organisational process starts)
- [ ] Waiting time is explicitly included in customer actions
- [ ] Time dimension is considered for internal processes
- [ ] TIME swimlane included if service has SLAs, cutoffs, or significant timing constraints
- [ ] Emotional journey reflects real research or user feedback
- [ ] All relevant departments/systems are represented
- [ ] Pain points are based on evidence, not assumptions
- [ ] Opportunities are specific and actionable
- [ ] Blueprint tells ONE linear story (no branches)
- [ ] Scope is manageable (20-25 customer actions)
- [ ] Clear links to other zoom levels if part of hierarchy

## References

For detailed methodology, examples, and advanced techniques, see:
- `references/stickdorn-methodology.md` - Complete Stickdorn principles and practices
- `references/blueprint-examples.md` - Industry-specific blueprint examples
- `references/miro-workshop-guide.md` - Facilitation tips for creating blueprints collaboratively in Miro

## Critical Reminders

**"The more you focus on internal processes, the more you will forget what is actually the customer experience."** - Marc Stickdorn

Always keep customer experience at the centre. Backstage operations exist to enable customer value, not the reverse.

**"A customer journey map is never a final deliverable. It's always a means to an end."** - Marc Stickdorn

Service blueprints are tools for alignment, understanding, and action - not documentation for documentation's sake.
