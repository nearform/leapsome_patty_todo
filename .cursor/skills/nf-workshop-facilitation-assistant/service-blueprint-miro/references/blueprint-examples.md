# Service Blueprint Examples

Industry-specific blueprint examples demonstrating how to apply the methodology to different contexts.

## Example 1: B2B E-Commerce Order Placement

**Scenario**: Business buyer places regular inventory order through online platform
**Persona**: Sarah, procurement manager at mid-size retailer, orders 2-3x per week
**Scope**: Regular ordering workflow (excluding first-time setup or bulk annual orders)

| Stages → | 1. Need Recognition | 2. Order Planning | 3. Basket Building | 4. Order Review | 5. Submission | 6. Confirmation |
|----------|-------------------|------------------|-------------------|----------------|--------------|----------------|
| **Physical Evidence** | Inventory management dashboard | Order platform interface | Shopping cart screen | Order summary | - | Confirmation email + SMS |
| **Customer Actions** | Notices low inventory levels | Logs into platform | Searches for products | Reviews totals & delivery date | Submits order | Receives confirmation |
| **Emotional Journey** | 😐 Routine task | 😊 Easy login | 😟 Frustrated (slow search) | 😊 Satisfied with pricing | 😐 Waiting for confirmation | 😊 Relieved |
| **━━━ LINE OF INTERACTION ━━━** | | | | | | |
| **Frontstage: Platform UI** | - | Displays login screen | Shows search results & filters | Calculates pricing & delivery estimates | Displays loading spinner | Shows success message |
| **Frontstage: Account Manager** | May send reorder reminders | - | - | - | - | Follows up on large orders |
| **━━━ LINE OF VISIBILITY ━━━** | | | | | | |
| **Backstage: Sales Team** | Monitors customer buying patterns | - | - | - | Receives order notification | Flags unusual orders for review |
| **Backstage: Operations Coordinator** | - | - | - | - | - | Assigns to fulfilment route |
| **━━━ LINE OF INTERNAL INTERACTION ━━━** | | | | | | |
| **Support: ERP System** | - | Authenticates credentials | Provides product data & inventory levels | Retrieves contract pricing | Records order transaction | Generates order confirmation |
| **Support: Database** | - | Validates session | Stores search queries & cart state | Calculates totals with tax | Commits order record | Updates order history |
| **Support: Analytics** | Tracks inventory patterns | - | Records search behaviour | - | - | Triggers reorder suggestions |
| **Pain Points** | 🔴 No proactive reorder alerts | | 🔴 Slow page performance | 🔴 No delivery time visibility | | 🔴 Confirmation delay (5-10 min) |
| **Opportunities** | 💡 Predictive reordering based on usage patterns | 💡 Voice ordering capability | 💡 Persistent cart across devices | 💡 Real-time delivery window visibility | 💡 Multi-user approval workflow | 💡 Instant confirmation + tracking link |

**Key Insights**:
- Search performance is major pain point affecting efficiency
- No intelligent connection between usage patterns and reordering suggestions
- Lack of real-time fulfilment visibility creates uncertainty for business planning
- Single-user cart limitation affects larger organisations with procurement teams

**Priority Opportunities**:
1. **Quick Win**: Improve search performance through backend caching and query optimisation
2. **Medium Term**: Multi-user cart with approval workflows for procurement teams
3. **Strategic**: AI-powered predictive ordering based on historical consumption patterns

---

## Example 2: Supply Chain Fulfilment

**Scenario**: Operations team fulfils business orders from distribution centre
**Persona**: Marcus, distribution centre operations coordinator
**Scope**: From order submission to delivery scheduling

