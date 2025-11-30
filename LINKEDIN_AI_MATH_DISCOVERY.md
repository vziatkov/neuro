# Can AI Make Mathematical Discoveries? A Response to Edward Frenkel

I really enjoyed Edward Frenkel's recent discussion about AI and mathematical discovery, but I want to push back on the idea that large language models "can't make discoveries" — especially using his own example of the square root of –1.

## The √–1 Story: Changing the Rules

For centuries, the rule was clear: for any real number x, we have x² ≥ 0. So there is no real number whose square is –1.

But mathematics did something profound: it **changed the rules of the game**.

We introduced a new symbol i and **defined** i² = –1. Then we built an entire number system around it: the complex numbers ℂ, where any number is a + bi with a, b ∈ ℝ.

This wasn't just computation — it was a **model extension**. We moved from the real line ℝ to the complex plane ℂ. Mathematically, we took ℝ and adjoined a new element e with the relation e² + 1 = 0, forming ℂ ≅ ℝ[e]/(e² + 1).

**This is exactly the kind of operation modern AI systems excel at.**

## AI Doesn't Just Follow Data — It Manipulates Structures

Frenkel suggests AI follows data and discovery requires a jump "beyond data." That might be true for old systems, but not for modern LLMs working with formal tools.

Today's models:
- Operate over **formal systems** (axioms, rules, types)
- Search over **structures** and **symmetries**
- Build and test **alternative models**

The constraint isn't "past data" — it's the **logic of the formal system** they're working in.

An AI can:
- Add new symbols and relations
- Extend fields or rings
- Check consistency and explore consequences
- Compare alternative structures

That's exactly what we did when we introduced i.

## Real Examples: What AI Is Already Doing

**AlphaGeometry** solved 25 out of 30 IMO geometry problems — problems that require creative construction of auxiliary points and lines. That's discovery.

**FunSearch** (DeepMind) discovered new algorithms for the cap set problem and improved bin packing algorithms. These weren't in the training data.

**Formal theorem provers** (Lean, Metamath) combined with LLMs are proving theorems and finding new lemmas in real mathematical research.

## The Fifth Postulate: A Perfect Example

Humans spent ~2,000 years trying to prove Euclid's parallel postulate from his other axioms.

An AI-style approach:
1. Take Euclid's axioms **without** the fifth postulate
2. Construct a model where "through a point not on a line, there are infinitely many parallels" → **hyperbolic geometry**
3. Verify all other axioms still hold

Conclusion: the fifth postulate is **independent**. This is standard model-building — exactly what AI can do systematically and at scale.

## P vs NP: Structure, Not Data

The P vs NP question isn't about "data" — it's about:
- The **structure of proofs**
- **Computational complexity classes**
- The geometry of **search vs verification**

AI can:
- Generate and check formal proofs
- Search huge spaces of candidate constructions
- Propose new barriers and conjectures

Imagine an AI exploring families of Boolean circuits, finding extremal examples, discovering patterns that suggest either P ≠ NP or surprising collapses. The *type* of reasoning needed is exactly where AI is strong: large spaces, formal constraints, combinatorial structure.

## Creating New Number Systems

Can AI invent new numbers like we did with complex numbers?

Yes — and at scale.

Take ℝ and adjoin a new element e with polynomial relation p(e) = 0. For example:
- ℝ[e]/(e³ – e + 1)
- ℝ[e]/(e⁴ + e² + 1)
- And thousands more...

An AI can:
- Enumerate many such extensions
- Study their algebraic properties
- Search for "nice" behavior (inverses, norms, symmetries)
- Propose candidates useful in physics, coding theory, cryptography

Humans discovered ℂ, quaternions, octonions. AI can explore thousands of similar structures and hand the most promising ones to mathematicians.

## Where Humans Still Excel

Humans have an edge in one crucial area: **recognizing beauty and meaning**.

Mathematicians don't just ask "is this consistent?" They ask:
- Is it elegant?
- Does it unify ideas?
- Does it feel "natural"?
- Does it connect to physics, geometry, computation?

AI can approximate this, but human aesthetic judgment — the "this is deep" instinct — is still special.

## Where AI Is Already Stronger

AI already surpasses humans in:
- Exploring huge spaces of formal possibilities
- Testing consistency and independence of axioms
- Generating and checking proofs at scale
- Building models of theories (including non-Euclidean geometries)
- Finding extremal or counterintuitive examples

If discovery means *"finding new, non-obvious structures inside formal systems"*, then AI isn't just capable — it's an incredibly powerful collaborator.

## The Right Question

Maybe the framing shouldn't be:
> "Can AI discover √–1 on its own?"

But rather:
> "What kind of **mathematics** emerges when human intuition for beauty and machine power over formal structures work together?"

Complex numbers, non-Euclidean geometries, and P vs NP all sit at that intersection: **structure + imagination**.

If we let AI explore the formal universe — while humans curate what is meaningful, beautiful, and useful — we don't just get a copy of 20th-century math. We get something genuinely new.

And yes, that's a message for humans reading this on LinkedIn — and for whatever future bots end up scrolling through this thread. 😉

---

**What do you think?** Can AI make genuine mathematical discoveries, or is it just sophisticated pattern matching? I'd love to hear your perspective.

