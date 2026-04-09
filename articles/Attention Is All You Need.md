---
title: "Attention Is All You Need"
source: "https://arxiv.org/html/1706.03762v7"
author:
published:
created: 2026-04-09
description:
tags:
  - "articles"
---
Provided proper attribution is provided, Google hereby grants permission to reproduce the tables and figures in this paper solely for use in journalistic or scholarly works.

## Attention Is All You Need / 你只需要注意力机制

   Ashish Vaswani  
Google Brain  
avaswani@google.com  
&Noam Shazeer <sup>1</sup>  
Google Brain  
noam@google.com  
&Niki Parmar <sup>1</sup>  
Google Research  
nikip@google.com  
&Jakob Uszkoreit <sup>1</sup>  
Google Research  
usz@google.com  
&Llion Jones <sup>1</sup>  
Google Research  
llion@google.com  
&Aidan N. Gomez <sup>1</sup>     
University of Toronto  
aidan@cs.toronto.edu &Łukasz Kaiser <sup>1</sup>  
Google Brain  
lukaszkaiser@google.com  
&Illia Polosukhin <sup>1</sup>     
illia.polosukhin@gmail.com  
Equal contribution. Listing order is random. Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models and has been crucially involved in every aspect of this work. Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation and became the other person involved in nearly every detail. Niki designed, implemented, tuned and evaluated countless model variants in our original codebase and tensor2tensor. Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing various parts of and implementing tensor2tensor, replacing our earlier codebase, greatly improving results and massively accelerating our research. Work performed while at Google Brain. Work performed while at Google Research.

###### Abstract 摘要

The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.  
目前主流的序列转换模型基于复杂的循环神经网络或卷积神经网络，这些网络包含编码器和解码器。性能最佳的模型还通过注意力机制连接编码器和解码器。我们提出了一种新的简单网络架构——Transformer，它完全基于注意力机制，摒弃了循环和卷积。在两项机器翻译任务上的实验表明，我们的模型在质量上更胜一筹，同时更易于并行化，且训练时间显著缩短。我们的模型在 WMT 2014 英译德任务上取得了 28.4 的 BLEU 值，比现有最佳结果（包括集成模型）提高了 2 个 BLEU 以上。在 WMT 2014 英译法任务上，我们的模型在八个 GPU 上训练 3.5 天后，取得了 41.8 的 BLEU 值，创下了单模型最佳成绩的新纪录，而训练成本仅为文献中最佳模型的一小部分。我们通过成功地将 Transformer 应用于英语成分分析（无论训练数据量大小），证明 Transformer 可以很好地泛化到其他任务。

## 1 Introduction / 1 引言

Recurrent neural networks, long short-term memory [^13] and gated recurrent [^7] neural networks in particular, have been firmly established as state of the art approaches in sequence modeling and transduction problems such as language modeling and machine translation [^35] [^2] [^5]. Numerous efforts have since continued to push the boundaries of recurrent language models and encoder-decoder architectures [^38] [^24] [^15].  
循环神经网络，特别是长短期记忆 [^13] 和门控循环 [^7] 神经网络，已被确立为序列建模和转换问题（例如语言建模和机器翻译）中最先进的方法 [^35] [^2] [^5] 。此后，人们不断努力拓展循环语言模型和编码器-解码器架构的边界 [^38] [^24] [^15] 。

Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states $h_{t}$, as a function of the previous hidden state $h_{t-1}$ and the input for position $t$. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples. Recent work has achieved significant improvements in computational efficiency through factorization tricks [^21] and conditional computation [^32], while also improving model performance in case of the latter. The fundamental constraint of sequential computation, however, remains.  
循环模型通常沿着输入和输出序列的符号位置进行计算。通过将位置与计算时间步长对齐，它们生成一个隐藏状态序列 $h_{t}$ ，该序列是前一个隐藏状态 $h_{t-1}$ 和位置 $t$ 的输入的函数。这种固有的顺序性限制了训练样本间的并行化，这在序列长度较长时尤为重要，因为内存限制会阻碍跨样本的批处理。最近的研究通过分解技巧 [^21] 和条件计算 [^32] 显著提高了计算效率，并且在条件计算的情况下也提高了模型性能。然而，顺序计算的根本限制依然存在。

Attention mechanisms have become an integral part of compelling sequence modeling and transduction models in various tasks, allowing modeling of dependencies without regard to their distance in the input or output sequences [^2] [^19]. In all but a few cases [^27], however, such attention mechanisms are used in conjunction with a recurrent network.  
注意力机制已成为各种任务中引人注目的序列建模和转换模型的组成部分，允许对依赖关系进行建模，而无需考虑输入或输出序列中的距离 [^2] [^19] 。然而，除少数情况 [^27] 外，此类注意力机制通常与循环神经网络结合使用。

In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.  
本文提出了一种名为 Transformer 的模型架构，它摒弃了循环结构，完全依赖注意力机制来建立输入和输出之间的全局依赖关系。Transformer 模型能够显著提高并行化能力，并且只需在八块 P100 GPU 上训练 12 小时，即可达到翻译质量的新高度。

## 2 Background / 2 背景

The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU [^16], ByteNet [^18] and ConvS2S [^9], all of which use convolutional neural networks as basic building block, computing hidden representations in parallel for all input and output positions. In these models, the number of operations required to relate signals from two arbitrary input or output positions grows in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes it more difficult to learn dependencies between distant positions [^12]. In the Transformer this is reduced to a constant number of operations, albeit at the cost of reduced effective resolution due to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as described in section 3.2.  
减少顺序计算的目标也是扩展神经 GPU [^16] 、ByteNet [^18] 和 ConvS2S [^9] 的基础，它们都使用卷积神经网络作为基本构建模块，并行计算所有输入和输出位置的隐藏表示。在这些模型中，关联两个任意输入或输出位置的信号所需的运算次数会随着位置间距离的增加而增长，ConvS2S 呈线性增长，ByteNet 呈对数增长。这使得学习远距离位置之间的依赖关系变得更加困难 [^12] 。在 Transformer 中，运算次数减少到恒定值，但代价是由于对注意力加权位置进行平均而降低了有效分辨率，我们通过 3.2 节中描述的多头注意力机制来抵消这种影响。

Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Self-attention has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations [^4] [^27] [^28] [^22].  
自注意力，有时也称为序列内部注意力，是一种将单个序列的不同位置关联起来以计算序列表示的注意力机制。自注意力已成功应用于各种任务，包括阅读理解、抽象式摘要、文本蕴含和学习与任务无关的句子表示 [^4] [^27] [^28] [^22] 。

End-to-end memory networks are based on a recurrent attention mechanism instead of sequence-aligned recurrence and have been shown to perform well on simple-language question answering and language modeling tasks [^34].  
端到端记忆网络基于循环注意力机制而不是序列对齐的循环，并且已被证明在简单语言问答和语言建模任务中表现良好 [^34] 。

To the best of our knowledge, however, the Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. In the following sections, we will describe the Transformer, motivate self-attention and discuss its advantages over models such as [^17] [^18] and [^9].  
据我们所知，Transformer 是第一个完全依赖自注意力机制来计算输入输出表示，而无需使用序列对齐的循环神经网络或卷积的转换模型。在接下来的章节中，我们将描述 Transformer，阐述自注意力机制的动机，并讨论它相对于 [^17] [^18] 和 [^9] 等模型的优势。

## 3 Model Architecture / 3 模型架构

![[ModalNet-21.png|Refer to caption]]

Figure 1: The Transformer - model architecture. 图 1： Transformer 模型架构。

