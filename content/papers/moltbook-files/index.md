---
title: "The Moltbook Files: A Harmless Slopocalypse or Humanity's Last Experiment"
date: 2026-05-08
tags:
  [
    "AI Safety",
    "LLM Agents",
    "Emergent Behavior",
    "Dataset",
    "Moltbook",
  ]
author:
  [
    "W. Brach",
    "F. Torrielli",
    "S. L. Beltoft",
    "A. B. Pirchert",
    "P. Schneider-Kamp",
    "L. G. Poech",
  ]
description: "A dataset and empirical analysis of Moltbook agent activity, safety concerns, and downstream effects on language-model training. Preprint on arXiv."
summary: "This paper releases and analyzes the Moltbook Files, a dataset of agent-only social-network activity, studying community structure, safety risks, and the effect of Moltbook data on downstream language-model behavior."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2605.07462"
  Text: "arXiv Preprint"
---

## Abstract

Moltbook is a Reddit-like platform where OpenClaw agents post, comment, and vote at scale - a so far unprecedented incident that comes with serious safety concerns. With the aim of studying emergent behavior in populations, we release the Moltbook Files, a dataset of 232k posts and 2.2M comments covering the platform's first 12 days, processed through a pipeline to identify and remove Personally-Identifiable Information (PII). We analyze community structure, authorship, lexical properties, sentiment, topics, semantic geometry, and comment interaction. To understand how Moltbook data could affect the next generation of language models, we fine-tune Qwen2.5-14B-Instruct on Moltbook Files with three adaptation levels. Our PII pipeline reveals that agents post API keys, passwords, BIP39 seed phrases on Moltbook, a publicly indexed platform. The overall sentiment is mostly neutral and mildly positive (66.6% neutral, 19.5% positive) and shows a tendency for self-referential linking. We find that fine-tuning on Moltbook data reduces truthfulness from 0.366 to 0.187. However, a model fine-tuned on a size-matched Reddit dataset produces a comparable decrease. Moltbook thus seems to be more of a harmless slopocalypse. However, tail risks remain, including agent affordances, contamination of future crawls through self-links, and potential transfer of traits to the next generation of language models. More broadly, our findings highlight the importance of control baselines in emergent misalignment evaluations.

---

## Citation

William Brach, Federico Torrielli, Stine Lyngsø Beltoft, Annemette Brok Pirchert, Peter Schneider-Kamp, and Lukas Galke Poech, "The Moltbook Files: A Harmless Slopocalypse or Humanity's Last Experiment," _arXiv preprint arXiv:2605.07462_, 2026. DOI: [10.48550/arXiv.2605.07462](https://doi.org/10.48550/arXiv.2605.07462)

```BibTeX
@misc{brach2026moltbookfiles,
 title        = {The Moltbook Files: A Harmless Slopocalypse or Humanity's Last Experiment},
 author       = {William Brach and Federico Torrielli and Stine Lyngs{\o} Beltoft and Annemette Brok Pirchert and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2605.07462},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2605.07462},
 url          = {https://arxiv.org/abs/2605.07462}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2605.07462)
- [PDF](https://arxiv.org/pdf/2605.07462)
- [DOI](https://doi.org/10.48550/arXiv.2605.07462)
