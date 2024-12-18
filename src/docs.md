---
title: "style guide"
layout: "layouts/page.html"
date: Last Modified
---

## color swatches

{% include "partials/style-guide/swatches.html" %}

## fonts

{% include "partials/style-guide/fonts.html" %}

## misc notes

I would like to make & document some more thorough rules to follow here, but this is the best I've got for now. So here are some extra bits and pieces that I want to make a note of:

- I use a `6px` border radius for everything
- Headers and nav links are lowercase; body copy is sentence-case
  - **Exception:** Old blog posts & the [changelog](/log) are mostly lowercase
- Links are underlined!!!
- I don't really like to put Argent Pixel & Departure Mono too close to each other if I can avoid it
- No periods in bullet-pointed items unless they _all_ have periods (other punctuation for emphasis is okay)
- I wish I could explain my stance on when to use ampersands but it's kinda just a vibe

### header rules

- `h1` uses Argent Pixel; everything else uses Departure Mono
- `h2` gets the `background-color: var(--oat);` treatment
- Headers are always lowercase

### things to fix

- I'm not super happy with how `h3` and below look
- Code needs a more readable font & actual syntax highlighting
- I do _not_ have a good system for font sizes at all
- I want to actually write down rules for which colors are used for what (some of them aren't even used for anything at all right now!)