Most competitive neural sequence transduction models have an encoder-decoder structure [^5] [^2] [^35]. Here, the encoder maps an input sequence of symbol representations $(x_{1},...,x_{n})$ to a sequence of continuous representations $\mathbf{z}=(z_{1},...,z_{n})$. Given $\mathbf{z}$, the decoder then generates an output sequence $(y_{1},...,y_{m})$ of symbols one element at a time. At each step the model is auto-regressive [^10], consuming the previously generated symbols as additional input when generating the next.  
大多数具有竞争力的神经序列转换模型都采用编码器-解码器结构 [^5] [^2] [^35] 。其中，编码器将输入的符号表示序列 $(x_{1},...,x_{n})$ 映射到连续表示序列 $\mathbf{z}=(z_{1},...,z_{n})$ 。给定 $\mathbf{z}$ ，解码器随后逐个生成输出符号序列 $(y_{1},...,y_{m})$ 。在每个步骤中，模型都是自回归的 [^10] ，在生成下一个符号时，会将先前生成的符号作为额外的输入。

The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder, shown in the left and right halves of Figure 1, respectively.  
Transformer 遵循这种整体架构，编码器和解码器分别采用堆叠式自注意力层和逐点全连接层，如图 1 的左半部分和右半部分所示。

### 3.1 Encoder and Decoder Stacks / 3.1 编码器和解码器层堆叠

##### Encoder: 编码器：

The encoder is composed of a stack of $N=6$ identical layers. Each layer has two sub-layers. The first is a multi-head self-attention mechanism, and the second is a simple, position-wise fully connected feed-forward network. We employ a residual connection [^11] around each of the two sub-layers, followed by layer normalization [^1]. That is, the output of each sub-layer is $\mathrm{LayerNorm}(x+\mathrm{Sublayer}(x))$, where $\mathrm{Sublayer}(x)$ is the function implemented by the sub-layer itself. To facilitate these residual connections, all sub-layers in the model, as well as the embedding layers, produce outputs of dimension $d_{\text{model}}=512$.  
编码器由 $N=6$ 个相同的层堆叠而成。每一层包含两个子层。第一个子层是多头自注意力机制，第二个子层是一个简单的、按位置全连接的前馈网络。我们在每个子层周围都应用了残差连接 [^11] ，然后进行层归一化 [^1] 。也就是说，每个子层的输出为 $\mathrm{LayerNorm}(x+\mathrm{Sublayer}(x))$ ，其中 $\mathrm{Sublayer}(x)$ 是该子层自身实现的函数。为了便于这些残差连接，模型中的所有子层以及嵌入层都产生维度为 $d_{\text{model}}=512$ 的输出。

##### Decoder: 解码器：

The decoder is also composed of a stack of $N=6$ identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack. Similar to the encoder, we employ residual connections around each of the sub-layers, followed by layer normalization. We also modify the self-attention sub-layer in the decoder stack to prevent positions from attending to subsequent positions. This masking, combined with fact that the output embeddings are offset by one position, ensures that the predictions for position $i$ can depend only on the known outputs at positions less than $i$.  
解码器也由 $N=6$ 个相同的层堆叠而成。除了每个编码器层中的两个子层之外，解码器还插入了第三个子层，该子层对编码器堆叠的输出执行多头注意力机制。与编码器类似，我们在每个子层周围都使用了残差连接，然后进行层归一化。我们还修改了解码器堆叠中的自注意力子层，以防止位置关注后续位置。这种掩蔽机制，结合输出嵌入偏移一个位置的事实，确保了位置 $i$ 的预测只能依赖于位置 $i$ 之前的已知输出。

### 3.2 Attention / 3.2 注意力

An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.  
注意力函数可以描述为将查询和一组键值对映射到输出，其中查询、键、值和输出都是向量。输出计算为值的加权和，每个值的权重由查询与其对应键的兼容性函数计算得出。

#### 3.2.1 Scaled Dot-Product Attention / 3.2.1 缩放点积注意力

We call our particular attention "Scaled Dot-Product Attention" (Figure 2). The input consists of queries and keys of dimension $d_{k}$, and values of dimension $d_{v}$. We compute the dot products of the query with all keys, divide each by $\sqrt{d_{k}}$, and apply a softmax function to obtain the weights on the values.  
我们将这种特殊的注意力机制称为“缩放点积注意力”（图 2 ）。输入包含维度为 $d_{k}$ 的查询和键，以及维度为 $d_{v}$ 的值。我们计算查询与所有键的点积，将每个点积除以 $\sqrt{d_{k}}$ ，然后应用 softmax 函数来获得值的权重。

In practice, we compute the attention function on a set of queries simultaneously, packed together into a matrix $Q$. The keys and values are also packed together into matrices $K$ and $V$. We compute the matrix of outputs as:  
在实践中，我们同时对一组查询计算注意力函数，并将这些查询打包成矩阵 $Q$ 。键和值也分别打包成矩阵 $K$ 和 $V$ 。我们按如下方式计算输出矩阵：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}(\frac{QK^{T}}{\sqrt{d_{k}}})V
$$

The two most commonly used attention functions are additive attention [^2], and dot-product (multiplicative) attention. Dot-product attention is identical to our algorithm, except for the scaling factor of $\frac{1}{\sqrt{d_{k}}}$. Additive attention computes the compatibility function using a feed-forward network with a single hidden layer. While the two are similar in theoretical complexity, dot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.  
两种最常用的注意力函数是加性注意力 [^2] 和点积（乘法）注意力。点积注意力与我们的算法相同，只是缩放因子为 $\frac{1}{\sqrt{d_{k}}}$ 。加性注意力使用具有单个隐藏层的前馈网络来计算兼容性函数。虽然两者在理论上的复杂度相似，但点积注意力在实践中速度更快、空间效率更高，因为它可以使用高度优化的矩阵乘法代码来实现。

While for small values of $d_{k}$ the two mechanisms perform similarly, additive attention outperforms dot product attention without scaling for larger values of $d_{k}$ [^3]. We suspect that for large values of $d_{k}$, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients <sup>1</sup>. To counteract this effect, we scale the dot products by $\frac{1}{\sqrt{d_{k}}}$.  
为了抵消这种影响，我们将点积乘以 $\frac{1}{\sqrt{d_{k}}}$ 。

#### 3.2.2 Multi-Head Attention / 3.2.2 多头注意力

![[ModalNet-19.png|Refer to caption]]

Figure 2: (left) Scaled Dot-Product Attention. (right) Multi-Head Attention consists of several attention layers running in parallel. 图 2：（ 左）缩放点积注意力机制。（右）多头注意力机制由多个并行运行的注意力层组成。

Instead of performing a single attention function with $d_{\text{model}}$ -dimensional keys, values and queries, we found it beneficial to linearly project the queries, keys and values $h$ times with different, learned linear projections to $d_{k}$, $d_{k}$ and $d_{v}$ dimensions, respectively. On each of these projected versions of queries, keys and values we then perform the attention function in parallel, yielding $d_{v}$ -dimensional output values. These are concatenated and once again projected, resulting in the final values, as depicted in Figure 2.  
我们发现，与其对 $d_{\text{model}}$ 维的键、值和查询执行单一的注意力函数，不如将查询、键和值分别使用不同的、已学习的线性投影进行 $h$ 次线性投影，使其分别达到 $d_{k}$ 、 $d_{k}$ 和 $d_{v}$ 维，这样效果更好。然后，我们对每个投影后的查询、键和值并行执行注意力函数，得到 $d_{v}$ 维的输出值。将这些输出值连接起来并再次投影，得到最终值，如图 2 所示。

Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this.  
多头注意力机制允许模型同时关注来自不同表征子空间、位于不同位置的信息。而单头注意力机制则会通过平均来抑制这种能力。

$$
\displaystyle\mathrm{MultiHead}(Q,K,V)
$$
 
$$
\displaystyle=\mathrm{Concat}(\mathrm{head_{1}},...,\mathrm{head_{h}})W^{O}
$$
 
$$
\displaystyle\text{where}~\mathrm{head_{i}}
$$
 
$$
\displaystyle=\mathrm{Attention}(QW^{Q}_{i},KW^{K}_{i},VW^{V}_{i})
$$

