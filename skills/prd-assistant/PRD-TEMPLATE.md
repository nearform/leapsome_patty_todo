# Product Requirements Document (PRD) - Creation Template

## Document Structure

Follow this structure and include these sections:

## 1. Document Scope

**This document defines:**

- Features and functional requirements
- User workflows
- Data requirements (what, not how stored)
- Non-functional targets (measurable outcomes)
- Integration needs (what data flows where)

**This document does NOT define:**

- Technology choices
- Architecture patterns
- Implementation details
- Infrastructure specifications

**Reference Documents:**

- BRD: Business context, user personas, strategic goals
- TAD: Technical implementation of all requirements herein

---

## 2. Business Context Summary

2-3 sentences summarising the business problem. Reference BRD for complete details.

> "For detailed business context, user personas, and strategic goals, see BRD Sections 2-4."

---

## 3. Feature Prioritisation (Kano Model)

### Basic Features (Must-Have)

Features without which the system is incomplete:

- [Feature]: [Brief description]
- [Feature]: [Brief description]

### Performance Features (Value-Added)

Features that enhance usability and efficiency:

- [Feature]: [Brief description]
- [Feature]: [Brief description]

### Excitement Features (Differentiators)

Unexpected capabilities providing high satisfaction:

- [Feature]: [Brief description]
- [Feature]: [Brief description]

---

## 4. Functional Requirements

For each major feature area:

### [Feature Area] (e.g., Case Management)

**[Sub-feature]** (e.g., Case Creation)

**Must have:**

- The system shall [requirement]
- The system shall [requirement]

**Nice to have:**

- The system should [requirement]

[Repeat for all feature areas]

**Guidelines:**

- Use "shall" for mandatory, "should" for optional
- Be specific and testable
- Reference user personas by name when relevant

---

## 5. Non-Functional Requirements

| Category          | Requirement               | Target                           |
| ----------------- | ------------------------- | -------------------------------- |
| **Performance**   | Page load time            | < 2 seconds                      |
|                   | Concurrent users          | 500                              |
|                   | Report generation         | < 30 seconds                     |
| **Availability**  | Uptime (business hours)   | 99.5%                            |
|                   | Recovery time (RTO)       | 4 hours                          |
|                   | Data loss tolerance (RPO) | 1 hour                           |
| **Security**      | Authentication            | SSO + MFA for privileged actions |
|                   | Data protection           | Encrypted at rest and in transit |
|                   | Audit                     | All access and changes logged    |
| **Accessibility** | Standard                  | WCAG 2.1 Level AA                |
| **Compliance**    | Regulations               | [List: GDPR, HIPAA, etc.]        |

> **Note:** Technical implementation of these requirements is specified in the TAD.

---

## 6. User Workflows

For key user journeys (reference BRD Section 3 for persona details):

### [Persona Name]: [Journey Title]

**Goal:** What the user wants to accomplish

**Preconditions:** What must be true before starting

**Steps:**

| Step | User Action | System Response | Business Rules     |
| ---- | ----------- | --------------- | ------------------ |
| 1    | [Action]    | [Response]      | [Validation/rules] |
| 2    | [Action]    | [Response]      | [Validation/rules] |

**Postconditions:** System state after completion

**Error Scenarios:**

- [Scenario]: [System behaviour]

[Repeat for key journeys per persona]

---

## 7. Data Requirements

### Key Entities

| Entity   | Description | Key Attributes    | Relationships |
| -------- | ----------- | ----------------- | ------------- |
| [Entity] | [Purpose]   | [Critical fields] | [Related to]  |

### Validation Rules

| Field   | Rule                    | Error Message  |
| ------- | ----------------------- | -------------- |
| [Field] | [Required/Format/Range] | [User message] |

### Retention

| Data Type | Retention Period | Deletion Type    |
| --------- | ---------------- | ---------------- |
| [Type]    | [Period]         | Hard/Soft delete |

> **Note:** Data architecture and schema design are specified in the TAD.

---

## 8. Integration Requirements

| System        | Purpose      | Data        | Direction   | Frequency            |
| ------------- | ------------ | ----------- | ----------- | -------------------- |
| [System name] | [Why needed] | [What data] | In/Out/Both | Real-time/Daily/etc. |

**For each integration, also define:**

- Business rules for validation
- Who gets notified on failure
- Acceptable data freshness

> **Note:** Technical implementation (protocols, APIs, authentication) is specified in the TAD.

---

## 9. Out of Scope

Explicitly list what this release does NOT include:

- [Feature/capability] - Reason/future phase
- [Feature/capability] - Reason/future phase

---

## Formatting Guidelines

- Keep it concise—tables over prose
- Every requirement must be testable
- Reference personas by name, don't redescribe them
- If you're specifying HOW, move it to TAD

---

Generate a focused PRD that gives development teams clear direction on WHAT to build without prescribing HOW to build it.