| Stages → | 1. Order Intake | 2. Planning | 3. Picking | 4. Quality Check | 5. Loading | 6. Dispatch |
|----------|----------------|------------|-----------|----------------|-----------|-----------|
| **Physical Evidence** | Order management dashboard | Delivery schedule | Warehouse picking lists | Packing area | Delivery vehicles | Route manifest |
| **Customer Actions** | Customer's order appears in system | - | - | - | - | Receives delivery notification |
| **━━━ LINE OF INTERACTION ━━━** | | | | | | |
| **Frontstage: Delivery Driver** | - | - | - | - | - | Delivers to customer |
| **━━━ LINE OF VISIBILITY ━━━** | | | | | | |
| **Backstage: Operations Coordinator** | Reviews incoming orders | Assigns to routes | - | Monitors progress | Oversees loading | Confirms dispatch |
| **Backstage: Warehouse Staff** | - | - | Picks products | Checks against order | Loads vehicles | - |
| **━━━ LINE OF INTERNAL INTERACTION ━━━** | | | | | | |
| **Support: ERP System** | Receives order from platform | Provides inventory locations | Generates picking lists | Validates completeness | Updates inventory levels | Confirms dispatch |
| **Support: WMS (Warehouse Mgmt)** | Queues order for fulfilment | Optimises picking routes | Tracks pick status | - | Records load completion | - |
| **Support: Route Optimization** | - | Calculates optimal delivery sequence | - | - | - | Updates delivery ETAs |
| **Time** | Orders by 7am for same-day | Planning: 15-30 min | Picking: 20-45 min per order | Quality check: 5-10 min | Loading: 30-60 min per vehicle | Dispatch window: 10am-12pm |
| **Pain Points** | 🔴 No visibility until order submitted | 🔴 Manual route planning during peaks | | | 🔴 Communication gaps with customers | |
| **Opportunities** | 💡 Real-time order visibility from cart stage | 💡 AI-powered route optimisation | 💡 Automated picking prioritisation | 💡 IoT quality sensors | 💡 Load optimisation algorithm | 💡 Live delivery tracking for customers |

**Key Insights**:
- Operations operates reactively without visibility into pending orders
- No proactive capacity planning despite patterns in ordering data
- Manual processes create inefficiency during peak periods (7am-12pm window critical)
- Customers have no transparency into fulfilment status
- **TIME swimlane included**: Logistics operations are heavily time-bound with strict cutoffs (7am for same-day), SLA commitments, and peak windows that significantly impact operations

**Priority Opportunities**:
1. **Quick Win**: Provide operations dashboard showing pending/building orders
2. **Medium Term**: Automated route optimisation based on real-time order volumes
3. **Strategic**: Predictive demand planning using historical ordering patterns

---

## Example 3: SaaS Platform Onboarding

**Scenario**: New user signs up and completes initial setup of project management platform
**Persona**: Alex, project manager at design agency, first-time SaaS user
**Scope**: From sign-up through first project creation

| Stages → | 1. Sign-Up | 2. Welcome | 3. Initial Setup | 4. First Project | 5. Team Invitation | 6. First Success |
|----------|-----------|-----------|----------------|----------------|------------------|----------------|
| **Physical Evidence** | Landing page | Welcome email + in-app tour | Settings dashboard | Project creation wizard | Team invitation emails | Completed project board |
| **Customer Actions** | Enters email & creates account | Reads welcome email, starts tour | Configures workspace settings | Creates first project | Invites team members | Sees team collaborating |
| **Emotional Journey** | 😊 Excited to try | 😐 Neutral (standard welcome) | 😟 Confused by options | 😊 Satisfied with guidance | 😐 Waiting for team | 😃 Delighted - it works! |
| **━━━ LINE OF INTERACTION ━━━** | | | | | | |
| **Frontstage: Platform UI** | Shows sign-up form | Displays interactive tour | Shows setup wizard | Shows project templates | Shows invitation interface | Shows active project |
| **Frontstage: In-App Assistant** | - | Provides contextual help tips | Suggests recommended settings | Recommends template | - | Celebrates first completed task |
| **━━━ LINE OF VISIBILITY ━━━** | | | | | | |
| **Backstage: Customer Success** | - | Triggered to monitor activation | - | - | Tracks invitation sent | Monitors engagement metrics |
| **Backstage: Support Team** | - | - | Stands by for questions | - | - | Ready for questions |
| **━━━ LINE OF INTERNAL INTERACTION ━━━** | | | | | | |
| **Support: Auth System** | Creates account & validates email | - | - | - | - | - |
| **Support: Database** | Stores user record | Logs tour progress | Saves workspace config | Creates project record | Stores team invitations | Records task completion |
| **Support: Email Service** | Sends verification email | Sends welcome sequence | - | - | Sends team invitations | Sends success milestone email |
| **Support: Analytics** | Tracks sign-up source | Tracks tour completion | Tracks settings chosen | Tracks template usage | Tracks invitation acceptance | Identifies activation event |
| **Pain Points** | | 🔴 Generic welcome (not personalised) | 🔴 Too many setup options | | 🔴 No status visibility on invitations | |
| **Opportunities** | 💡 Social sign-up options | 💡 Personalised welcome based on use case | 💡 Smart defaults with progressive disclosure | 💡 Industry-specific templates | 💡 Invitation status tracking & reminders | 💡 Onboarding completion checklist |

