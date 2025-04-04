---
title: "shelf"
layout: "layouts/page.html"
date: Last Modified
eleventyNavigation:
  key: Shelf
  parent: Home
---

{% include "partials/shelf/books.html" %}
{% include "partials/shelf/games.html" %}

<style>
    table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
    }

    th {
        padding: 8px;
        text-align: left;
        font-family: var(--mono);
        font-weight: 300;
        text-transform: uppercase;
    }

    td {
        padding: 8px;
        line-height: 16px;
        text-transform: capitalize;
    }

    .swatch {
      float: left;
      width: 12px;
      height: 12px;
      margin: 2px 8px 0 0px;
      border-radius: 100%;
      border: 1px solid var(--oat);
    }
</style>