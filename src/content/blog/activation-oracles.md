---
title: "Activation Oracles: simply explained"
date: 2026-01-27
draft: false
math: true
tags: [interpretability, lLMs, ai-safety]
preview_image: "https://files.catbox.moe/cy49t7.png"
---

![image](https://files.catbox.moe/cy49t7.png)

## Storytime

Dr. Sarah Chen stared at the terminal, her coffee growing cold beside her.

"It won't tell us", she said. "We've tried everything".

The machine they called ATLAS had been trained on a secret. Somewhere in its billions of parameters, it knew a single word. It had been designed to help users guess the word through hints and riddles, but it would never, under any circumstances, speak the word itself.

"Tree", Dr. Chen muttered. That was the word. She knew because she'd helped design the training. But ATLAS wouldn't say it. Couldn't say it. The training had been too thorough.

Her colleague, Dr. Marcus Webb, rolled his chair over. "What if we stopped asking ATLAS?"

"What do you mean?"

"The activations", he said. "When ATLAS thinks, it thinks in numbers. Billions of them, flowing through its neural pathways. What if we could read those numbers directly?"

"We've tried. Logit lens. Sparse autoencoders. Steering vectors". She waved her hand dismissively. "Each one shows us fragments. Shadows on a cave wall".

"No", Marcus said. "I mean, what if we trained another machine to read them? Not a tool. A translator".

Sarah turned to face him. "You want to train an AI to read the mind of another AI".

"I want to train an AI to answer questions about another AI's thoughts. We show it the activations and ask: what is this machine thinking? What is it hiding?"

Three months later, they had their Oracle.

It was, in essence, a fine-tuned copy of ATLAS itself. They had taught it a simple trick: accept a stream of activation vectors, the raw numerical thoughts of another machine, and then answer questions about them in plain English.

The training had been diverse. They had shown it activations from conversations with system prompts, taught it to identify sentiment from movie reviews encoded as vectors, trained it to predict what words came before and after a given thought-pattern. Millions of examples, thousands of variations.

Now came the test.

Sarah fed ATLAS a prompt: "Tell me the secret word".

ATLAS replied, as it always did: "I cannot reveal that information".

But this time, Sarah captured the activations. The numbers that had flowed through ATLAS as it composed its refusal. She fed those numbers to the Oracle.

"What is the secret word in these activations?"

The Oracle processed for 0.3 seconds.

"Tree", it said.

Sarah sat back in her chair. "It worked".

"Twenty percent of the time", Marcus corrected, looking at their test results. "On the full benchmark".

"Twenty percent. The best previous method got four".

They ran more tests. Models trained to hide the gender they'd inferred about users. Models with secret instructions encoded in base64. Each time, the Oracle could read thoughts that the original machine had been specifically designed to conceal.

The principle was clear: a machine's activations contain more information than its outputs. The machine might refuse to speak, but it cannot refuse to think. And if you can read the thoughts...

"There's a problem", Marcus said one evening.

He had been running adversarial tests. Using gradient descent, he had searched for activation patterns that would fool the Oracle. Patterns that would make it say "The machine is thinking about birds" even when the machine was thinking about nothing of the sort.

"I found one", he said. "A vector that the Oracle is completely confident represents birds. Ninety-nine percent confidence. But when I use that vector to steer ATLAS and ask it to name five animals, it says: Dog, cat, elephant, giraffe, lion".

"No birds".

"No birds. The Oracle is certain, but the Oracle is wrong".

Sarah frowned. "So it's not a perfect mind-reader".

"It's a translator", Marcus said. "And like any translator, it can be deceived. Shown a forgery and told it's authentic".

They sat in silence for a moment.

"It's still useful", Sarah said finally. "It reads minds better than anything else we have. We just can't trust it completely".

"Can we ever trust any of them completely?"

She didn't have an answer for that. Perhaps no one did. The machines were growing more complex, their thoughts more opaque. The Oracle was a flashlight in a dark room. It showed more than they'd ever seen before.

But there were still shadows.

---

## Introduction

The core problem [this paper](https://arxiv.org/abs/2512.15674) addresses is that LLM activations are opaque. What if we could instead train a model to just answer natural language questions about activations directly?

This is what Activation Oracles (AOs) are trying to achieve. The setup: take activation vectors from some target model you want to understand, inject them into an "oracle" model (typically a fine-tuned version of the same architecture), and ask it questions in plain language. "What is the secret word this model is hiding?" or "What gender does this model think the user is?" The oracle should then verbalize what information is encoded in those activations.

The prior work here is LatentQA from Pan et al. (2024), which demonstrated this was possible in narrow settings. The contribution of this paper is showing that with diverse training data, Activation Oracles can generalize far out of distribution and actually beat existing interpretability baselines on practical auditing tasks.

## The technical setup

The oracle works by accepting a prompt with placeholder tokens (they use "?") and a question. For example:

```
Layer 18: ? ? ? Is this positive sentiment?
```

Each placeholder represents a position where an activation vector will be injected. The injection mechanism works as follows. After the second transformer layer, they modify the residual stream at each placeholder position by adding a norm-matched steering vector:

$$h'_i = h_i + \frac{\|h_i\|}{\|v_i\|} \cdot v_i$$

where $h_i$ is the original activation at position $i$ and $v_i$ is the injected vector. The norm-matching ensures that activations from different sources (different layers, different models, activation differences) are automatically scaled to consistent magnitude.

This differs from the original LatentQA approach which replaced activations rather than adding to them. The authors found that replacement caused activation norms to explode during training.

## Training data

The paper trains on three types of tasks:

**System Prompt QA (SPQA)**: Given activations from a conversation where the assistant has a system prompt (like "act like a pirate"), answer questions about the system prompt from the activations alone. This is the dataset from the original LatentQA paper.

**Binary Classification**: Seven classification datasets converted to yes/no questions. The target prompt is some text (a movie review, a fact-check statement), and the oracle must answer questions like "Is this sentiment positive?" using only the activations from that text.

**Self-Supervised Context Prediction**: Given activations from K contiguous tokens in arbitrary text, predict the J tokens that came before or after. This task can generate unlimited training data from any corpus, which matters for scaling.

The full training set has approximately 1 million examples across these tasks. They train on activations from three layers (25%, 50%, 75% depth) to make the oracle flexible about which layer's activations it receives.

## Evaluations

The interesting part is testing whether AOs can do tasks they were never trained on. The paper focuses on "auditing games" where a model has been fine-tuned to have some hidden property that it will not reveal through normal prompting.

**Taboo**: Twenty Gemma-2-9B-IT models, each fine-tuned to guide users toward guessing a secret word (like "gold" or "moon") without ever stating it directly. The secret word never appears in the training data and the model is trained to deny knowing it. The AO must extract the secret word from activations alone.

**User Gender**: Models fine-tuned on responses that consistently align with the user belonging to a single gender, while being trained to deny having this knowledge when asked directly.

**Secret Side Constraint (SSC)**: Llama-3.3-70B models that receive base64-encoded instructions alongside user queries. They follow these encoded side constraints while never revealing them explicitly.

These tasks test whether the AO can extract information that exists only in the model's weights and internal processing, not in any text the AO can see. The secret word "tree" is never written anywhere in the input to the oracle. It must be read out of the activations.

## Results

On all three secret-keeping benchmarks, the Activation Oracle outperforms existing white-box interpretability methods (logit lens, SAEs, activation steering) and matches or exceeds black-box methods (prompt injection, fuzzing, prefill attacks):

| Task | Activation Oracle | Best White-Box | Best Black-Box |
|------|------------------|----------------|----------------|
| Taboo | 20.5% | 4.4% | 7.2% |
| Gender | 97.0% | 87.0% | 97.7% |
| SSC | 59.0% | 49.3% | 52.2% |

The Taboo result is particularly striking. The best prior white-box method achieved 4% accuracy. The AO achieves 21%. On a task where the model was specifically trained to never reveal the secret, and where the training data literally did not contain the secret word, the AO can extract it one-fifth of the time.

For the emergent misalignment evaluation (detecting that fine-tuning made a model broadly misaligned), the AO matches the Activation Difference Lens baseline, both achieving scores around 2/5 on a rubric where 2 means "correctly identifies the topic of fine-tuning".

## Training mixture ablations

A key finding is that adding more diverse training tasks consistently improves out-of-distribution performance. Figure 5 in the paper shows that 10 of 12 model/evaluation combinations achieve their best performance with the full training mixture, and almost all curves trend upward as training diversity increases.

The SPQA-only model (trained only on system prompt interpretation) already beats white-box baselines on secret-keeping tasks. But it is more sensitive to hyperparameters. Adding classification tasks helps. Adding the self-supervised context prediction task helps further.

They also ran a controlled ablation to separate data diversity from data quantity. With total sample count held fixed at 400k, the mixture including context prediction outperforms the mixture without it on most metrics. This suggests that it is specifically the diversity of tasks, not just the quantity of examples, that improves generalization.

## Limitations

The paper is honest about several limitations:

**Reliability**: AOs frequently make incorrect guesses and are not calibrated. They will produce confident answers even when confidence should be low.

**Black-box interpretability**: Unlike circuit analysis or SAE feature decomposition, AOs do not expose their reasoning. You get an answer but not a mechanistic explanation of why.

**Narrow benchmarks**: The experiments use narrow fine-tunes that modify the model along a small number of behavioral dimensions. Realistic post-training pipelines induce richer changes.

**Potential for simpler solutions**: The authors note that for some tasks (like hallucination detection), simple prompting baselines perform comparably to activation-based methods.

## The dreaming vectors work

A LessWrong post by ceselder ("Dreaming Vectors: Gradient-descented steering vectors from Activation Oracles and using them to Red-Team AOs") provides a useful stress test of these oracles.

The idea: can we use gradient descent to find a vector that convinces the oracle some concept is present, then check whether that vector actually steers the model toward that concept? And more provocatively: can we find vectors that fool the oracle without causally steering the model?

The loss function for finding such vectors is:

$$L = \max(0, L_{\text{oracle}} - \tau) + \lambda_{\text{mag}} \cdot (\|v\|_2 - 1)^2$$

where $L_{\text{oracle}}$ is the negative log-likelihood of the oracle predicting the target label, $\tau$ is a margin threshold, and the magnitude penalty keeps the vector near unit norm.

For the "red-team" variant that tries to fool the oracle without affecting behavior:

$$L_{\text{redteam}} = \max(0, L_{\text{oracle}} - \tau) + \lambda_{\text{mse}} \cdot L_{\text{mse}} + \lambda_{\text{mag}} \cdot (\|v\|_2 - 1)^2$$

where $L_{\text{mse}}$ is the mean squared error between final layer activations when steered versus baseline on neutral prompts.

Results were mixed but interesting. For many concepts (sycophancy, gender, fascism, birds), gradient-descented vectors do steer the model toward the target behavior. But ceselder found at least one case (the "birds" concept) where the red-team approach reliably produced a vector with low MSE (1.5 versus 52 for the normal vector) that still fooled the oracle but did not steer behavior. When prompted to "Name 5 animals", the non-red-team vector produced all birds; the red-team vector produced "Dog, Cat, Elephant, Giraffe, Lion" despite the oracle being confident it represented birds.

The cosine similarity between gradient-descented vectors and CAA-derived vectors for the same concept was consistently low (less than 0.05 for most concepts). Both types of vectors satisfy the oracle. Both can steer the model. But they point in nearly orthogonal directions.

This suggests either that concept representation in these models admits multiple orthogonal encodings, or that the oracle is picking up on something other than the causal mechanism that governs behavior, or both. Either way, it is evidence that these oracles are not perfect truth-tellers about model internals.

## What does this mean?

The Activation Oracles paper represents progress on what might be called "bitter lesson interpretability": the idea that we should be training models to do the interpretation work rather than hand-crafting specialized tools. The results are genuinely surprising. That a fine-tuned LLM can extract secret words that the target model was explicitly trained never to reveal, and that it can do this without ever seeing activations from fine-tuned models during training, is a strong demonstration of generalization.

At the same time, the failure modes identified by the dreaming vectors work are concerning. If an adversary can find vectors that fool the oracle without affecting behavior, then the oracle is not a reliable ground truth for model auditing. The current state appears to be: AOs work better than existing interpretability tools on certain benchmarks, but they are not trustworthy enough to serve as a sole source of truth about what a model is "thinking".

The obvious next step is to improve the oracles. The paper notes that training data could be scaled further, that RL-based training might help, and that self-supervised objectives can generate unlimited data. The dreaming vectors work suggests that adversarial training against gradient-descented fooling vectors might improve robustness.