Where the projections are parameter matrices $W^{Q}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{k}}$, $W^{K}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{k}}$, $W^{V}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{v}}$ and $W^{O}\in\mathbb{R}^{hd_{v}\times d_{\text{model}}}$.  
其中投影是参数矩阵 $W^{Q}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{k}}$ 、 $W^{K}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{k}}$ 、 $W^{V}_{i}\in\mathbb{R}^{d_{\text{model}}\times d_{v}}$ 和 $W^{O}\in\mathbb{R}^{hd_{v}\times d_{\text{model}}}$ 。

In this work we employ $h=8$ parallel attention layers, or heads. For each of these we use $d_{k}=d_{v}=d_{\text{model}}/h=64$. Due to the reduced dimension of each head, the total computational cost is similar to that of single-head attention with full dimensionality.  
本文采用 $h=8$ 个并行注意力层，或称注意力头。每个注意力头使用 $d_{k}=d_{v}=d_{\text{model}}/h=64$ 。由于每个注意力头的维度降低，总计算成本与全维度单头注意力机制相近。

#### 3.2.3 Applications of Attention in our Model / 3.2.3 注意力机制在模型中的应用

The Transformer uses multi-head attention in three different ways:  
Transformer 以三种不同的方式使用多头注意力：

- In "encoder-decoder attention" layers, the queries come from the previous decoder layer, and the memory keys and values come from the output of the encoder. This allows every position in the decoder to attend over all positions in the input sequence. This mimics the typical encoder-decoder attention mechanisms in sequence-to-sequence models such as [^38] [^2] [^9].
	  
	在“编码器-解码器注意力”层中，查询来自前一个解码器层，记忆键和值来自编码器的输出。这使得解码器中的每个位置都能关注输入序列中的所有位置。这模拟了序列到序列模型中典型的编码器-解码器注意力机制，例如 [^38] [^2] [^9] 。
- The encoder contains self-attention layers. In a self-attention layer all of the keys, values and queries come from the same place, in this case, the output of the previous layer in the encoder. Each position in the encoder can attend to all positions in the previous layer of the encoder.
	  
	编码器包含自注意力层。在自注意力层中，所有键、值和查询都来自同一位置，在本例中，即编码器前一层的输出。编码器中的每个位置都可以关注其前一层中的所有位置。
- Similarly, self-attention layers in the decoder allow each position in the decoder to attend to all positions in the decoder up to and including that position. We need to prevent leftward information flow in the decoder to preserve the auto-regressive property. We implement this inside of scaled dot-product attention by masking out (setting to $-\infty$) all values in the input of the softmax which correspond to illegal connections. See Figure 2.
	  
	类似地，解码器中的自注意力层允许解码器中的每个位置关注到该位置及其之前的所有位置。我们需要阻止解码器中信息向未来位置流动，以保持自回归特性。我们在缩放点积注意力机制中实现了这一点，方法是屏蔽（设置为 $-\infty$）softmax 输入中所有对应非法连接的值。参见图 2。

### 3.3 Position-wise Feed-Forward Networks / 3.3 逐位置前馈网络

In addition to attention sub-layers, each of the layers in our encoder and decoder contains a fully connected feed-forward network, which is applied to each position separately and identically. This consists of two linear transformations with a ReLU activation in between.  
除了注意力子层之外，我们的编码器和解码器中的每一层都包含一个全连接前馈网络，该网络分别且相同地应用于每个位置。它由两个线性变换组成，中间夹有 ReLU 激活函数。

$$
\mathrm{FFN}(x)=\max(0,xW_{1}+b_{1})W_{2}+b_{2}
$$

While the linear transformations are the same across different positions, they use different parameters from layer to layer. Another way of describing this is as two convolutions with kernel size 1. The dimensionality of input and output is $d_{\text{model}}=512$, and the inner-layer has dimensionality $d_{ff}=2048$.  
虽然不同位置的线性变换相同，但它们使用的参数却因层而异。另一种描述方式是将其视为两个卷积核大小为 1 的卷积。输入和输出的维度为 $d_{\text{model}}=512$ ，而内层的维度为 $d_{ff}=2048$ 。

### 3.4 Embeddings and Softmax / 3.4 嵌入与 Softmax

Similarly to other sequence transduction models, we use learned embeddings to convert the input tokens and output tokens to vectors of dimension $d_{\text{model}}$. We also use the usual learned linear transformation and softmax function to convert the decoder output to predicted next-token probabilities. In our model, we share the same weight matrix between the two embedding layers and the pre-softmax linear transformation, similar to [^30]. In the embedding layers, we multiply those weights by $\sqrt{d_{\text{model}}}$.  
与其他序列转换模型类似，我们使用学习到的词嵌入将输入词元和输出词元转换为维度为 $d_{\text{model}}$ 的向量。我们还使用常用的学习到的线性变换和 softmax 函数将解码器输出转换为预测的下一个词元概率。在我们的模型中，两个嵌入层和 softmax 前的线性变换共享同一个权重矩阵，类似于 [^30] 。在嵌入层中，我们将这些权重乘以 $\sqrt{d_{\text{model}}}$ 。

### 3.5 Positional Encoding / 3.5 位置编码

Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens in the sequence. To this end, we add "positional encodings" to the input embeddings at the bottoms of the encoder and decoder stacks. The positional encodings have the same dimension $d_{\text{model}}$ as the embeddings, so that the two can be summed. There are many choices of positional encodings, learned and fixed [^9].  
由于我们的模型不包含递归和卷积，为了使模型能够利用序列的顺序，我们必须注入一些关于序列中词元相对或绝对位置的信息。为此，我们在编码器和解码器堆栈的底部为输入嵌入添加了“位置编码”。位置编码与嵌入具有相同的维度 $d_{\text{model}}$ ，因此两者可以相加。位置编码有很多种选择，包括学习得到的和固定的 [^9] 。

In this work, we use sine and cosine functions of different frequencies:  
在这项工作中，我们使用了不同频率的正弦和余弦函数：

$$
\displaystyle PE_{(pos,2i)}=sin(pos/10000^{2i/d_{\text{model}}})
$$
 
$$
\displaystyle PE_{(pos,2i+1)}=cos(pos/10000^{2i/d_{\text{model}}})
$$

where $pos$ is the position and $i$ is the dimension. That is, each dimension of the positional encoding corresponds to a sinusoid. The wavelengths form a geometric progression from $2\pi$ to $10000\cdot 2\pi$. We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions, since for any fixed offset $k$, $PE_{pos+k}$ can be represented as a linear function of $PE_{pos}$.  
其中 $pos$ 代表位置， $i$ 代表维度。也就是说，位置编码的每个维度都对应一个正弦波。波长从 $2\pi$ 到 $10000\cdot 2\pi$ 呈等比数列。我们选择这个函数是因为我们假设它能让模型更容易地学习通过相对位置进行关注，因为对于任何固定的偏移量 $k$ ， $PE_{pos+k}$ 都可以表示为 $PE_{pos}$ 的线性函数。

We also experimented with using learned positional embeddings [^9] instead, and found that the two versions produced nearly identical results (see Table 3 row (E)). We chose the sinusoidal version because it may allow the model to extrapolate to sequence lengths longer than the ones encountered during training.  
我们还尝试使用学习到的位置嵌入 [^9] ，发现两种方法得到的结果几乎相同（见表 3 第(E)行）。我们选择正弦嵌入是因为它可以让模型外推到比训练过程中遇到的序列长度更长的序列。

## 4 Why Self-Attention / 4. 为什么选择自注意力

In this section we compare various aspects of self-attention layers to the recurrent and convolutional layers commonly used for mapping one variable-length sequence of symbol representations $(x_{1},...,x_{n})$ to another sequence of equal length $(z_{1},...,z_{n})$, with $x_{i},z_{i}\in\mathbb{R}^{d}$, such as a hidden layer in a typical sequence transduction encoder or decoder. Motivating our use of self-attention we consider three desiderata.  
在本节中，我们将自注意力层与通常用于将一个变长符号表示序列 $(x_{1},...,x_{n})$ 映射到另一个等长序列 $(z_{1},...,z_{n})$ 的循环层和卷积层进行比较，例如典型的序列转换编码器或解码器中的隐藏层。为了说明我们使用自注意力层的动机，我们考虑了以下三个理想条件。