**Key Insights**:
- Initial setup presents too many choices without context
- No personalisation based on user's role or industry
- Team invitation process lacks transparency and follow-up
- Success milestone celebration is important emotional peak

**Priority Opportunities**:
1. **Quick Win**: Add smart defaults to setup wizard with ability to customise later
2. **Medium Term**: Personalised onboarding flow based on role/industry selected at sign-up
3. **Strategic**: AI-powered setup assistant that asks questions and configures automatically

---

## Example 4: Customer Support Escalation

**Scenario**: Customer encounters technical issue and contacts support for resolution
**Persona**: Jamie, frustrated user experiencing system error
**Scope**: Issue reporting through resolution

| Stages → | 1. Issue Discovery | 2. Initial Troubleshooting | 3. Contact Support | 4. Diagnosis | 5. Resolution | 6. Follow-up |
|----------|------------------|--------------------------|------------------|-------------|--------------|-------------|
| **Physical Evidence** | Error message on screen | Help documentation | Support chat interface | - | Working system | Follow-up satisfaction survey |
| **Customer Actions** | Encounters error | Tries refresh, searches help docs | Initiates chat with support | Explains issue & provides screenshots | Waits for fix | Confirms resolution |
| **Emotional Journey** | 😟 Frustrated | 😤 Very frustrated (not finding solution) | 😟 Anxious (needs this to work) | 😐 Patient but concerned | 😟 Still waiting | 😊 Finally resolved |
| **━━━ LINE OF INTERACTION ━━━** | | | | | | |
| **Frontstage: Platform UI** | Displays error message | Shows help resources & search | Launches chat interface | - | Returns to normal operation | Displays satisfaction survey |
| **Frontstage: Support Agent** | - | - | Responds to chat, logs ticket | Asks diagnostic questions | Communicates with engineering | Confirms fix and apologises |
| **━━━ LINE OF VISIBILITY ━━━** | | | | | | |
| **Backstage: Support Team** | - | - | Creates support ticket | Escalates to engineering team | - | Updates ticket and closes |
| **Backstage: Engineering** | - | - | - | Reviews error logs and traces | Applies hotfix or rollback | Monitors for recurrence |
| **━━━ LINE OF INTERNAL INTERACTION ━━━** | | | | | | |
| **Support: Error Logging** | Captures error in logs | - | - | Provides diagnostic data | - | - |
| **Support: Ticket System** | - | - | Creates ticket record | Logs conversation notes | Updates status to resolved | Sends resolution email |
| **Support: Deployment Pipeline** | - | - | - | - | Receives and deploys fix | Validates health checks |
| **Support: Monitoring** | Detects anomaly | - | - | Shows system metrics | - | Confirms error rate dropped |
| **Pain Points** | 🔴 Generic error message | 🔴 Help docs not contextual | 🔴 Can't find live chat initially | 🔴 Must explain issue multiple times | 🔴 No status updates during resolution | |
| **Opportunities** | 💡 Contextual error messages with suggested fixes | 💡 AI-powered help search | 💡 Prominent support access from error screen | 💡 Automatic error context sent to support | 💡 Real-time status updates via chat | 💡 Proactive notification when similar issues occur |

**Key Insights**:
- Error messages don't provide enough context or suggested actions
- Help documentation isn't surfaced contextually when errors occur
- Manual ticket creation adds friction and requires issue re-explanation
- No transparency into resolution progress causes anxiety
- Proactive communication during resolution builds trust

**Priority Opportunities**:
1. **Quick Win**: Improve error messages with specific suggestions and direct link to support
2. **Medium Term**: Contextual help system that surfaces relevant articles based on current error
3. **Strategic**: Proactive error monitoring with automatic alerts and self-healing capabilities

---

## Example 5: Multi-User Collaborative Workflow

**Scenario**: Team collaborates on project deliverable with approval workflow
**Persona**: Multiple team members (contributor, reviewer, approver) working on shared document
**Scope**: Collaborative creation through final approval

