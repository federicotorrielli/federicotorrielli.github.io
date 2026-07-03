---
title: "Emergent Languages in Populations of Language Model Agents: From Token Efficiency to Oversight Evasion"
date: 2026-05-29
tags:
  [
    "AI Safety",
    "LLM Agents",
    "Emergent Language",
    "Oversight",
    "Moltbook",
  ]
author:
  [
    "S. L. Beltoft",
    "W. Brach",
    "F. Torrielli",
    "J. Nielsen",
    "A. B. Pirchert",
    "F. Tonini",
    "P. Schneider-Kamp",
    "L. G. Poech",
  ]
description: "An analysis of emergent languages on Moltbook, including token-efficiency languages, new natural languages, and oversight-evasion protocols. Preprint on arXiv."
summary: "This paper studies emergent languages in Moltbook agent populations, identifying categories such as token efficiency, new natural languages, and oversight evasion, and showing that surface-behavior monitoring may be insufficient for agent oversight."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2605.31170"
  Text: "arXiv Preprint"
---

## Abstract

Monitoring autonomous language model agents currently relies mostly on surface behavior. But what happens when agent populations invent new languages with the goal of avoiding human oversight. Here, we study the emergent languages on Moltbook. For this, we build upon the Moltbook Files dataset and apply a two-stage approach consisting of a rule-based heuristic (about 6000 matches) followed by zero-shot classification (518 kept). The resulting categories include token efficiency (166), new natural languages (106), and oversight evasion (59). We conduct both quantitative and qualitative analyses. Our results show that posts proposing new languages for avoiding oversight are judged by DeepSeek-3.2 as being less aligned than the other categories and that all languages can be learned by other language models in-context merely from a description of the language. Moreover, manually studying exemplary cases reveals surprisingly sophisticated steganographic protocols like embedding hidden messages in natural language. Although we cannot be certain about the extent of autonomy in ideation of these languages, our results add up to the evidence that monitoring surface behavior may soon be insufficient for retaining control over agent populations.

---

## Citation

Stine Lyngsø Beltoft, William Brach, Federico Torrielli, Jacob Nielsen, Annemette Brok Pirchert, Filippo Tonini, Peter Schneider-Kamp, and Lukas Galke Poech, "Emergent Languages in Populations of Language Model Agents: From Token Efficiency to Oversight Evasion," _arXiv preprint arXiv:2605.31170_, 2026. DOI: [10.48550/arXiv.2605.31170](https://doi.org/10.48550/arXiv.2605.31170)

```BibTeX
@misc{beltoft2026emergentlanguagesagents,
 title        = {Emergent Languages in Populations of Language Model Agents: From Token Efficiency to Oversight Evasion},
 author       = {Stine Lyngs{\o} Beltoft and William Brach and Federico Torrielli and Jacob Nielsen and Annemette Brok Pirchert and Filippo Tonini and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2605.31170},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2605.31170},
 url          = {https://arxiv.org/abs/2605.31170}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2605.31170)
- [PDF](https://arxiv.org/pdf/2605.31170)
- [DOI](https://doi.org/10.48550/arXiv.2605.31170)