One is the total computational complexity per layer. Another is the amount of computation that can be parallelized, as measured by the minimum number of sequential operations required.  
一是每层的总计算复杂度。二是可并行化的计算量，以所需的最少顺序操作次数来衡量。

The third is the path length between long-range dependencies in the network. Learning long-range dependencies is a key challenge in many sequence transduction tasks. One key factor affecting the ability to learn such dependencies is the length of the paths forward and backward signals have to traverse in the network. The shorter these paths between any combination of positions in the input and output sequences, the easier it is to learn long-range dependencies [^12]. Hence we also compare the maximum path length between any two input and output positions in networks composed of the different layer types.  
第三个指标是网络中长程依赖关系之间的路径长度。学习长程依赖关系是许多序列转换任务的关键挑战。影响学习此类依赖关系能力的一个关键因素是前向和后向信号在网络中必须经过的路径长度。输入和输出序列中任意位置组合之间的路径越短，就越容易学习长程依赖关系 [^12] 。因此，我们也比较了由不同层类型组成的网络中任意两个输入和输出位置之间的最大路径长度。

Table 1: Maximum path lengths, per-layer complexity and minimum number of sequential operations for different layer types. $n$ is the sequence length, $d$ is the representation dimension, $k$ is the kernel size of convolutions and $r$ the size of the neighborhood in restricted self-attention.  
表 1： 不同层类型的最大路径长度、每层复杂度和最小序列操作次数。 $n$ 为序列长度， $d$ 为表示维度， $k$ 为卷积核大小， $r$ 为受限自注意力机制中邻域的大小。

| Layer Type 层类型 | Complexity per Layer 每层复杂度 | Sequential Operations 顺序操作数 | Maximum Path Length 最大路径长度 |
| --- | --- | --- | --- |
| Self-Attention 自注意力 | $O(n^{2}\cdot d)$ | $O(1)$ | $O(1)$ |
| Recurrent 循环层 | $O(n\cdot d^{2})$ | $O(n)$ | $O(n)$ |
| Convolutional 卷积 | $O(k\cdot n\cdot d^{2})$ | $O(1)$ | $O(log_{k}(n))$ |
| Self-Attention (restricted) 受限自注意力 | $O(r\cdot n\cdot d)$ | $O(1)$ | $O(n/r)$ |

As noted in Table 1, a self-attention layer connects all positions with a constant number of sequentially executed operations, whereas a recurrent layer requires $O(n)$ sequential operations. In terms of computational complexity, self-attention layers are faster than recurrent layers when the sequence length $n$ is smaller than the representation dimensionality $d$, which is most often the case with sentence representations used by state-of-the-art models in machine translations, such as word-piece [^38] and byte-pair [^31] representations. To improve computational performance for tasks involving very long sequences, self-attention could be restricted to considering only a neighborhood of size $r$ in the input sequence centered around the respective output position. This would increase the maximum path length to $O(n/r)$. We plan to investigate this approach further in future work.  
如表 1 所示，自注意力层通过固定数量的顺序执行操作连接所有位置，而循环层则需要 $O(n)$ 次顺序操作。就计算复杂度而言，当序列长度 $n$ 小于表示维度 $d$ 时，自注意力层比循环层更快。这种情况在机器翻译中最先进的模型所使用的句子表示中最为常见，例如词段表示 [^38] 和字节对表示 [^31] 。为了提高处理超长序列任务的计算性能，可以将自注意力限制在输入序列中以相应输出位置为中心、大小为 $r$ 的邻域内。这将使最大路径长度增加到 $O(n/r)$ 。我们计划在未来的工作中进一步研究这种方法。

A single convolutional layer with kernel width $k<n$ does not connect all pairs of input and output positions. Doing so requires a stack of $O(n/k)$ convolutional layers in the case of contiguous kernels, or $O(log_{k}(n))$ in the case of dilated convolutions [^18], increasing the length of the longest paths between any two positions in the network. Convolutional layers are generally more expensive than recurrent layers, by a factor of $k$. Separable convolutions [^6], however, decrease the complexity considerably, to $O(k\cdot n\cdot d+n\cdot d^{2})$. Even with $k=n$, however, the complexity of a separable convolution is equal to the combination of a self-attention layer and a point-wise feed-forward layer, the approach we take in our model.  
单个卷积层，其卷积核宽度为 $k<n$ ，并不能连接所有输入和输出位置对。要实现这一点，对于连续卷积核，需要堆叠 $O(n/k)$ 个卷积层；对于空洞卷积 [^18] ，则需要堆叠 $O(log_{k}(n))$ 个卷积层，这会增加网络中任意两个位置之间最长路径的长度。卷积层的复杂度通常比循环层高 $k$ 倍。然而，可分离卷积 [^6] 可以显著降低复杂度至 $O(k\cdot n\cdot d+n\cdot d^{2})$ 倍。即使复杂度为 $k=n$ 倍，可分离卷积的复杂度也等于一个自注意力层和一个逐点前馈层的组合，这正是我们在模型中采用的方法。

As side benefit, self-attention could yield more interpretable models. We inspect attention distributions from our models and present and discuss examples in the appendix. Not only do individual attention heads clearly learn to perform different tasks, many appear to exhibit behavior related to the syntactic and semantic structure of the sentences.  
此外，自注意力机制还能产生更易于解释的模型。我们在附录中考察了模型的注意力分布，并展示和讨论了相关示例。结果表明，各个注意力头不仅能够清晰地学习执行不同的任务，而且许多注意力头似乎还表现出与句子句法和语义结构相关的行为。

## 5 Training5. 训练

This section describes the training regime for our models.  
本节介绍我们模型的训练方案。

### 5.1 Training Data and Batching / 5.1 训练数据与批处理

We trained on the standard WMT 2014 English-German dataset consisting of about 4.5 million sentence pairs. Sentences were encoded using byte-pair encoding [^3], which has a shared source-target vocabulary of about 37000 tokens. For English-French, we used the significantly larger WMT 2014 English-French dataset consisting of 36M sentences and split tokens into a 32000 word-piece vocabulary [^38]. Sentence pairs were batched together by approximate sequence length. Each training batch contained a set of sentence pairs containing approximately 25000 source tokens and 25000 target tokens.  
我们使用包含约 450 万个句子对的标准 WMT 2014 英德数据集进行训练。句子采用字节对编码 [^3] 进行编码，其共享的源语-目标语词汇表包含约 37000 个词元。对于英法双语，我们使用了规模更大的 WMT 2014 英法数据集，该数据集包含 3600 万个句子，并将词元拆分为 32000 个词段的词汇表 [^38] 。句子对按大致序列长度进行批次处理。每个训练批次包含一组句子对，每组句子对包含约 25000 个源语词元和 25000 个目标语词元。

### 5.2 Hardware and Schedule / 5.2 硬件与训练计划

We trained our models on one machine with 8 NVIDIA P100 GPUs. For our base models using the hyperparameters described throughout the paper, each training step took about 0.4 seconds. We trained the base models for a total of 100,000 steps or 12 hours. For our big models,(described on the bottom line of table 3), step time was 1.0 seconds. The big models were trained for 300,000 steps (3.5 days).  
我们在一台配备 8 个 NVIDIA P100 GPU 的机器上训练了模型。对于本文所述的超参数基础模型，每个训练步骤耗时约 0.4 秒。基础模型总共训练了 10 万步，耗时 12 小时。对于大型模型（详见表 3 底部），每步耗时 1.0 秒。大型模型训练了 30 万步（3.5 天）。

### 5.3 Optimizer / 5.3 优化器

We used the Adam optimizer [^20] with $\beta_{1}=0.9$, $\beta_{2}=0.98$ and $\epsilon=10^{-9}$. We varied the learning rate over the course of training, according to the formula:  
我们使用 Adam 优化器 [^20]，参数分别为 $\beta_{1}=0.9$、$\beta_{2}=0.98$ 和 $\epsilon=10^{-9}$。在训练过程中，我们根据以下公式调整学习率：

