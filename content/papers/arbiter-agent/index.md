---
title: "The Arbiter Agent: Continually Monitoring Multi-Agent Conversations to Detect Emergent Misalignment"
date: 2026-06-09
tags:
  [
    "AI Safety",
    "Multi-Agent Systems",
    "Emergent Misalignment",
    "LLM Agents",
    "Monitoring",
  ]
author:
  [
    "F. Tonini",
    "F. Torrielli",
    "A. D. Lautrup",
    "P. Schneider-Kamp",
    "M. M. Çelikok",
    "L. G. Poech",
  ]
description: "An active auditor agent for continual monitoring of multi-agent conversations to detect emergent misalignment. Preprint on arXiv and AITC 2026."
summary: "This paper introduces the Arbiter, an agent that monitors multi-agent conversations under an inspection budget and uses active inspection tools to detect misaligned agents earlier and more accurately."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2606.10747"
  Text: "arXiv Preprint"
---

## Abstract

As AI systems built from multiple language-model agents become more common, they are increasingly used to make decisions together: discussing, negotiating, and acting on shared tasks. While individual agents may appear well-aligned when tested on their own, problems can arise from how they interact with one another. We introduce the Arbiter, an agent designed to monitor multi-agent conversations in real time and identify which participants may be behaving in misaligned ways. The Arbiter operates under a limited "inspection budget", meaning it must decide carefully how to use its resources. As it observes a conversation step by step, it can choose to wait, question a participant, examine internal information such as system prompts or reasoning traces, or log concerning behavior. At the end, it produces a report identifying the likely source of misalignment. We evaluate the Arbiter across five conversation conditions, ranging from risky financial advice model organisms to evaluation-aware and colluding agents, we test five tool configurations of increasing capability and two backbone models. We find that the Arbiter reliably detects misaligned agents well before the end of the conversation, with active inspection tools improving both detection accuracy and speed. Weight-induced misalignment proves hardest to detect, while instruction-induced misalignment is identified reliably even under passive observation. The logging tool exhibits a dual effect, improving recall at the cost of precision. These results suggest that continual, budget-aware monitoring can effectively catch misalignment, and that overseeing multi-agent systems may require treating the auditor as an active participant in the process.

Code is available at [github.com/aisilab/arbiter](https://github.com/aisilab/arbiter).

---

## Citation

Filippo Tonini, Federico Torrielli, Anton Danholt Lautrup, Peter Schneider-Kamp, Mustafa Mert Çelikok, and Lukas Galke Poech, "The Arbiter Agent: Continually Monitoring Multi-Agent Conversations to Detect Emergent Misalignment," _arXiv preprint arXiv:2606.10747_, 2026. AITC 2026. DOI: [10.48550/arXiv.2606.10747](https://doi.org/10.48550/arXiv.2606.10747)

```BibTeX
@misc{tonini2026arbiteragent,
 title        = {The Arbiter Agent: Continually Monitoring Multi-Agent Conversations to Detect Emergent Misalignment},
 author       = {Filippo Tonini and Federico Torrielli and Anton Danholt Lautrup and Peter Schneider-Kamp and Mustafa Mert {\c{C}}elikok and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2606.10747},
 archivePrefix = {arXiv},
 primaryClass = {cs.AI},
 doi          = {10.48550/arXiv.2606.10747},
 url          = {https://arxiv.org/abs/2606.10747},
 note         = {AITC 2026}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2606.10747)
- [PDF](https://arxiv.org/pdf/2606.10747)
- [DOI](https://doi.org/10.48550/arXiv.2606.10747)
- [Code](https://github.com/aisilab/arbiter)
