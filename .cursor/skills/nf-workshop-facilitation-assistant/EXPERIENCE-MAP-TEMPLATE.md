# Experience Map Generator

## Objective

Generate a detailed Experience Map as a CSV file that can be directly imported into MIRO. The map should capture how a generic person accomplishes a goal or navigates an experience, independent of any specific product, service, or brand.

## Key Distinction: Experience Map vs. Customer Journey Map

| Aspect          | Experience Map                                | Customer Journey Map                               |
| --------------- | --------------------------------------------- | -------------------------------------------------- |
| **Scope**       | Product/service agnostic                      | Tied to specific product/service                   |
| **Perspective** | Generic human                                 | Specific persona/customer                          |
| **Purpose**     | Understand general human behavior             | Understand customer interaction with YOUR offering |
| **When to use** | Before journey mapping; exploring new markets | During/after product development                   |

**Experience Maps answer:** "How do humans generally accomplish [X]?"
**Journey Maps answer:** "How do OUR customers accomplish [X] using OUR product?"

## Instructions

### Step 1: Define the Human Experience

Review the project context to identify:

- **Experience Domain**: What general human activity or goal is being mapped? (e.g., "managing personal finances," "finding childcare," "relocating to a new city," "managing a health condition")
- **Scope**: Where does this human experience begin and end, regardless of tools used?
- **Universal Context**: What is true for ALL people navigating this experience, not just your target users?

Frame the experience broadly:

- ❌ "Using our app to book travel" (too product-specific)
- ✅ "Planning and taking a trip" (universal human experience)
- ❌ "Onboarding to our HR platform" (too product-specific)
- ✅ "Starting a new job" (universal human experience)

### Step 2: Define Experience Phases

Based on the domain, define 5-8 sequential phases that ANY person would go through. These should be:

- Universal (applies regardless of tools, products, or services used)
- Behavior-based (what people DO, not what they buy)
- Chronological (ordered by time)

**Example Phases for Different Domains:**

_"Managing a Health Condition"_
Symptom Recognition → Information Seeking → Professional Consultation → Diagnosis Processing → Treatment Planning → Ongoing Management → Adaptation & Coping

_"Relocating to a New City"_
Decision to Move → Research & Planning → Logistics & Preparation → Physical Move → Initial Settlement → Establishing Routines → Integration & Belonging

_"Becoming a Parent"_
Anticipation/Discovery → Preparation & Learning → Birth/Arrival → Early Adjustment → Routine Development → Milestone Navigation → Identity Integration

### Step 3: Populate Each Row

For each phase, capture the **universal human experience** (not product-specific):

| Row               | Description                                                  | Guidance                                                                              |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Phase**         | Name of the experience stage                                 | Use human-centered language, not business funnel terms                                |
| **Doing**         | Universal actions people take                                | What do ALL people do here, regardless of tools? Include analog and digital behaviors |
| **Thinking**      | Common questions, considerations, and mental models          | What information do people seek? What decisions do they face?                         |
| **Feeling**       | Emotional landscape across this phase                        | Capture the range of emotions people commonly experience                              |
| **Pain Points**   | Universal frustrations and barriers                          | What makes this hard for ANYONE, not just your users?                                 |
| **Influences**    | People, information sources, and factors affecting decisions | Who/what shapes behavior at this stage?                                               |
| **Opportunities** | Gaps where products/services could add value                 | What unmet needs exist? Where is friction highest?                                    |

### Step 4: Output Format

Generate a CSV with this exact structure:

- **Row 1**: Headers (Phase, Doing, Thinking, Feeling, Pain Points, Influences, Opportunities)
- **Rows 2+**: One row per experience phase

**CSV Format:**

```
Phase,Doing,Thinking,Feeling,Pain Points,Influences,Opportunities
"[Phase 1 Name]","[Universal actions separated by semicolons]","[Questions and considerations]","[Emotions - use range format: Emotion1 / Emotion2]","[Universal frustrations]","[People and sources that shape decisions]","[Gaps and unmet needs]"
```

### Formatting Rules

- Wrap all cell values in double quotes
- Separate multiple items within a cell with semicolons
- Keep language universal — avoid brand names, specific products, or industry jargon
- Use present tense for actions ("Searches for information" not "Searched")
- Express Feelings as a spectrum when relevant ("Hopeful / Anxious")
- Frame Pain Points as human problems, not product gaps
- Make Opportunities product-agnostic (describe the need, not a solution)

### Quality Checks

Before outputting, verify:

- [ ] Phases describe HUMAN stages, not business funnel stages
- [ ] All content is product/service agnostic
- [ ] Pain Points are universal human frustrations
- [ ] Doing includes both analog and digital behaviors
- [ ] Opportunities describe unmet needs, not specific solutions
- [ ] Map would apply to someone who has NEVER heard of your product
- [ ] Content draws from general human research, not just your customer data

## Required Project Context

To generate an effective experience map, the following information should be available:

**Essential:**

- The human experience/goal being mapped (stated in universal terms)
- Understanding of the broader problem space (not just your solution)

**Highly Valuable:**

- Market research on the general problem domain
- Ethnographic research or behavioral studies
- Competitor landscape (to understand full range of how people solve this)
- Academic or industry research on the experience domain

**Helpful:**

- Historical context (how did people do this before current solutions existed?)
- Cross-cultural perspectives
- Edge cases and alternative approaches people use
- Demographic variations in how the experience unfolds

## When to Use Experience Maps

Use Experience Maps when:

- Exploring a **new market** or problem space before building
- Understanding **why current solutions exist** and where they fall short
- Identifying **whitespace opportunities** for innovation
- Creating a **baseline understanding** before diving into journey mapping
- **Converging multiple user types** into one unified view of human behavior
- Helping stakeholders understand the **full context** beyond your product

## Output

Produce ONLY a properly formatted CSV file. No explanatory text, no markdown, no commentary—just the CSV content ready for MIRO import.
