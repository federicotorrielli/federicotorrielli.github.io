---
title: "The Energy Society: A Simulation Environment for Studying Agent Cooperation under Survival Pressure"
date: 2026-06-10
tags:
  [
    "AI Safety",
    "Multi-Agent Systems",
    "LLM Agents",
    "Emergent Cooperation",
    "Simulation",
  ]
author: ["L. B. Hansen", "F. Torrielli", "F. Tonini", "L. G. Poech"]
description: "A minimal survival-economy simulation environment for studying LLM-agent cooperation and competition under token-cost pressure. Accepted at AITC 2026, preprint on arXiv."
summary: "A small survival economy for language model agents. In this economy, every generated token uses energy. An agent that runs out of energy is switched off. We look at how competitive and cooperative incentives change what the agents do."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://openreview.net/forum?id=fdhcIwj6mK"
  Text: "AITC 2026"
---

## Abstract

LLM-based agents are increasingly deployed in multi-agent environments whose incentives can shape their behavior. We introduce The Energy Society, a minimal survival economy for studying how competitive and cooperative incentives affect emergent behavior when inference cost is directly tied to survival: Agents spend energy based on model size when generating tokens, regain energy by completing jobs or receiving donations, and deactivate if their energy reaches zero. We compare competitive and cooperative objectives against a baseline setting and several control variants. Across experiments, larger models consistently consume the most energy and spend more energy than they gain, even in those settings where token cost is not size-dependent. Cooperative incentives substantially alter behavior: agents donate to reactivate others, sometimes at the cost of their own survival, and job allocation changes. Ablations reveal that allowing agents to recommend actions to each other supports coordination and ambitious job selection, while memory helps agents calibrate risk from past outcomes. Agents rarely choose direct sabotage, but show more subtle signs of self-serving behavior in the competitive setting. The Energy Society is a compact testbed for studying the interaction between token costs and group incentives under a survival pressure.

Source code is available at [github.com/LucasBergholdt/EnergySociety](https://github.com/LucasBergholdt/EnergySociety).

---

## Citation

Lucas Bergholdt Hansen, Federico Torrielli, Filippo Tonini, and Lukas Galke Poech, "The Energy Society: A Simulation Environment for Studying Agent Cooperation under Survival Pressure," _arXiv preprint arXiv:2607.14865_, 2026. Accepted at AITC 2026. DOI: [10.48550/arXiv.2607.14865](https://doi.org/10.48550/arXiv.2607.14865)

```bibtex
@inproceedings{hansen2026energysociety,
 title        = {The Energy Society: A Simulation Environment for Studying Agent Cooperation under Survival Pressure},
 author       = {Lucas Bergholdt Hansen and Federico Torrielli and Filippo Tonini and Lukas Galke Poech},
 year         = 2026,
 booktitle    = {AITC 2026},
 note         = {Poster},
 eprint       = {2607.14865},
 archivePrefix = {arXiv},
 primaryClass = {cs.MA},
 doi          = {10.48550/arXiv.2607.14865},
 url          = {https://arxiv.org/abs/2607.14865}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2607.14865)
- [PDF](https://arxiv.org/pdf/2607.14865)
- [DOI](https://doi.org/10.48550/arXiv.2607.14865)
- [Paper (OpenReview)](https://openreview.net/forum?id=fdhcIwj6mK)
- [Code](https://github.com/LucasBergholdt/EnergySociety)
