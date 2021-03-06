---
type: post123
title: Terminating a Spark Job
categories: XAP123ADM,PRM
weight: 700
canonical: auto
parent: admin-insightedge.html
---
 
{{%note "Info"%}}
This functionality is not yet available in the Command Line Interface, Web Management Console, GigaSpaces Management Center, or Administration API administration tools.
{{%/note%}} 
 
**To terminate a Spark job:** 

 
{{%tabs%}}

<!--
{{%tab "Command Line Interface"%}}
N/A
{{%/tab%}}
-->

{{%tab "REST Manager API"%}}

*Path*

`DELETE /spark/applications/{id}`

*Description:*

This option terminates a Spark job.

*Example Request:*

```bash
curl -X DELETE --header 'Accept: text/plain' 'http://localhost:8090/v2/spark/applications/application1'
```
 
*Options:*

| Option     | Description       |   Required     |
|------|-------------------|----------------|
| id | Provide the ID of the Spark driver where you want to terminate the job. | Yes  |
 

 
{{%/tab%}}

{{% /tabs %}}
