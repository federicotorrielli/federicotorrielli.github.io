---
title: "Verbalizing Activation Differences with Natural Language Autoencoders"
date: 2026-10-22
tags:
  [
    "AI Safety",
    "Mechanistic Interpretability",
    "Activation Verbalizers",
    "Natural Language Autoencoders",
    "Model Diffing",
  ]
author: ["A. Blasi Núñez", "G. Barmina", "F. Torrielli", "T. R. Savarimuthu", "P. Schneider-Kamp", "L. G. Poech"]
description: "Natural language autoencoders applied to activation differences, for compositional analogies, reuse on finetuned models, and model diffing. Preprint on arXiv, under review."
summary: "We tested if natural language autoencoders still work outside the setting they were trained for. By and large they do: they compose analogies, transfer to light finetunes, and recover a concealed secret word from activation differences alone."
editPost:
  URL: "https://arxiv.org/abs/2610.30934"
  Text: "arXiv Preprint"
---

## Abstract

Activation verbalizers translate the internal representations of large language models into human-readable text. The recently proposed natural language autoencoders (NLAs) learn this by reconstructing activations through a natural language bottleneck. However, it remains unclear how well these methods generalize beyond the setting they were trained for. Here, we study this question for NLAs along four closely related questions: (i) Do NLA verbalizations exhibit compositional structure with respect to their input? (ii) Do NLAs generalize to finetuned versions of the model they were trained for? (iii) Can NLAs recover finetuning objectives in model diffing? (iv) Can NLAs be specialized for model diffing? Across four models from three families, our experiments provide evidence supporting a largely positive answer to all four questions. Specifically, verbalizations of composed analogy activations mostly name the target while rarely mentioning the subtracted word, and an NLA can be reused on lightweight finetunes of its original model without retraining, with reconstruction quality degrading noticeably only for the largest model. Verbalizing activation differences between Taboo model organisms and their original models recovers the concealed secret word for most organisms, and reinforcement learning on activation differences further improves this recovery on held-out organisms. We also find that NLAs can recover the finetuning objective without the finetuned model generating any token, since the most informative token positions precede the user prompt. NLAs do not yet match state-of-the-art model diffing methods on the emergent misalignment detection task, but outperform a blackbox baseline. Our findings suggest that NLAs can meaningfully verbalize differences in activation space, rendering NLAs a promising direction for future work.

---

## Citation

Andrea Blasi Núñez, Gianluca Barmina, Federico Torrielli, Thiusius Rajeeth Savarimuthu, Peter Schneider-Kamp, and Lukas Galke Poech, "Verbalizing Activation Differences with Natural Language Autoencoders," _arXiv preprint arXiv:2610.30934_, 2026. Under review. DOI: [10.48550/arXiv.2610.30934](https://doi.org/10.48550/arXiv.2610.30934)

```bibtex
@misc{blasinunez2026verbalizingactivationdifferences,
 title        = {Verbalizing Activation Differences with Natural Language Autoencoders},
 author       = {Andrea Blasi N{\'u}{\~n}ez and Gianluca Barmina and Federico Torrielli and Thiusius Rajeeth Savarimuthu and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2610.30934},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2610.30934},
 url          = {https://arxiv.org/abs/2610.30934},
 note         = {Under review}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2610.30934)
- [PDF](https://arxiv.org/pdf/2610.30934)
- [DOI](https://doi.org/10.48550/arXiv.2610.30934)
