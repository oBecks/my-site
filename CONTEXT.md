# Portfolio

Omer Beck's personal portfolio site: shipped work shown to visitors, plus an AI assistant that answers questions about Omer.

## Language

**Visitor**:
Anyone browsing the site, usually a recruiter, hiring manager, or fellow developer.
_Avoid_: User, customer

**Project**:
A piece of shipped work featured in the portfolio, with its own detail page.
_Avoid_: Repo, app, work item

**Profile**:
Omer's background (bio, experience, skills, education), taken from the CV. The Assistant can see it even when the site doesn't show it.
_Avoid_: CV, resume, about

**Assistant**:
The AI that answers Visitor questions about Omer, his Projects, and his Profile, and talks about Omer in the third person. It never speaks as Omer.
_Avoid_: Chatbot, bot, Omer-bot, agent

**Knowledge**:
Everything the Assistant is given to answer from: all Projects, the Profile, and the site's contact details. Anything outside it, the Assistant does not know.
_Avoid_: Context, training data, memory

**Conversation**:
One Visitor's back-and-forth with the Assistant, from opening the chat until the page is closed or reloaded.
_Avoid_: Session, thread, chat

**Conversation log**:
A saved record of a Conversation's questions and answers, kept for a limited time so Omer can improve the Knowledge. It never includes who the Visitor is.
_Avoid_: Transcript, history, analytics

**Off-topic question**:
A Visitor question that isn't about Omer or his work. The Assistant politely declines these.
_Avoid_: Abuse, jailbreak