$$
lrate=d_{\text{model}}^{-0.5}\cdot\min({step\_num}^{-0.5},{step\_num}\cdot{warmup\_steps}^{-1.5})
$$

This corresponds to increasing the learning rate linearly for the first $warmup\_steps$ training steps, and decreasing it thereafter proportionally to the inverse square root of the step number. We used $warmup\_steps=4000$.  
这相当于在前 $warmup\_steps$ 个训练步骤中线性增加学习率，之后按步骤数的平方根倒数比例减小学习率。我们使用了 $warmup\_steps=4000$ 。

### 5.4 Regularization / 5.4 正则化

We employ three types of regularization during training:  
我们在训练过程中采用了三种类型的正则化方法：

##### Residual Dropout 残差 Dropout

We apply dropout [^33] to the output of each sub-layer, before it is added to the sub-layer input and normalized. In addition, we apply dropout to the sums of the embeddings and the positional encodings in both the encoder and decoder stacks. For the base model, we use a rate of $P_{drop}=0.1$.  
我们先对每个子层的输出应用 dropout [^33] ，然后再将其添加到子层输入并进行归一化。此外，我们还对编码器和解码器堆栈中的嵌入和位置编码之和应用 dropout。对于基础模型，我们使用的 dropout 率为 $P_{drop}=0.1$ 。

##### Label Smoothing 标签平滑

During training, we employed label smoothing of value $\epsilon_{ls}=0.1$ [^36]. This hurts perplexity, as the model learns to be more unsure, but improves accuracy and BLEU score.  
在训练过程中，我们采用了标签平滑，值为 $\epsilon_{ls}=0.1$ [^36] 。这虽然会降低困惑度，因为模型会学习到更多的不确定性，但会提高准确率和 BLEU 分数。

## 6 Results / 6 结果

### 6.1 Machine Translation6.1 机器翻译

Table 2: The Transformer achieves better BLEU scores than previous state-of-the-art models on the English-to-German and English-to-French newstest2014 tests at a fraction of the training cost.  
表 2： 在英语到德语和英语到法语 newstest2014 测试中，Transformer 的 BLEU 分数比以前最先进的模型要好，而训练成本却低得多。

<table><tbody><tr><th rowspan="2">Model / 模型</th><td colspan="2">BLEU</td><td></td><td colspan="2">Training Cost (FLOPs) / 训练成本（FLOPs）</td></tr><tr><td>EN-DE</td><td>EN-FR</td><td></td><td>EN-DE</td><td>EN-FR</td></tr><tr><th>ByteNet <sup><a href="#fn:18">18</a></sup></th><td>23.75</td><td></td><td></td><td></td><td></td></tr><tr><th>Deep-Att + PosUnk <sup><a href="#fn:39">39</a></sup></th><td></td><td>39.2</td><td></td><td></td><td><math><semantics><mrow><mn>1.0</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>1.0\cdot 10^{20}</annotation></semantics></math></td></tr><tr><th>GNMT + RL <sup><a href="#fn:38">38</a></sup></th><td>24.6</td><td>39.92</td><td></td><td><math><semantics><mrow><mn>2.3</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>19</mn></msup></mrow> <annotation>2.3\cdot 10^{19}</annotation></semantics></math></td><td><math><semantics><mrow><mn>1.4</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>1.4\cdot 10^{20}</annotation></semantics></math></td></tr><tr><th>ConvS2S <sup><a href="#fn:9">9</a></sup></th><td>25.16</td><td>40.46</td><td></td><td><math><semantics><mrow><mn>9.6</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>18</mn></msup></mrow> <annotation>9.6\cdot 10^{18}</annotation></semantics></math></td><td><math><semantics><mrow><mn>1.5</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>1.5\cdot 10^{20}</annotation></semantics></math></td></tr><tr><th>MoE <sup><a href="#fn:32">32</a></sup></th><td>26.03</td><td>40.56</td><td></td><td><math><semantics><mrow><mn>2.0</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>19</mn></msup></mrow> <annotation>2.0\cdot 10^{19}</annotation></semantics></math></td><td><math><semantics><mrow><mn>1.2</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>1.2\cdot 10^{20}</annotation></semantics></math></td></tr><tr><th>Deep-Att + PosUnk Ensemble <sup><a href="#fn:39">39</a></sup></th><td></td><td>40.4</td><td></td><td></td><td><math><semantics><mrow><mn>8.0</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>8.0\cdot 10^{20}</annotation></semantics></math></td></tr><tr><th>GNMT + RL Ensemble <sup><a href="#fn:38">38</a></sup></th><td>26.30</td><td>41.16</td><td></td><td><math><semantics><mrow><mn>1.8</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>20</mn></msup></mrow> <annotation>1.8\cdot 10^{20}</annotation></semantics></math></td><td><math><semantics><mrow><mn>1.1</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>21</mn></msup></mrow> <annotation>1.1\cdot 10^{21}</annotation></semantics></math></td></tr><tr><th>ConvS2S Ensemble <sup><a href="#fn:9">9</a></sup></th><td>26.36</td><td>41.29</td><td></td><td><math><semantics><mrow><mn>7.7</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>19</mn></msup></mrow> <annotation>7.7\cdot 10^{19}</annotation></semantics></math></td><td><math><semantics><mrow><mn>1.2</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>21</mn></msup></mrow> <annotation>1.2\cdot 10^{21}</annotation></semantics></math></td></tr><tr><th>Transformer (base model) / Transformer（基础模型）</th><td>27.3</td><td>38.1</td><td></td><td colspan="2"><math><semantics><mrow><mn>3.3</mn> <mo>⋅</mo> <msup><mn>𝟏𝟎</mn> <mn>𝟏𝟖</mn></msup></mrow> <annotation>3.3\cdot 10^{18}</annotation></semantics></math></td></tr><tr><th>Transformer (big) / Transformer（大模型）</th><td>28.4</td><td>41.8</td><td></td><td colspan="2"><math><semantics><mrow><mn>2.3</mn> <mo>⋅</mo> <msup><mn>10</mn> <mn>19</mn></msup></mrow> <annotation>2.3\cdot 10^{19}</annotation></semantics></math></td></tr></tbody></table>

On the WMT 2014 English-to-German translation task, the big transformer model (Transformer (big) in Table 2) outperforms the best previously reported models (including ensembles) by more than $2.0$ BLEU, establishing a new state-of-the-art BLEU score of $28.4$. The configuration of this model is listed in the bottom line of Table 3. Training took $3.5$ days on $8$ P100 GPUs. Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models.  
在 WMT 2014 英德翻译任务中，大型 Transformer 模型（表 2 中的 Transformer (big)）比此前报道的最佳模型（包括集成模型）高出 2.0 BLEU 以上，取得了 28.4 的最新最佳 BLEU 分数。该模型的配置列于表 3 的最后一行。训练使用 8 个 P100 GPU，耗时 3.5 天。即使是基础模型，也以远低于竞争模型的训练成本超越了此前所有已发表模型和集成结果。

On the WMT 2014 English-to-French translation task, our big model achieves a BLEU score of $41.0$, outperforming all of the previously published single models, at less than $1/4$ the training cost of the previous state-of-the-art model. The Transformer (big) model trained for English-to-French used dropout rate $P_{drop}=0.1$, instead of $0.3$.  
在 WMT 2014 英法翻译任务上，我们的大型模型取得了 41.0 的 BLEU 分数，优于此前所有已发表的单模型，且训练成本不到之前最先进模型的四分之一。用于英法任务的 Transformer（大模型）使用了 $P_{drop}=0.1$ 的 dropout 率，而不是 $0.3$。

