**__TASK 2__**
**Problem:**
Cold emails and cold calls often suffer from low engagement rates because they lack personalization. A generic approach fails to resonate with different prospects. Prospects from different industries have unique concerns, and manual segmentation is slow, making it hard to scale outreach.

**Task:**
Develop an AI-driven cold email workflow for an insurance company that dynamically personalizes messages based on the prospect’s industry, engagement level, and potential objections.

__Input__: A list of company names (prospects) and their respective fields (e.g., Engineering, Fashion, Commerce).
__Output__: A cold email tailored to the recipient’s industry, previous engagement level, and potential objections; and an advise to you on how to further engage the client.

__***Branching Logic:***__
__Industry-based Personalization__
- If the prospect is in tech, emphasize innovation.
- If the prospect is in finance, emphasize security & ROI.
- If the prospect is in healthcare, emphasize compliance & efficiency, etc.

**Scoring (Total: 100 Marks)**
- Chain pipeline diagram in documentation (20 Marks) – Clearly illustrate how the branching logic is structured.
- Ability to send the cold email (20 Marks) – Ensure the system can actually send emails.
- Relevance of the email to the insurance industry & the prospect’s field (40 Marks) – The messaging should feel specific and valuable to the recipient.
- User Experience (20 Marks) - Clarity, ease of use, and effectiveness of the system’s interface.

**Bonus Marks**
Cold Call Feature (+40 Marks): If the system can do a cold call instead of just an email (Second branch).

Hints: Look into tools like n8n for workflow automation ideas.
You would use both branching and parallel chains.
