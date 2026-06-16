---
title: The Cron Job That Took 41 Days To Teach Me DBMS
date: 2026-05-18
excerpt: How one keepalive cron job, repeated indexing, and broad reads exposed real database costs.
---

Last night, Prmpt hit **Supabase Pro's Disk IO limit** during internal testing.

At first, the obvious thought was: **"Is Supabase down?"**

The Table Editor wasn't loading. Schemas were failing. The app itself was slow because it fetches a lot of state from Supabase. Recently Supabase had some regional issues in India too, so my first instinct was to check X, Google, and the Supabase status page.

Status page was fine.

**So yeah, turns out the problem was us.**

For context, Prmpt is an OS-level prompt optimizer. You type `@prompt` anywhere, it opens an overlay, optimizes your rough prompt, and puts it back where you were typing.

One of the bigger parts we've been building is the **code-intel layer**. Aarush Dhingra has been working deeply on this. You attach a project, Prmpt chunks the codebase, creates embeddings, stores graph relationships, and makes the code easier to traverse without dumping too many tokens into the model.

Basically, the goal is: **better code understanding, fewer wasted tokens, better prompts.**

But if you are building something like this, you have to dogfood it properly. So I was using Prmpt on my own projects, deleting and adding projects again, testing indexing, fixing streaming issues, scroll issues, UI issues, and all the small things that only show up when you actually use your own app.

**If you don't use your own app, why would anyone else?**

Then the next day, while I was working on WebToMD and using Prmpt's code-intel layer, things felt off. It was slow. The prompts were not up to the mark. Aarush Dhingra was also testing and improving the backend side.

Then we checked Supabase and saw the **Disk IO warning**.

We had a good laugh about somehow managing to hit Supabase Pro's hourly Disk IO limits during internal testing, then got back to fixing the actual system.

The funny part is, the real problem was not one dramatic bug. It was a bunch of **"small" database decisions finally meeting real usage.**

We had repeated project indexing and reindexing. That means chunks, embeddings, summaries, graph relationships, deletes, inserts, index updates. **Vector rows are not normal tiny rows. They are heavy.**

We were also opening tables directly in Supabase Studio while debugging. The audit showed that Table Editor queries were doing broad `SELECT * ... LIMIT/OFFSET` style reads. That is fine when tables are small, but when rows contain large text, metadata, and embeddings, **"just opening the table" is not free anymore.**

Then there was **index bloat**.

One table had around 744 kB of actual data but around 17 MB of indexes. After reindexing and checking individual index sizes, it came down to around 224 kB. That was one of those moments where DBMS stopped feeling like a college subject and started feeling like a real thing people get paid to understand.

But the part that hit me the most was the cron job.

**41 days ago**, I wrote a cron job to keep our free Render services awake. We are not backed by anyone, so obviously we try to save where we can. That cron pinged our Python backend and code-intel service every 7 minutes.

Useful? Yes.

But `pg_cron` logs every run in `cron.job_run_details`.

Two keepalive jobs meant around **412 pings per day**. The logs kept piling up. We were never going to use that data. I should have thought about cleanup when I wrote it.

**It took 41 days to bite me.**

That was the actual learning.

When you are building with users in mind, a query is not just **"working" or "not working."** It has a future version.

What happens after 40 days?

What happens after repeated testing?

What happens when tables get wider?

What happens when your debugging tool itself runs expensive queries?

What happens when every small automation leaves behind data you never clean?

We got lucky in one way: Supabase allowed one free Disk IO upgrade from 0.5 GB to 1 GB. That gave us breathing room at no additional cost.

**But that was not the fix.**

The real fix was **understanding the system properly.**

We cleaned old cron history and made the keepalive job self-cleaning. We reindexed bloated tables. We added more targeted indexes. We moved toward narrower reads so code-intel does not pull embedding columns when it only needs lightweight metadata. We also added pacing around batch upserts so indexing does not create unnecessary IO spikes.

Some of this was immediate mitigation. Some of it is deeper backend work Aarush Dhingra has been improving. But the important part is that the app is stronger now because the failure forced us to look at the database as **a living system**, not just a place where data sits.

This was internal testing only. No users were affected.

But honestly, I am glad it happened now.

Because if Prmpt is going to become a real product, these things need to break early. Not in the sense that breaking is good, but in the sense that weak parts of the system need to reveal themselves while we still have room to fix them properly.

That day taught me more about databases than a clean tutorial probably would have.

**DBMS is not just schemas and SQL syntax.**

It is **query shape**.

It is **cleanup**.

It is **indexes**.

It is **IO**.

It is knowing that **"temporary" jobs become permanent** if you forget about them.

It is understanding that **every shortcut has a future cost.**

We are still a team of two.

But we are learning fast, and we are not stopping.

**We build. We break. We learn. We fix. We build better.**