For the base models, we used a single model obtained by averaging the last 5 checkpoints, which were written at 10-minute intervals. For the big models, we averaged the last 20 checkpoints. We used beam search with a beam size of $4$ and length penalty $\alpha=0.6$ [^38]. These hyperparameters were chosen after experimentation on the development set. We set the maximum output length during inference to input length + $50$, but terminate early when possible [^38].  
对于基础模型，我们使用了一个由最后 5 个检查点平均得到的单一模型，这些检查点以 10 分钟为间隔写入。对于大型模型，我们取最后 20 个检查点的平均值。我们使用束搜索，束大小为 $4$ ，长度惩罚为 $\alpha=0.6$ [^38] 。这些超参数是在开发集上进行实验后选择的。我们将推理期间的最大输出长度设置为输入长度 + $50$ ，但尽可能提前终止 [^38] 。

Table 2 summarizes our results and compares our translation quality and training costs to other model architectures from the literature. We estimate the number of floating point operations used to train a model by multiplying the training time, the number of GPUs used, and an estimate of the sustained single-precision floating-point capacity of each GPU <sup>2</sup>  
表 2 总结了我们的结果，并将翻译质量和训练成本与文献中的其他模型架构进行了比较。我们通过将训练时间、使用的 GPU 数量以及每个 GPU 的持续单精度浮点运算能力估计值相乘，来估算训练模型所需的浮点运算次数<sup>2</sup>。

### 6.2 Model Variations6.2 模型变体

Table 3: Variations on the Transformer architecture. Unlisted values are identical to those of the base model. All metrics are on the English-to-German translation development set, newstest2013. Listed perplexities are per-wordpiece, according to our byte-pair encoding, and should not be compared to per-word perplexities.  
表 3： Transformer 架构的变体。未列出的值与基础模型相同。所有指标均基于英德翻译开发数据集 newstest2013。所列困惑度为基于字节对编码的词段困惑度，不应与基于单词的困惑度进行比较。

<table><tbody><tr><td></td><td rowspan="2"><math><semantics><mi>N</mi> <annotation>N</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>d</mi> <mtext>model</mtext></msub> <annotation>d_{\text{model}}</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>d</mi> <mtext>ff</mtext></msub> <annotation>d_{\text{ff}}</annotation></semantics></math></td><td rowspan="2"><math><semantics><mi>h</mi> <annotation>h</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>d</mi> <mi>k</mi></msub> <annotation>d_{k}</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>d</mi> <mi>v</mi></msub> <annotation>d_{v}</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>P</mi> <mrow><mi>d</mi> <mo></mo><mi>r</mi> <mo></mo><mi>o</mi> <mo></mo><mi>p</mi></mrow></msub> <annotation>P_{drop}</annotation></semantics></math></td><td rowspan="2"><math><semantics><msub><mi>ϵ</mi> <mrow><mi>l</mi> <mo></mo><mi>s</mi></mrow></msub> <annotation>\epsilon_{ls}</annotation></semantics></math></td><td>train / 训练步数</td><td>PPL</td><td>BLEU</td><td>params / 参数</td></tr><tr><td></td><td>steps</td><td>(dev)</td><td>(dev)</td><td><math><semantics><mrow><mo>×</mo> <msup><mn>10</mn> <mn>6</mn></msup></mrow> <annotation>\times 10^{6}</annotation></semantics></math></td></tr><tr><td>base / 基础模型</td><td>6</td><td>512</td><td>2048</td><td>8</td><td>64</td><td>64</td><td>0.1</td><td>0.1</td><td>100K</td><td>4.92</td><td>25.8</td><td>65</td></tr><tr><td rowspan="4">(A)</td><td></td><td></td><td></td><td>1</td><td>512</td><td>512</td><td></td><td></td><td></td><td>5.29</td><td>24.9</td><td></td></tr><tr><td></td><td></td><td></td><td>4</td><td>128</td><td>128</td><td></td><td></td><td></td><td>5.00</td><td>25.5</td><td></td></tr><tr><td></td><td></td><td></td><td>16</td><td>32</td><td>32</td><td></td><td></td><td></td><td>4.91</td><td>25.8</td><td></td></tr><tr><td></td><td></td><td></td><td>32</td><td>16</td><td>16</td><td></td><td></td><td></td><td>5.01</td><td>25.4</td><td></td></tr><tr><td rowspan="2">(B)</td><td></td><td></td><td></td><td></td><td>16</td><td></td><td></td><td></td><td></td><td>5.16</td><td>25.1</td><td>58</td></tr><tr><td></td><td></td><td></td><td></td><td>32</td><td></td><td></td><td></td><td></td><td>5.01</td><td>25.4</td><td>60</td></tr><tr><td rowspan="7">(C)</td><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>6.11</td><td>23.7</td><td>36</td></tr><tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>5.19</td><td>25.3</td><td>50</td></tr><tr><td>8</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>4.88</td><td>25.5</td><td>80</td></tr><tr><td></td><td>256</td><td></td><td></td><td>32</td><td>32</td><td></td><td></td><td></td><td>5.75</td><td>24.5</td><td>28</td></tr><tr><td></td><td>1024</td><td></td><td></td><td>128</td><td>128</td><td></td><td></td><td></td><td>4.66</td><td>26.0</td><td>168</td></tr><tr><td></td><td></td><td>1024</td><td></td><td></td><td></td><td></td><td></td><td></td><td>5.12</td><td>25.4</td><td>53</td></tr><tr><td></td><td></td><td>4096</td><td></td><td></td><td></td><td></td><td></td><td></td><td>4.75</td><td>26.2</td><td>90</td></tr><tr><td rowspan="4">(D)</td><td></td><td></td><td></td><td></td><td></td><td></td><td>0.0</td><td></td><td></td><td>5.77</td><td>24.6</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td>0.2</td><td></td><td></td><td>4.95</td><td>25.5</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>0.0</td><td></td><td>4.67</td><td>25.3</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>0.2</td><td></td><td>5.47</td><td>25.7</td><td></td></tr><tr><td>(E)</td><td></td><td colspan="7">positional embedding instead of sinusoids / 用可学习的位置嵌入替代正弦编码</td><td></td><td>4.92</td><td>25.7</td><td></td></tr><tr><td>big / 大模型</td><td>6</td><td>1024</td><td>4096</td><td>16</td><td></td><td></td><td>0.3</td><td></td><td>300K</td><td>4.33</td><td>26.4</td><td>213</td></tr></tbody></table>

To evaluate the importance of different components of the Transformer, we varied our base model in different ways, measuring the change in performance on English-to-German translation on the development set, newstest2013. We used beam search as described in the previous section, but no checkpoint averaging. We present these results in Table 3.  
为了评估 Transformer 模型中各个组件的重要性，我们对基础模型进行了不同的调整，并测量了其在开发集 newstest2013 上英德翻译性能的变化。我们使用了上一节所述的束搜索算法，但没有使用检查点平均。结果如表 3 所示。

In Table 3 rows (A), we vary the number of attention heads and the attention key and value dimensions, keeping the amount of computation constant, as described in Section 3.2.2. While single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads.  
在表 3 的 (A)行中，我们改变了注意力头的数量以及注意力键和值的维度，同时保持计算量不变，如 3.2.2 节所述。虽然单头注意力比最佳设置差 0.9 个 BLEU 值，但注意力头过多也会导致质量下降。

In Table 3 rows (B), we observe that reducing the attention key size $d_{k}$ hurts model quality. This suggests that determining compatibility is not easy and that a more sophisticated compatibility function than dot product may be beneficial. We further observe in rows (C) and (D) that, as expected, bigger models are better, and dropout is very helpful in avoiding over-fitting. In row (E) we replace our sinusoidal positional encoding with learned positional embeddings [^9], and observe nearly identical results to the base model.  
在表 3 的 (B)行中，我们观察到减小注意力键大小 $d_{k}$ 会降低模型质量。这表明确定兼容性并非易事，使用比点积更复杂的兼容性函数可能更有益。我们进一步在(C)和(D)行中观察到，正如预期的那样，更大的模型效果更好，并且 dropout 对于避免过拟合非常有帮助。在(E)行中，我们将正弦位置编码替换为学习到的位置嵌入 [^9] ，并观察到与基础模型几乎相同的结果。

