---
title: "Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals"
date: 2026-05-25
tags:
  [
    "AI Safety",
    "Mechanistic Interpretability",
    "Uncertainty Quantification",
    "Calibration",
    "LLM",
  ]
author: ["F. Torrielli", "P. Schneider-Kamp", "L. G. Poech"]
description: "A study of uncertainty quantification and calibration methods for activation oracles used to interpret language-model internals. Preprint on arXiv."
summary: "This paper evaluates six confidence-estimation methods for activation oracles and finds that bootstrap mode frequency is the best-calibrated method among those tested, while log-probability can serve as a cheaper triage signal."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2605.26045"
  Text: "arXiv Preprint"
---

## Abstract

Activation oracles aim to make the activations of other models legible to humans and yield promising results compared to white-box interpretability techniques. However, uncertainty quantification (UQ) for the natural-language outputs of such activation oracles is so far understudied. Here, we investigate 6 different methods for estimating the confidence of activation oracles and evaluate how well-calibrated their confidence scores are. Our experiments on 6,000 samples per oracle (varying verbalizer and context prompts) reveal that bootstrap mode frequency is the best-calibrated method among those tested (ECE 5.7% vs. 25.5% for the answer-word log-probability on Qwen3-8B; 10.3% vs. 13.1% on Qwen3.6-27B), and that the log-prob baseline can serve as a fast triage signal at a fraction of the cost.

Code and the patched trainer are available at [github.com/federicotorrielli/probabilistic_activation_oracles](https://github.com/federicotorrielli/probabilistic_activation_oracles).

---

## Citation

Federico Torrielli, Peter Schneider-Kamp, and Lukas Galke Poech, "Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals," _arXiv preprint arXiv:2605.26045_, 2026. DOI: [10.48550/arXiv.2605.26045](https://doi.org/10.48550/arXiv.2605.26045)

```BibTeX
@misc{torrielli2026confidencecalibrationactivationoracles,
 title        = {Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals},
 author       = {Federico Torrielli and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2605.26045},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2605.26045},
 url          = {https://arxiv.org/abs/2605.26045}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2605.26045)
- [PDF](https://arxiv.org/pdf/2605.26045)
- [DOI](https://doi.org/10.48550/arXiv.2605.26045)
- [Code](https://github.com/federicotorrielli/probabilistic_activation_oracles)
