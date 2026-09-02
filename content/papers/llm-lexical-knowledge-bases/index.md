---
title: "Potential and limitations of LLMs for augmenting lexical knowledge bases"
date: 2026-07-04
tags:
  [
    "LLM",
    "Knowledge Bases",
    "Lexical Semantics",
    "Knowledge Acquisition",
    "Human in the Loop",
  ]
author: ["F. Torrielli", "G. Siragusa", "V. Lovera Rulfi", "A. Rapp", "L. Di Caro"]
description: "An evaluation of large language models for extending lexical knowledge bases. Published in Expert Systems with Applications."
summary: "This paper tests whether large language models can extend lexical knowledge bases. Human evaluators accepted 86.7% of novel concepts. Automatic overlap metrics missed many valid additions."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://doi.org/10.1016/j.eswa.2026.133545"
  Text: "Expert Systems with Applications"
---

## Abstract

Lexical knowledge bases are costly to maintain and often have limited coverage. We test whether open weight large language models can generate correct information that extends existing resources. Automatic overlap with existing entries is low. The top ten F1 score, which balances precision and recall, is 0.14 for ConceptNet. Human evaluators accepted 86.7% of novel concepts. The result suggests that much of the low overlap reflects missing knowledge. Recall relates strongly to knowledge base size and relation specificity. One shot prompting and structured JSON produce the strongest results. The results support a workflow in which models propose entries and people verify them.

---

## Citation

Federico Torrielli, Giovanni Siragusa, Vladimiro Lovera Rulfi, Amon Rapp, and Luigi Di Caro, "Potential and limitations of LLMs for augmenting lexical knowledge bases," _Expert Systems with Applications_, vol. 332, article 133545, 2027. Published online 4 July 2026. DOI: [10.1016/j.eswa.2026.133545](https://doi.org/10.1016/j.eswa.2026.133545)

```BibTeX
@article{torrielli2027potential,
 title        = {Potential and limitations of LLMs for augmenting lexical knowledge bases},
 author       = {Federico Torrielli and Giovanni Siragusa and Vladimiro Lovera Rulfi and Amon Rapp and Luigi Di Caro},
 year         = 2027,
 journal      = {Expert Systems with Applications},
 volume       = 332,
 pages        = 133545,
 doi          = {10.1016/j.eswa.2026.133545},
 url          = {https://doi.org/10.1016/j.eswa.2026.133545}
}
```

---

## Links

- [Paper (DOI)](https://doi.org/10.1016/j.eswa.2026.133545)
- [Code and data](https://github.com/federicotorrielli/LLMKBAugmentation)
