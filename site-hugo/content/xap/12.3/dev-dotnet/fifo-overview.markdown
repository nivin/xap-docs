---
type: post123
title:  FIFO Ordering
categories: XAP123NET, PRM
parent: event-processing.html
weight: 400
canonical: auto
---




Supporting FIFO (First In, First Out) behavior for Entries is a critical requirement when building messaging systems or implementing master-worker patterns. Users should be able to get Entries in the same order in which they were written. XAP supports both non-ordered Entries and FIFO-ordered Entries when performing Space operations.


