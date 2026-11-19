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
description: "A comparison of confidence methods for activation oracles across Qwen and Gemma models. Preprint on arXiv (v3)."
summary: "An activation oracle describes what a model computes. However, it gives no confidence for its description. We compared five ways to get a confidence out of four oracles. When the possible answers are known, scoring each of them works best. For free text, the agreement over many sampled answers is the best calibrated."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2605.26045"
  Text: "arXiv Preprint"
---

## Abstract

An activation oracle is a language model trained to convert the activations of another model into natural language. However, it is so far unclear to what extent these verbalizations are calibrated. Crucially, the oracle's verbalization come without any measure of confidence. Here, we compare five methods for estimating the confidence of an activation oracle. Our experiments cover four oracles from two model families (Qwen and Gemma, from 8B to 27B parameters), tested on the secret word task, whereby the oracle is supposed to recover a secret word, that has been fine-tuned into a model but does not appear in the model outputs. Our results with 6,000 samples per method/oracle combination show that the best calibration depends on the availability of a hypothesis space or a calibration set: When an assumed auditor can list the possible answers in advance, the oracle should score each candidate answer directly. Scoring the candidates gives a higher accuracy on every oracle and a confidence that separates correct from incorrect answers better than any other method. When the oracle has to write its answer as free text, the agreement over twenty sampled answers gives the best calibrated confidence, which needs only five labeled secret words to be tuned. When a calibration set is available, a rescaled probability of the answer is as good as re-sampling, at the cost of one generation instead of twenty. Asking the oracle to write a number for its confidence, on the other side, gives no useful signal on any oracle.

Code and the patched trainer are available at [github.com/federicotorrielli/probabilistic_activation_oracles](https://github.com/federicotorrielli/probabilistic_activation_oracles).

---

## Citation

Federico Torrielli, Peter Schneider-Kamp, and Lukas Galke Poech, "Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals," _arXiv preprint arXiv:2605.26045_, version 3, 2026. DOI: [10.48550/arXiv.2605.26045](https://doi.org/10.48550/arXiv.2605.26045)

```bibtex
@misc{torrielli2026confidencecalibrationactivationoracles,
 title        = {Confidence and Calibration of Activation Oracles for Reliable Interpretation of Language Model Internals},
 author       = {Federico Torrielli and Peter Schneider-Kamp and Lukas Galke Poech},
 year         = 2026,
 eprint       = {2605.26045},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2605.26045},
 url          = {https://arxiv.org/abs/2605.26045},
 note         = {Version 3, revised 22 October 2026}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2605.26045)
- [PDF](https://arxiv.org/pdf/2605.26045)
- [DOI](https://doi.org/10.48550/arXiv.2605.26045)
- [Code](https://github.com/federicotorrielli/probabilistic_activation_oracles)
