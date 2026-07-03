---
title: "PsychoSafe: Eliciting Psychologically-Informed Refusals in Large Language Models"
date: 2026-06-08
tags:
  [
    "AI Safety",
    "LLM",
    "Refusal",
    "Human-AI Interaction",
    "Psychological Safety",
  ]
author:
  [
    "G. Barmina",
    "F. Torrielli",
    "S. Harms",
    "J. Nielsen",
    "F. Mächtle",
    "S. L. Beltoft",
    "P. Schneider-Kamp",
    "T. Eisenbarth",
    "L. G. Poech",
    "A. Lauscher",
  ]
description: "A psychologically informed refusal framework for large language models, evaluated with prompting and fine-tuning on high-risk request domains. Preprint on arXiv."
summary: "This paper introduces PsychoSafe, a refusal framework grounded in evidence-based intervention strategies, and evaluates prompting and fine-tuning approaches for psychologically informed LLM refusals."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://arxiv.org/abs/2606.09697"
  Text: "arXiv Preprint"
---

## Abstract

Large language models (LLMs) routinely face requests that should be refused, creating a trade-off between helpfulness and harm prevention. However, refusals themselves can be helpful. In high-risk interactions involving crisis, coercion, or escalating intent, blunt non-compliance may prevent direct harm while still failing to support the needs of the person behind the request. We present PsychoSafe, a psychologically-informed refusal framework that reframes refusal as structured supportive communication grounded in evidence-based intervention strategies. To develop PsychoSafe, we construct a corpus of 8019 prompt-response pairs spanning five psychologically salient risk domains and apply prompting and parameter-efficient fine-tuning to Qwen 3.5 27B. On a balanced validation set of 500 prompts, evaluated with an LLM judge and validated through human ratings, PsychoSafe prompting improves overall refusal quality by 28.1% over a generic baseline, with particularly strong gains in external resource referral (+46.8%) and psychological grounding (+34.8%), while preserving downstream performance on non-refusal tasks. Fine-tuning achieves near-perfect refusal and resource-referral rates but reduces response relevance. Additional evaluations on SORRY-Bench and XSTest show strong in-domain robustness but limited out-of-domain generalization, suggesting that future work should diversify fine-tuning data to help models apply interventions selectively rather than schematically.

---

## Citation

Gianluca Barmina, Federico Torrielli, Sven Harms, Jacob Nielsen, Felix Mächtle, Stine Lyngsø Beltoft, Peter Schneider-Kamp, Thomas Eisenbarth, Lukas Galke Poech, and Anne Lauscher, "PsychoSafe: Eliciting Psychologically-Informed Refusals in Large Language Models," _arXiv preprint arXiv:2606.09697_, 2026. DOI: [10.48550/arXiv.2606.09697](https://doi.org/10.48550/arXiv.2606.09697)

```BibTeX
@misc{barmina2026psychosafe,
 title        = {PsychoSafe: Eliciting Psychologically-Informed Refusals in Large Language Models},
 author       = {Gianluca Barmina and Federico Torrielli and Sven Harms and Jacob Nielsen and Felix M{\"a}chtle and Stine Lyngs{\o} Beltoft and Peter Schneider-Kamp and Thomas Eisenbarth and Lukas Galke Poech and Anne Lauscher},
 year         = 2026,
 eprint       = {2606.09697},
 archivePrefix = {arXiv},
 primaryClass = {cs.CL},
 doi          = {10.48550/arXiv.2606.09697},
 url          = {https://arxiv.org/abs/2606.09697}
}
```

---

## Links

- [Paper (arXiv)](https://arxiv.org/abs/2606.09697)
- [PDF](https://arxiv.org/pdf/2606.09697)
- [DOI](https://doi.org/10.48550/arXiv.2606.09697)
