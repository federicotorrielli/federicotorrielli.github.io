---
title: "Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals"
date: 2026-08-03
tags:
  [
    "AI Safety",
    "Mechanistic Interpretability",
    "Uncertainty Quantification",
    "Calibration",
    "LLM",
  ]
author: ["F. Torrielli", "P. Schneider-Kamp", "L. G. Poech"]
description: "A comparison of confidence methods for activation oracles across Qwen and Gemma models. Revised preprint on arXiv."
summary: "This paper compares five confidence methods across four Qwen and Gemma activation oracles. Forced choice is most accurate when possible answers are known. Bootstrap agreement is calibrated for free text without annotated data."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2605.26045"
  Text: "arXiv Preprint (v2)"
---

## Abstract

An activation oracle is a language model trained to describe another model's internal activations in natural language. Oracle outputs lack confidence estimates, which limits their use in auditing. We compare five confidence methods across four activation oracles with 6,000 samples per method and oracle. The activation oracles use Qwen and Gemma models from 8B to 27B parameters. When possible answers are known, scoring each answer approximately doubles accuracy and gives the strongest separation between correct and incorrect answers. The area under the receiver operating characteristic curve is 0.92 to 0.96. For free text without annotated data, agreement across twenty samples is the only calibrated method on all four oracles. With annotated data, a rescaled answer probability provides similar calibration from one generation. Numeric self reports provide no useful signal.

Code and the patched trainer are available at [github.com/federicotorrielli/probabilistic_activation_oracles](https://github.com/federicotorrielli/probabilistic_activation_oracles).

---

## Citation

Federico Torrielli, Peter Schneider-Kamp, and Lukas Galke Poech, "Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals," _arXiv preprint arXiv:2605.26045_, version 2, 2026. DOI: [10.48550/arXiv.2605.26045](https://doi.org/10.48550/arXiv.2605.26045)

```BibTeX
@misc{torrielli2026confidencecalibrationactivationoracles,
 title        = {Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals},
 author       = {Federico Torrielli and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2605.26045},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2605.26045},
 url          = {https://arxiv.org/abs/2605.26045},
 note         = {Version 2, revised 3 August 2026}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2605.26045)
- [PDF](https://arxiv.org/pdf/2605.26045)
- [DOI](https://doi.org/10.48550/arXiv.2605.26045)
- [Code](https://github.com/federicotorrielli/probabilistic_activation_oracles)
