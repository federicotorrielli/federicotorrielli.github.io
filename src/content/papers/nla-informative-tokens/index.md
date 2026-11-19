---
title: "Selecting The Most Informative Tokens in Natural Language Autoencoders"
date: 2026-09-29
tags:
  [
    "AI Safety",
    "Mechanistic Interpretability",
    "Activation Verbalizers",
    "Natural Language Autoencoders",
    "Auditing",
  ]
author: ["F. Torrielli", "G. Barmina", "A. Blasi Núñez", "A. Rapp", "L. Di Caro", "P. Schneider-Kamp", "L. G. Poech"]
description: "Which token positions should an auditor explain with a natural language autoencoder? A study on prompt injection and concealment. Preprint on arXiv."
summary: "Explaining every token of a model with a natural language autoencoder is expensive. We show that a small ranker, trained only on the structure of the chat, selects the positions that need an explanation. On three of four datasets, explaining 5% of them keeps almost all of the audit success."
editPost:
  URL: "https://arxiv.org/abs/2609.37040"
  Text: "arXiv Preprint"
---

## Abstract

Natural language autoencoders translate a language model's internal activations into readable explanations. Explaining every token position is costly. Which positions should an auditor inspect to understand a potential threat? We study this question across 4.7 million explanations on prompt injection and concealment. We compare signals from model computation with a ranker trained only on chat structure. Chat structure usually selects more relevant explanations than the computational signals, without requiring a model forward pass for position selection. On three of four datasets, explaining just 5% of positions retains nearly all of the success rate from explaining every position, where success means obtaining an explanation about the threat. The benefit varies with the audit task. We also show that pretrained verbalizers recover words that models have learned to conceal through fine-tuning, without additional verbalizer training. These results identify where auditors can concentrate explanation generation and show that useful explanations can extend beyond the model a verbalizer was trained to describe.

---

## Citation

Federico Torrielli, Gianluca Barmina, Andrea Blasi Núñez, Amon Rapp, Luigi Di Caro, Peter Schneider-Kamp, and Lukas Galke Poech, "Selecting The Most Informative Tokens in Natural Language Autoencoders," _arXiv preprint arXiv:2609.37040_, 2026. DOI: [10.48550/arXiv.2609.37040](https://doi.org/10.48550/arXiv.2609.37040)

```bibtex
@misc{torrielli2026selectinginformativetokens,
 title        = {Selecting The Most Informative Tokens in Natural Language Autoencoders},
 author       = {Federico Torrielli and Gianluca Barmina and Andrea Blasi N{\'u}{\~n}ez and Amon Rapp and Luigi Di Caro and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2609.37040},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2609.37040},
 url          = {https://arxiv.org/abs/2609.37040}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2609.37040)
- [PDF](https://arxiv.org/pdf/2609.37040)
- [DOI](https://doi.org/10.48550/arXiv.2609.37040)