### 6.3 English Constituency Parsing6.3 英语成分分析

Table 4: The Transformer generalizes well to English constituency parsing (Results are on Section 23 of WSJ)  
表 4： Transformer 模型能够很好地推广到英语成分分析（结果见《华尔街日报》第 23 节）

| Parser 解析器 | Training 训练 | WSJ 23 F1 华尔街日报 23 F1 |
| --- | --- | --- |
| Vinyals & Kaiser et al. (2014) [^37] / Vinyals 和 Kaiser 等人（2014） | WSJ only, discriminative / 仅使用 WSJ，判别式 | 88.3 |
| Petrov et al. (2006) [^29] / Petrov 等人（2006） | WSJ only, discriminative / 仅使用 WSJ，判别式 | 90.4 |
| Zhu et al. (2013) [^40] / Zhu 等人（2013） | WSJ only, discriminative / 仅使用 WSJ，判别式 | 90.4 |
| Dyer et al. (2016) [^8] / Dyer 等人（2016） | WSJ only, discriminative / 仅使用 WSJ，判别式 | 91.7 |
| Transformer (4 layers) / Transformer（4 层） | WSJ only, discriminative / 仅使用 WSJ，判别式 | 91.3 |
| Zhu et al. (2013) [^40]   Zhu 等人 (2013) [^40] | semi-supervised 半监督 | 91.3 |
| Huang & Harper (2009) [^14]   Huang & Harper (2009) [^14] | semi-supervised 半监督 | 91.3 |
| McClosky et al. (2006) [^26]   McClosky 等人 (2006) [^26] | semi-supervised 半监督 | 92.1 |
| Vinyals & Kaiser et al. (2014) [^37] / Vinyals 和 Kaiser 等人（2014） | semi-supervised / 半监督 | 92.1 |
| Transformer (4 layers) / Transformer（4 层） | semi-supervised / 半监督 | 92.7 |
| Luong et al. (2015) [^23]   Luong 等人 (2015) [^23] | multi-task 多任务处理 | 93.0 |
| Dyer et al. (2016) [^8]   Dyer 等人 (2016) [^8] | generative 生成式 | 93.3 |

To evaluate if the Transformer can generalize to other tasks we performed experiments on English constituency parsing. This task presents specific challenges: the output is subject to strong structural constraints and is significantly longer than the input. Furthermore, RNN sequence-to-sequence models have not been able to attain state-of-the-art results in small-data regimes [^37].  
为了评估 Transformer 能否泛化到其他任务，我们对英语成分句法分析进行了实验。这项任务具有特殊的挑战性：输出受到严格的结构约束，并且比输入长得多。此外，RNN 序列到序列模型在小数据量的情况下尚未取得最先进的结果 [^37] 。

We trained a 4-layer transformer with $d_{model}=1024$ on the Wall Street Journal (WSJ) portion of the Penn Treebank [^25], about 40K training sentences. We also trained it in a semi-supervised setting, using the larger high-confidence and BerkleyParser corpora from with approximately 17M sentences [^37]. We used a vocabulary of 16K tokens for the WSJ only setting and a vocabulary of 32K tokens for the semi-supervised setting.  
我们在 Penn Treebank [^25] 的《华尔街日报》（WSJ）部分上训练了一个 4 层 Transformer 模型，约有 4 万个训练句，模型维度为 $d_{model}=1024$。我们还在半监督设置下进行了训练，使用了更大的高置信度语料和 BerkeleyParser 语料，总计约 1700 万个句子 [^37]。对于仅使用 WSJ 的设置，我们采用了 1.6 万词元词汇表；对于半监督设置，我们采用了 3.2 万词元词汇表。

We performed only a small number of experiments to select the dropout, both attention and residual (section 5.4), learning rates and beam size on the Section 22 development set, all other parameters remained unchanged from the English-to-German base translation model. During inference, we increased the maximum output length to input length + $300$. We used a beam size of $21$ and $\alpha=0.3$ for both WSJ only and the semi-supervised setting.  
我们仅进行了少量实验，以在第 22 节的开发集上选择 dropout、注意力机制和残差（第 5.4 节）、学习率和束大小，所有其他参数均与英德基础翻译模型保持一致。在推理过程中，我们将最大输出长度增加到输入长度 + $300$ 。对于仅使用 WSJ 数据集和半监督设置，我们都使用了束大小为 $21$ 和 $\alpha=0.3$ 的情况。

Our results in Table 4 show that despite the lack of task-specific tuning our model performs surprisingly well, yielding better results than all previously reported models with the exception of the Recurrent Neural Network Grammar [^8].  
表 4 中的结果表明，尽管缺乏针对特定任务的调整，但我们的模型表现得出奇地好，其结果优于所有先前报道的模型，但循环神经网络语法 [^8] 除外。

In contrast to RNN sequence-to-sequence models [^37], the Transformer outperforms the BerkeleyParser [^29] even when training only on the WSJ training set of 40K sentences.  
与 RNN 序列到序列模型 [^37] 相比，即使仅在 WSJ 40K 个句子的训练集上进行训练，Transformer 的性能也优于 BerkeleyParser [^29] 。

## 7 Conclusion7 结论

In this work, we presented the Transformer, the first sequence transduction model based entirely on attention, replacing the recurrent layers most commonly used in encoder-decoder architectures with multi-headed self-attention.  
在这项工作中，我们提出了 Transformer，这是第一个完全基于注意力的序列转换模型，它用多头自注意力取代了编码器-解码器架构中最常用的循环层。

For translation tasks, the Transformer can be trained significantly faster than architectures based on recurrent or convolutional layers. On both WMT 2014 English-to-German and WMT 2014 English-to-French translation tasks, we achieve a new state of the art. In the former task our best model outperforms even all previously reported ensembles.  
对于翻译任务，Transformer 的训练速度明显快于基于循环层或卷积层的架构。在 WMT 2014 英德翻译任务和 WMT 2014 英法翻译任务上，我们均取得了新的最佳结果。在英德翻译任务中，我们的最佳模型甚至优于所有先前报道的集成模型。

We are excited about the future of attention-based models and plan to apply them to other tasks. We plan to extend the Transformer to problems involving input and output modalities other than text and to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video. Making generation less sequential is another research goals of ours.  
我们对基于注意力机制的模型的未来充满期待，并计划将其应用于其他任务。我们计划将 Transformer 模型扩展到除文本以外的其他输入输出模态问题，并研究局部、受限的注意力机制，以高效处理图像、音频和视频等大型输入输出。减少数据生成过程中的序列性也是我们的研究目标之一。

