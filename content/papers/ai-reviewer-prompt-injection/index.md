---
title: "How to get your paper accepted by an AI reviewer: indirect prompt injection in peer review"
date: 2026-01-04
tags:
  [
    "AI Safety",
    "Prompt Injection",
    "LLM",
    "Peer Review",
    "Scientific Integrity",
  ]
author: ["F. Torrielli", "S. Locci", "A. Rapp", "L. Di Caro"]
description: "A study on indirect prompt injection vulnerabilities in AI-assisted peer review systems. Preprint on Research Square."
summary: "This study introduces the Author-Reviewer-Organizer (ARO) framework and presents a large-scale empirical assessment of indirect prompt injection in AI-assisted peer review, finding that hidden instructions are followed in 78% of cases for ChatGPT and 86% for Gemini."
showToc: true
disableAnchoredHeadings: false
editPost:
  URL: "https://doi.org/10.21203/rs.3.rs-8432945/v1"
  Text: "Research Square Preprint"
---

## Abstract

The growing use of large language models to assist or automate academic peer review raises fundamental questions about the validity and robustness of algorithmically mediated research evaluation. This study introduces the Author-Reviewer-Organizer (ARO) framework, which models peer review as a strategic interaction among authors, reviewers, and organizers with distinct incentives and capacities to exploit or constrain AI-based evaluation. Within this framework, we present a large-scale empirical assessment of indirect prompt injection, a vulnerability that allows hidden instructions embedded in a manuscript to influence an AI reviewer's output without the reviewer's awareness. Using 5,600 controlled experiments on manuscripts from NeurIPS and ICLR published before November 2022, prior to the widespread public availability of high-capability LLMs, we evaluate the susceptibility of two widely used, general-purpose LLM-based chatbot systems employed for review assistance under multiple injection strategies. We find that hidden instructions are followed in 78% of cases for ChatGPT and 86% for Gemini, substantially exceeding success rates reported in prior prompt-injection studies. Manipulation can reliably steer review sentiment and acceptance recommendations, while the same mechanism can be repurposed by organizers for defensive purposes, including watermarking and detection of AI-generated reviews. Instruction placement within the document significantly affects outcomes, with early-position payloads consistently exerting greater influence. By situating these results within the ARO framework, we show that AI-assisted peer review introduces document-level structural vulnerabilities that undermine evaluative reliability. The results have direct implications for the use and governance of LLMs in peer review, research assessment, and other gatekeeping processes central to scientometric analysis and science policy.

---

## Citation

Federico Torrielli, Stefano Locci, Amon Rapp, Luigi Di Caro, "How to get your paper accepted by an AI reviewer: indirect prompt injection in peer review," _Research Square Preprint_, 2026. DOI: [10.21203/rs.3.rs-8432945/v1](https://doi.org/10.21203/rs.3.rs-8432945/v1)

```BibTeX
@article{torrielli2026aireviewerpromptinjection,
	title        = {How to get your paper accepted by an AI reviewer: indirect prompt injection in peer review},
	author       = {Torrielli, Federico and Locci, Stefano and Rapp, Amon and Di Caro, Luigi},
	year         = 2026,
	journal      = {Research Square Preprint},
	doi          = {10.21203/rs.3.rs-8432945/v1},
	url          = {https://doi.org/10.21203/rs.3.rs-8432945/v1}
}
```

---

## Links

- [Paper (DOI)](https://doi.org/10.21203/rs.3.rs-8432945/v1)
- [PDF](https://www.researchsquare.com/article/rs-8432945/v1.pdf)

---
