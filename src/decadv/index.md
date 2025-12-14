---
title: december adventure
layout: layouts/page.html
tags:
date: 2025-12-01
publish: true
summary:
permalink: /decadv/
---
# December Adventure
> The December Adventure is **low key**. <cite><a href="https://eli.li/december-adventure">eli_oat</a></cite>  

## 01
I've never ~~successfully~~ done any kind of monthly challenge. I like the idea of them, but intentional consistency is not my strong suit. The December Adventure feels more my speed — inching along with some kind of creative practice in whatever way feels meaningful to you each day. 

Today's goals: heat up some water and browse past [adventure logs](https://eli.li/december-adventure) for inspiration.

---

## 02
Cleaned my apartment in the hopes of feeling more productive tomorrow. 

---

## 03
![Screenshot of code editor](./photos/decadv_03.png)

I got back into a little project I've been working on here and there for a few months, born out of my want for something [Twine](https://twinery.org/)-y but simpler. What I've ended up making is a tool that turns a markdown file into interactive fiction. 

I've had most of it sort of working for a while, but today I finally added some variable interpolation — so now you can do a liiiittle more than just jump between text passages based on player choices.

I'll probably end up working on this for most of December Adventure, although I do have a few other projects in mind that I could pick up.

---

## 04
Had a headache.

---

## 05
Fridays are for chores!

---

## 06–08
I had a very sleepy weekend and a slow start to the week, so I didn't feel like doing anything.

---

## 09
Back to work on the interactive fiction tool! I added some conditional operator stuff to the code interpolation, so now you can do something like this:

```js
You currently have { items.bread.count } bread.

{ if items.bread.count > 0 }
You have some bread! Good.
{ endif }

{ if items.bread.count >= 2 }
You have plenty of bread.
{ endif }

{ if items.bread.count == 1 }
You have exactly one piece of bread.
{ endif }
```

And if you have 2 pieces of bread in your inventory, for example, you'd see:
> You current have 2 bread. You have some bread! Good. 

---

## 10
Spent some time today writing a story to use with the interactive fiction tool. Probably not something I will ever share, but it's fun to do a bit of creative writing every once in a while.

---

## 11–13
Played a lot of [Islanders: New Shores](https://jillian.garden/shelf/games/islanders-new-shores/).

---

## 14
I finally got around to a few website chores I've been putting off forever:
- Added proper syntax highlighting to my site, using the [Eleventy plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) + [Rose Pine Moon](https://github.com/rose-pine/prism/tree/main) theme
- Added a shortcode for image grids

The image grid thing is pretty simple. Here's what it looks like in Markdown:
```md
{% grid %}
![Photo A](./photos/A.jpg)
![Photo B](./photos/B.jpg)
{% endgrid %}
```

And then here's what's going on in my `.eleventy.js` file:
```js
const markdownIt = require('markdown-it');
const md = new markdownIt();
eleventyConfig.addPairedShortcode("grid", function (content) {
	const renderedContent = md.render(content);
    return `<div class="image-grid">${renderedContent}</div>`;
});
```

It just wraps whatever's in the grid in a `<div>` with the `image-grid` class, which then does the rest of the work:
```css
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.image-grid img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
```

Ez pz. And as proof, here are two photos of Junie:
{% grid %}
![test_1](./photos/test_1.jpg)
![test_2](./photos/test_2.jpg)
{% endgrid %}
