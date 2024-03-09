---
title: using obsidian as a cms
layout: layouts/page.html
tags:
  - post
  - projects
  - oolong
date: 2024-03-09
publish: true
summary: it took me a while to decide what i wanted to do about the dreaded content management over here. mostly because i didn't think my ideal solution was a real option.
---
it took me a while to decide what i wanted to do about the dreaded content management over here. mostly because i didn't think my ideal solution — writing stuff directly in the obsidian vault that i use for everything else all the time & then being able to put what i've written online without needing to actually push anything to github myself — was a real option. turns out it kinda is.

i'm using the [github publisher plugin](https://github.com/ObsidianPublisher/obsidian-github-publisher) for obsidian, which has a bunch of configuration options that i am pretending to understand how to use. i added a folder to my obsidian vault — alongside all my other folders full of notes that already exist — and moved all my [old blog posts](https://jillian.garden) into it. i also set up an obsidian template for new blog posts, with all the front matter properties i needed. now, all i need to do to publish a blog post is hit the little "publish" checkbox in the file properties, and the plugin will push it to the repo & merge it automatically.

![a screenshot of this post within my obsidian setup](./photos/obsidian_screenshot.png)

this plugin is cool, and it pretty much *is* the ideal solution i was looking for, but it's not perfect. it took me a couple of days of wrangling with both the plugin & 11ty to figure out how to get images to actually show up in posts because of file path weirdness (the solution i ended up with was making each blog post a [folder note](https://lostpaul.github.io/obsidian-folder-notes/) with another folder inside it for photos). the plugin also can't pull any content *in*, so if i were to add a post via some other method for whatever reason, i wouldn't be able to see & edit that post in obsidian without making a brand new copy of it — not that i expect this will happen often.

## fun config stuff if you're nosy
i will not claim to be an expert on anything that's going on here, but these are the plugin settings that seem to be doing what i want:

- since i want the file structure to stay the same as it is in my obsidian vault, i have **file tree in repository** set to **obsidian path**. i'm also using the folder path name replacer — the name of the obsidian folder i'm using is "🍵 oolong," but the plugin very politely pretends that it's named "src" so everything will end up in the right place.
- i have **folder notes** turned on, so each blog post is in its own folder — the folder is named with the blog post title, and the post itself is just "index.md," which is what 11ty was already doing. for whatever reason, this is what fixed the issue i was having with images not showing up.
- i have **internal links** and **wikilink → mdlink converting** turned on but i don't actually know what that's doing because i haven't tested it. i suspect i'm gonna have to play around with it to get it to work, but it's not like i'm using a lot of wikilinks here.
- i have **transfer attachments** turned on — this is so anything that's not a markdown file that gets linked *in* a markdown file (e.g. an image in a blog post) also gets published. i also have attachments set to use the obsidian structure, so they stay in the folders i put them in rather than all getting sent to the same place.
- i changed my share key to "publish" rather than the default "share" because i like that better.

so that's what i've been tinkering with this weekend. right now, it's just set up for blog posts, but i want to try using this method for other types of collections — books i'm reading, games i'm playing, etc. 