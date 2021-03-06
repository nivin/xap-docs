---
type: post123
title:  Viewing Space Configuration Information
categories: XAP123ADM,PRM
weight: 300
canonical: auto
parent: admin-spaces-pu.html
---
 
 
{{%note "Info"%}}
This functionality is not yet available in the Command Line Interface or REST Manager API administration tools.
{{%/note%}} 
 
**To view Space information:**


{{%tabs%}}
<!--
{{%tab "Command Line Interface"%}}
N/A
{{%/tab%}}

{{%tab "REST Manager API"%}}
N/A
{{%/tab%}}
-->

{{%tab "Web Management Console"%}}
 
You can see the following details about Spaces in the lower pane of the Spaces view when the Configuration option is selected (default). The information is displayed for the Space instance that is highlighted in the table above.

{{%note "Note"%}}
This information is also available in the Config tab of the associated Processing Unit.
{{%/note%}}

<table>
  <tr>
    <th>Item</th>
    <th>Description</th>
  </tr>
  <tr>
    <td colspan="2"><i>General</i></td>
    <td></td>
  </tr>
  <tr>
    <td>Space Schema</td>
    <td>Type of schema (default, mirror, or persistent).</td>
  </tr>
  <tr>
    <td>Secured</td>
    <td>Whether or not this Space is secured.</td>
  </tr>
  <tr>
    <td>Persistent</td>
    <td>Whether or not this Space is persistent.</td>
  </tr>
  <tr>
    <td>Clustered</td>
    <td>Whether or not this Space is part of a cluster.</td>
  </tr>
  <tr>
    <td>Clustered Schema</td>
    <td>(If applicable) The cluster topology (partitioned or replicated).</td>
  </tr>
  <tr>
    <td colspan="2"><i>Network &amp; Environment</i></td>
    <td></td>
  </tr>
  <tr>
    <td>Home Directory</td>
    <td>Path where the deployment files are located.</td>
  </tr>
  <tr>
    <td>Host Name</td>
    <td>Name or IP address of the host machine.</td>
  </tr>
  <tr>
    <td>RMI Registry Port</td>
    <td>Port number for the RMI registry.</td>
  </tr>
  <tr>
    <td>JMX Service URL</td>
    <td>Full URL for hte JMX service.</td>
  </tr>
  <tr>
    <td colspan="2"><i>Memory Management</i></td>
    <td></td>
  </tr>
  <tr>
    <td>Cache Policy</td>
    <td>Defined cache policy (all in cache or LRU)</td>
  </tr>
  <tr>
    <td>LRU Eviction Batch Size</td>
    <td>(LRU only) How many of the oldest data objects to remove if eviction is based on available memory. </td>
  </tr>
  <tr>
    <td>Cache Size</td>
    <td>Amount of memory allocated to the cache.</td>
  </tr>
  <tr>
    <td>Memory Management State</td>
    <td>Whether the memory manager is enabled or disabled.</td>
  </tr>
  <tr>
    <td>High Watermark</td>
    <td>When the amount of used cache memory reaches this value (in %), the memory manager must take action (throw an exception or evict objects).</td>
  </tr>
  <tr>
    <td>Low Watermark</td>
    <td>When the amount of used cache memory reaches this value (in %),  the memory manager begins to monitor how much cache memory is left.</td>
  </tr>
  <tr>
    <td>Write Operation Rejection</td>
    <td>When the amount of used cache memory reaches this value (in %), the memory manager begins to block write operations. </td>
  </tr>
  <tr>
    <td>Write Operation Inspection</td>
    <td>When the amount of used cache memory reaches this value (in %), the memory manager begins to monitor write operations. </td>
  </tr>
</table>


If you have a system with Memory Xtend, you can also see the following information about the blobstore:

<table>
  <tr>
    <th>Item</th>
    <th>Description</th>
  </tr>
    <tr>
    <td>External Storage Path</td>
    <td>Location where cold data is stored on disk (SSD or HDD).</td>
  </tr>
  <tr>
    <td>Off-Heap Cache Threshold</td>
    <td>(RocksDB storage driver only) Amount of off-heap memory allocated for caching.</td>
  </tr>
  <tr>
    <td>External Storage Cache Size</td>
    <td>Amount of memory allocated on the disk (SSD or HDD), in MB.</td>
  </tr>
  <tr>
    <td>Mapping Dir</td>
    <td>Pointer to the location of the mapping directory for the external storage path.</td>
  </tr>
  <tr>
    <td>Space Cache Size</td>
    <td>Maximum number of data objects that can be stored in the blobstore before the application begins evicting.</td>
  </tr>
   <tr>
    <td>Memory Xtend Add-On Type</td>
    <td>Storage driver that was implemented.</td>
  </tr>
  <tr>
    <td>Persistent</td>
    <td>Indicates whether the blobstore is persistent (true/false).</td>
  </tr>
  <tr>
    <td>Off-Heap Threshold</td>
    <td>(Off-heap storage driver only) Amount of off-heap memory allocated for the blobstore.</td>
  </tr>
</table>  
 
{{%/tab%}}


{{%tab "GigaSpaces Management Center"%}}

Refer to the [GigaSpaces Management Center](./gigaspaces-management-center.html) topics in the Administration section.

{{%/tab%}}


{{%tab "Administration API"%}}

Refer to the [Admin API](../dev-java/administration-and-monitoring-overview.html) topics in the Developer Guide.

{{%/tab%}}

{{% /tabs %}}

