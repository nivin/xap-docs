---
type: post123
title:  Multi-Tiered Data Storage (SSD)
categories: XAP123GS, ENT
parent: xap-basics.html
weight: 1600
canonical: auto
---


XAP 10 introduces a new storage model called BlobStore Storage Model, which allows an external storage medium (one that does not reside on the JVM heap) to store the IMDG data. This guide describes the general architecture and functionality of this storage model that is leveraging both on-heap, off-heap and SSD implementation, called `MemoryXtend`.




{{%section%}}
{{%column width="30%"  %}}
{{%youtube "kAe-ZxFnIYc"  "XAP MemoryXtend"%}}
{{%/column%}}

{{%column width="30%"  %}}
This MemoryXtend [white paper](/download_files/White-Paper-ssd-V2.pdf) provides a high level overview of the technology and motivation behind MemoryXtend.
{{%/column%}}

{{%column width="30%"  %}}
This MemoryXtend [tutorial](/download_files/xap10memoryXtend-tutorial.pdf) describes how to experiment with MemoryXtend and comparing RAM based Data Grid with SSD based Data Grid.
{{%/column%}}
{{%/section%}}

{{%refer%}}[MemoryXtend](../admin/memoryxtend-overview.html){{%/refer%}}