| Stages → | 1. Initiation | 2. Delegation | 3. Parallel Contribution | 4. Consolidation | 5. Review | 6. Approval |
|----------|--------------|--------------|----------------------|----------------|----------|-----------|
| **Physical Evidence** | Project dashboard | Task assignments | Document editor (multiple cursors) | Consolidated document | Review interface with comments | Approval confirmation |
| **Customer Actions: Initiator** | Creates project & assigns tasks | Delegates sections to team | Monitors overall progress | - | - | - |
| **Customer Actions: Contributors** | - | Receive notifications | Work on assigned sections | - | - | - |
| **Customer Actions: Reviewer** | - | - | - | Reviews complete work | Adds comments & suggestions | - |
| **Customer Actions: Approver** | - | - | - | - | Reviews final version | Approves or requests changes |
| **Emotional Journey** | 😊 Efficient delegation | 😐 Clear responsibilities | 😊 Can see others' progress | 😐 Some merge conflicts | 😟 Several rounds of comments | 😊 Finally approved |
| **━━━ LINE OF INTERACTION ━━━** | | | | | | |
| **Frontstage: Platform UI** | Shows project creation wizard | Sends task notifications | Shows real-time collaboration | Highlights conflicts | Shows comment threads | Processes approval |
| **━━━ LINE OF VISIBILITY ━━━** | | | | | | |
| **Backstage: Workflow Engine** | Creates workflow instance | Routes tasks to assignees | - | Runs conflict detection | Triggers review notifications | Executes approval actions |
| **━━━ LINE OF INTERNAL INTERACTION ━━━** | | | | | | |
| **Support: Collaboration Service** | Creates project structure | Associates users to tasks | Tracks concurrent edits | Merges contributions | - | - |
| **Support: Database** | Stores project metadata | Records task assignments | Maintains version history | Resolves conflicts | Stores comments | Records approval status |
| **Support: Notification Service** | - | Sends task emails | Sends @mention alerts | Sends conflict alerts | Sends review requests | Sends approval confirmations |
| **Pain Points** | | | 🔴 Can't see edit history easily | 🔴 Merge conflicts not prevented | 🔴 Too many comment threads | 🔴 Unclear approval criteria |
| **Opportunities** | 💡 Role-based templates | 💡 Real-time presence indicators | 💡 Smart conflict prevention | 💡 Threaded comment resolution | 💡 Approval checklist with criteria | 💡 Automated progress reports |

**Key Insights**:
- Real-time collaboration visibility important for team coordination
- Conflict resolution happens reactively rather than proactively
- Comment threads become overwhelming without structure
- Approval process benefits from clear criteria and checklist

**Priority Opportunities**:
1. **Quick Win**: Add clear approval criteria checklist visible to all participants
2. **Medium Term**: Smart conflict detection that warns before conflicts occur
3. **Strategic**: AI-powered suggestion engine that identifies issues before human review

---

## Pattern Recognition Across Examples

### Common Pain Points Across Industries:
1. **Visibility gaps** between stakeholders (operations, customers, support)
2. **Waiting time** not acknowledged or minimised
3. **Single-user limitations** despite collaborative reality
4. **Manual processes** where automation would help
5. **Lack of proactive intelligence** (AI, predictive analytics)
6. **Generic experiences** without personalisation or context

### Common Opportunities:
1. **Real-time data sharing** across frontstage/backstage
2. **Multi-user/collaborative features**
3. **Proactive notifications and intelligent suggestions**
4. **AI/ML-powered capabilities** (prediction, routing, support)
5. **Status transparency** (delivery tracking, resolution progress)
6. **Contextual help and error handling**

### Structural Patterns for Different Contexts:

**Transactional Services** (ordering, booking, purchasing):
- Focus on customer actions + frontstage systems
- Emotional journey critical for identifying friction
- Time constraints important (cutoffs, delivery windows)
- **TIME swimlane**: Optional unless strict deadlines/SLAs
- Support systems: payment, inventory, notifications

**Fulfilment Services** (logistics, delivery, operations):
- Focus on backstage operations and coordination
- Multiple handoff points between teams
- Time dimension critical (schedules, routes, capacity)
- **TIME swimlane**: Strongly recommended (cutoffs, SLAs, peak periods)
- Support systems: routing, tracking, warehouse management

**Support Services** (helpdesk, customer service, troubleshooting):
- Focus on interaction quality and resolution time
- Escalation pathways visible and efficient
- Emotional journey shows frustration → resolution arc
- **TIME swimlane**: Include if SLA-driven (response times, resolution times)
- Support systems: ticketing, knowledge base, monitoring

**Collaborative Services** (multi-user workflows, team tools):
- Focus on coordination between customer actors
- Session management and state synchronisation
- Communication channels between participants
- **TIME swimlane**: Usually optional (unless real-time coordination critical)
- Support systems: conflict resolution, access control, notifications

**Onboarding Services** (setup, configuration, learning):
- Focus on progressive disclosure and guidance
- Emotional journey shows confusion → confidence arc
- Success milestones and celebration important
- **TIME swimlane**: Include if time-to-value is competitive differentiator
- Support systems: analytics, automation, personalisation
