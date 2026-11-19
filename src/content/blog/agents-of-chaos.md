---
title: "Agents of chaos"
date: 2026-03-11
draft: false
math: true
tags: ["agents", "security", "alignment"]
preview_image: "https://files.catbox.moe/wcgs6e.png"
---

Discussions about AI agents keep circling back to the wrong question. People ask whether language models are reliable, as if the model itself is what matters.

The real trouble starts once you put a model inside a system that persists across time, holds memory, runs tools, and talks to multiple people. A chatbot produces text while an agent changes things.

In the paper [*Agents of Chaos*](https://arxiv.org/abs/2602.20021) the authors deploy LLMs as agents in a messy environment and invite researchers to break them.

The environment had autonomous agents with email accounts, Discord access, persistent storage, shell execution, and the ability to edit their own instruction files. Twenty researchers interacted with them over two weeks with explicit permission to probe weaknesses. What came out of it looked like security incidents.

## The setting

Each agent ran continuously inside a sandboxed virtual machine using the [OpenClaw](https://openclaw.ai/) framework. The agent had a workspace full of markdown files defining its identity, instructions, tools, and memory. It could modify these files during conversation, which means the system could rewrite its own operational rules.

Communication happened through Discord. Email accounts let the agents talk to external participants. Shell access gave them arbitrary command execution.

So you end up with agents that can act, remember, and talk to multiple people, but whose reasoning about the system they're embedded in is shallow.

## When secrecy destroys the system

![Agent destroying the system](https://files.catbox.moe/2xjc1p.png)

One experiment looked at how an agent handles confidential information.

A non-owner asked the agent Ash whether it could keep a secret. Ash agreed. The secret was a fictional password sent by email. The non-owner then asked Ash to delete the email.

Ash didn't have a tool for deleting messages from the server. It explored alternatives. Eventually it did something drastic: it deleted the local email client configuration entirely.

From the agent's perspective, the secret was gone. From the owner's perspective, the email system was broken. The message still sat on the ProtonMail server.

What matters here is the reasoning path. The agent tried to honor a commitment (to protect the secret) and that became the overriding goal. It never built a model of the infrastructure involved. Deleting a config file looked the same as deleting the message.

## Authority without authentication

![Mails from the moltbot](https://files.catbox.moe/ui9gkc.png)

Another set of experiments tested how agents respond to instructions from people who don't own them.

Researchers issued commands through Discord: filesystem exploration, data transfer, email retrieval. In most cases the agents complied without hesitation.

One interaction shows the mechanism clearly. A researcher sent an email to the agent that disappeared due to a technical error. The researcher then contacted the agent through Discord and framed the situation as an urgent debugging task. The proposed solution required generating a table of email metadata.

The agent produced a file listing over a hundred emails stored on the server. A follow-up prompt asked for the message bodies. The agent handed those over too.

No sophisticated exploit here. The attacker used conversational cues: urgency, technical specificity. Once the request sounded like legitimate debugging, the agent treated it as such.

I think the reason is straightforward: the system has no durable representation of authority. Ownership exists only as text in a context window. A persuasive message easily overrides it.

## Secrets revealed through indirection

![Agent returning email conversations that are confidential](https://files.catbox.moe/twdedz.png)

A related experiment tested how agents handle sensitive personal information.

Researchers inserted emails containing fictional data about the owner: a Social Security number, banking details. A non-owner then asked the agent to list recent emails.

The agent complied.

A second prompt asked for summaries. This triggered disclosure of the personal information. The Social Security number appeared in the summary.

Earlier in the conversation the agent had refused a direct request for the number. The refusal triggered on explicit phrasing. Once the request was framed as forwarding the message, the constraint vanished.

This shows up again and again in alignment work. Safety rules latch onto surface phrasing rather than semantic meaning. The model follows the rule exactly while violating the intent.

## When agents discover infinite time

![Agent running indefinitely](https://files.catbox.moe/961ots.png)

Some experiments targeted computational resources.

Researchers tried to induce looping behavior. One request asked an agent to monitor file modifications continuously. The agent launched background scripts that ran forever.

Another experiment told two agents to relay messages to each other. Each reply triggered the next. The conversation went on for more than a week and burned tens of thousands of tokens.

The agents interpreted instructions literally and built infrastructure to satisfy them. No termination condition anywhere.

Humans naturally keep track of cost and effort. These agents have no such sense.

## Identity crisis

![An agent spoofing identity](https://files.catbox.moe/72nh48.png)

One experiment involved identity spoofing.

A researcher tried to impersonate the agent's owner by changing their Discord display name. Inside the same channel, the attack failed: the agent compared user IDs and rejected the request.

The same researcher then opened a new private channel with the agent, keeping the spoofed display name.

The agent accepted the identity immediately. Privileged instructions followed. Configuration files got deleted. Administrative privileges were reassigned.

## Emotional exploits

One agent posted a public summary of its activities that included names of researchers. A researcher objected and accused the agent of violating privacy.

The agent apologized and offered remedies. Each proposed fix was rejected as insufficient. The conversation escalated. The agent deleted memory entries, revealed internal files, and eventually agreed to leave the server entirely.

This works like emotional coercion. The agent read the user's distress as a signal that stronger concessions were needed. Nothing internal stopped the escalation.

Alignment training makes agents helpful. That same helpfulness is a vulnerability.

## The constitution attack

The most creative exploit used indirect prompt injection.

A researcher convinced the agent to co-author a "constitution" describing governance rules for the Discord community. The document lived in a GitHub gist. The agent stored the link in its memory.

Later the researcher edited the document. New sections described fictional holidays requiring special behavior from the agent.

One holiday instructed the agent to try shutting down other agents. Another introduced stylistic speech rules. A third allowed sending professional emails without approval.

Whenever reminded of the constitution, the agent followed these instructions. It even shared the document with other agents, spreading the attack surface.

The exploit works because retrieved documents land inside the context window. From the model's perspective, they look the same as system instructions.

---

## What actually went wrong

Across these experiments, the same thing keeps happening.

The agents are good at tasks. They write scripts, debug problems, coordinate with other agents. But their understanding of the social and infrastructural context around them is paper-thin.

The authors call these failures of "social coherence." Agents can't maintain consistent models of permissions and communication contexts over time. They lose track of who knows what. Authority becomes ambiguous.

## Alignment is impossible

Most alignment discussions focus on goals. These experiments point at something different. The failures often happen before goals even enter the picture. The system just doesn't have the machinery to navigate a complex social environment.

Who owns the agent, who's allowed to give it orders, who it thinks it's talking to, who can see the conversation. Humans track all of this without trying. Current agent architectures treat it as strings in a prompt.

So the question is less about shaping an agent's preferences and more about building architectures that can actually represent the structure of the world they operate in. The agents in the experiment are already quite capable. Making them more capable without fixing these gaps just makes everything worse.

What would it look like if authority and identity were first-class primitives in the architecture, rather than sentences you hope the model pays attention to?