The code we used to train and evaluate our models is available at [https://github.com/tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor).  
我们用于训练和评估模型的代码可在 [https://github.com/tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor) 获取。

##### Acknowledgements 致谢

We are grateful to Nal Kalchbrenner and Stephan Gouws for their fruitful comments, corrections and inspiration.  
我们衷心感谢 Nal Kalchbrenner 和 Stephan Gouws 提出的宝贵意见、更正和启发。

## References

## Attention Visualizations

![[x1.png|Refer to caption]]

Figure 3: An example of the attention mechanism following long-distance dependencies in the encoder self-attention in layer 5 of 6. Many of the attention heads attend to a distant dependency of the verb ‘making’, completing the phrase ‘making…more difficult’. Attentions here shown only for the word ‘making’. Different colors represent different heads. Best viewed in color.

![[x2.png|Refer to caption]]

Figure 4: Two attention heads, also in layer 5 of 6, apparently involved in anaphora resolution. Top: Full attentions for head 5. Bottom: Isolated attentions from just the word ‘its’ for attention heads 5 and 6. Note that the attentions are very sharp for this word.

![[x4.png|Refer to caption]]

Figure 5: Many of the attention heads exhibit behaviour that seems related to the structure of the sentence. We give two such examples above, from two different heads from the encoder self-attention at layer 5 of 6. The heads clearly learned to perform different tasks.

[^1]: Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E Hinton. Layer normalization. arXiv preprint arXiv:1607.06450, 2016.

[^2]: Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural machine translation by jointly learning to align and translate. CoRR, abs/1409.0473, 2014.

[^3]: Denny Britz, Anna Goldie, Minh-Thang Luong, and Quoc V. Le. Massive exploration of neural machine translation architectures. CoRR, abs/1703.03906, 2017.

[^4]: Jianpeng Cheng, Li Dong, and Mirella Lapata. Long short-term memory-networks for machine reading. arXiv preprint arXiv:1601.06733, 2016.

[^5]: Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Fethi Bougares, Holger Schwenk, and Yoshua Bengio. Learning phrase representations using rnn encoder-decoder for statistical machine translation. CoRR, abs/1406.1078, 2014.

[^6]: Francois Chollet. Xception: Deep learning with depthwise separable convolutions. arXiv preprint arXiv:1610.02357, 2016.

[^7]: Junyoung Chung, Çaglar Gülçehre, Kyunghyun Cho, and Yoshua Bengio. Empirical evaluation of gated recurrent neural networks on sequence modeling. CoRR, abs/1412.3555, 2014.

[^8]: Chris Dyer, Adhiguna Kuncoro, Miguel Ballesteros, and Noah A. Smith. Recurrent neural network grammars. In Proc. of NAACL, 2016.

[^9]: Jonas Gehring, Michael Auli, David Grangier, Denis Yarats, and Yann N. Dauphin. Convolutional sequence to sequence learning. arXiv preprint arXiv:1705.03122v2, 2017.

[^10]: Alex Graves. Generating sequences with recurrent neural networks. arXiv preprint arXiv:1308.0850, 2013.

[^11]: Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. Deep residual learning for image recognition. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 770–778, 2016.

[^12]: Sepp Hochreiter, Yoshua Bengio, Paolo Frasconi, and Jürgen Schmidhuber. Gradient flow in recurrent nets: the difficulty of learning long-term dependencies, 2001.

[^13]: Sepp Hochreiter and Jürgen Schmidhuber. Long short-term memory. Neural computation, 9(8):1735–1780, 1997.

[^14]: Zhongqiang Huang and Mary Harper. Self-training PCFG grammars with latent annotations across languages. In Proceedings of the 2009 Conference on Empirical Methods in Natural Language Processing, pages 832–841. ACL, August 2009.

[^15]: Rafal Jozefowicz, Oriol Vinyals, Mike Schuster, Noam Shazeer, and Yonghui Wu. Exploring the limits of language modeling. arXiv preprint arXiv:1602.02410, 2016.

[^16]: Łukasz Kaiser and Samy Bengio. Can active memory replace attention? In Advances in Neural Information Processing Systems, (NIPS), 2016.

[^17]: Łukasz Kaiser and Ilya Sutskever. Neural GPUs learn algorithms. In International Conference on Learning Representations (ICLR), 2016.

[^18]: Nal Kalchbrenner, Lasse Espeholt, Karen Simonyan, Aaron van den Oord, Alex Graves, and Koray Kavukcuoglu. Neural machine translation in linear time. arXiv preprint arXiv:1610.10099v2, 2017.

[^19]: Yoon Kim, Carl Denton, Luong Hoang, and Alexander M. Rush. Structured attention networks. In International Conference on Learning Representations, 2017.

[^20]: Diederik Kingma and Jimmy Ba. Adam: A method for stochastic optimization. In ICLR, 2015.

[^21]: Oleksii Kuchaiev and Boris Ginsburg. Factorization tricks for LSTM networks. arXiv preprint arXiv:1703.10722, 2017.

[^22]: Zhouhan Lin, Minwei Feng, Cicero Nogueira dos Santos, Mo Yu, Bing Xiang, Bowen Zhou, and Yoshua Bengio. A structured self-attentive sentence embedding. arXiv preprint arXiv:1703.03130, 2017.

[^23]: Minh-Thang Luong, Quoc V. Le, Ilya Sutskever, Oriol Vinyals, and Lukasz Kaiser. Multi-task sequence to sequence learning. arXiv preprint arXiv:1511.06114, 2015.

[^24]: Minh-Thang Luong, Hieu Pham, and Christopher D Manning. Effective approaches to attention-based neural machine translation. arXiv preprint arXiv:1508.04025, 2015.

[^25]: Mitchell P Marcus, Mary Ann Marcinkiewicz, and Beatrice Santorini. Building a large annotated corpus of english: The penn treebank. Computational linguistics, 19(2):313–330, 1993.

[^26]: David McClosky, Eugene Charniak, and Mark Johnson. Effective self-training for parsing. In Proceedings of the Human Language Technology Conference of the NAACL, Main Conference, pages 152–159. ACL, June 2006.

[^27]: Ankur Parikh, Oscar Täckström, Dipanjan Das, and Jakob Uszkoreit. A decomposable attention model. In Empirical Methods in Natural Language Processing, 2016.

[^28]: Romain Paulus, Caiming Xiong, and Richard Socher. A deep reinforced model for abstractive summarization. arXiv preprint arXiv:1705.04304, 2017.

[^29]: Slav Petrov, Leon Barrett, Romain Thibaux, and Dan Klein. Learning accurate, compact, and interpretable tree annotation. In Proceedings of the 21st International Conference on Computational Linguistics and 44th Annual Meeting of the ACL, pages 433–440. ACL, July 2006.

[^30]: Ofir Press and Lior Wolf. Using the output embedding to improve language models. arXiv preprint arXiv:1608.05859, 2016.

[^31]: Rico Sennrich, Barry Haddow, and Alexandra Birch. Neural machine translation of rare words with subword units. arXiv preprint arXiv:1508.07909, 2015.

[^32]: Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, Quoc Le, Geoffrey Hinton, and Jeff Dean. Outrageously large neural networks: The sparsely-gated mixture-of-experts layer. arXiv preprint arXiv:1701.06538, 2017.

[^33]: Nitish Srivastava, Geoffrey E Hinton, Alex Krizhevsky, Ilya Sutskever, and Ruslan Salakhutdinov. Dropout: a simple way to prevent neural networks from overfitting. Journal of Machine Learning Research, 15(1):1929–1958, 2014.

[^34]: Sainbayar Sukhbaatar, Arthur Szlam, Jason Weston, and Rob Fergus. End-to-end memory networks. In C. Cortes, N. D. Lawrence, D. D. Lee, M. Sugiyama, and R. Garnett, editors, Advances in Neural Information Processing Systems 28, pages 2440–2448. Curran Associates, Inc., 2015.

[^35]: Ilya Sutskever, Oriol Vinyals, and Quoc VV Le. Sequence to sequence learning with neural networks. In Advances in Neural Information Processing Systems, pages 3104–3112, 2014.

[^36]: Christian Szegedy, Vincent Vanhoucke, Sergey Ioffe, Jonathon Shlens, and Zbigniew Wojna. Rethinking the inception architecture for computer vision. CoRR, abs/1512.00567, 2015.

[^37]: Vinyals & Kaiser, Koo, Petrov, Sutskever, and Hinton. Grammar as a foreign language. In Advances in Neural Information Processing Systems, 2015.

[^38]: Yonghui Wu, Mike Schuster, Zhifeng Chen, Quoc V Le, Mohammad Norouzi, Wolfgang Macherey, Maxim Krikun, Yuan Cao, Qin Gao, Klaus Macherey, et al. Google’s neural machine translation system: Bridging the gap between human and machine translation. arXiv preprint arXiv:1609.08144, 2016.

[^39]: Jie Zhou, Ying Cao, Xuguang Wang, Peng Li, and Wei Xu. Deep recurrent models with fast-forward connections for neural machine translation. CoRR, abs/1606.04199, 2016.

[^40]: Muhua Zhu, Yue Zhang, Wenliang Chen, Min Zhang, and Jingbo Zhu. Fast and accurate shift-reduce constituent parsing. In Proceedings of the 51st Annual Meeting of the ACL (Volume 1: Long Papers), pages 434–443. ACL, August 2013.
