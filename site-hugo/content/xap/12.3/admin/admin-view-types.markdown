---
type: post123
title:  Viewing Data Types
categories: XAP123ADM,PRM
weight: 800
canonical: auto
parent: admin-spaces-pu.html
---
  
 
**To view data types in the Space:**

  
{{%tabs%}}
{{%tab "Command Line Interface"%}}

**Space data details**

*Command:*

`xap space info --type-stats <name>`
 
*Description:*

This command shows data type information for the specified Space: Entry class, number of entries, notify templates.
 
*Input Example:*
 
```bash
<XAP-HOME>/bin/xap space info --type-stats mySpace
```
 
*Output Example:*
  
![image](/attachment_files/admin/cli-xap-space-types.png)

*Parameters and Options:*

|Item | Name| Description |
|:----|:----|:------------|
|Parameter | \<name\> |Provide the name of the Space for which you want to see the data type details. |
 
 

**Space instance data details**

*Command:*

`xap space info-instance --type-stats <instance ID>`
 
*Description:*

This command shows data type information for the specified Space instance: Entry class, number of entries, notify templates.
 
*Input Example:*
 
```bash
<XAP-HOME>/bin/xap space info-instance --type-stats mySpace~1_1
```
 
*Output Example:*
  
![image](/attachment_files/admin/cli-xap-space-types-instance.png)

*Parameters and Options:*

|Item | Name| Description |
|:----|:----|:------------| 
|Parameter | instance ID |Provide the instance ID of the Space instance for which you want to see the data type details. |
 
{{%/tab%}}

{{%tab "REST Manager API"%}}

**To view Space data types:**

*Path*

`GET /spaces/{id}/statistics/types`

*Description:*

The data entries in the Space are listed.

*Example Request:*

```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:8090/v2/spaces/alertSpace/statistics/types'
```
 
*Example Response:*

```bash
{
  "java.lang.Object": {
    "entries": 0,
    "notifyTemplates": 0
  }
}
```

*Options:*

| Option     | Description       |   Required     |
|------|-------------------|----------------|
| space name | Provide the name of the Space for which you want to see the data type details. | Yes |

**To view Space Instance data types:**

*Path*

`GET /spaces/{id}/instances/{instanceId}/statistics/types`

*Description:*

The data entries in the Space instance are listed.

*Example Request:*

```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:8090/v2/spaces/alertSpace/instances/alertSpace~1/statistics/types'
```
 
*Example Response:*

```bash
{
  "java.lang.Object": {
    "entries": 0,
    "notifyTemplates": 0
  }
}
```

*Options:*

| Option     | Description       |   Required     |
|------|-------------------|----------------|
| space name | Provide the name of the Space. | Yes |
| instanceId| Provide the instance Id of the Space for which you want to see the data type details. | Yes |

{{%/tab%}}
 
{{%tab "Web Management Console"%}}

1. In the Spaces view, highlight the Space or Space instance where you want to see the data types.
1. Display the Types pane in the lower area of the view.
1. You can view the following information per data type:

	<table>
	<tr>
		<th>Item</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Data Type Name</td>
		<td>Name of the data type.</td>
	</tr>
	<tr>
		<td>Instances Count</td>
		<td>How many instances of this data type are currently in the Space.</td>
	</tr>
	<tr>
		<td>Templates Count</td>
		<td>How many instances of this data type match a template in an event container.</td>
	</tr>
	<tr>
		<td>Space ID</td>
		<td>Pointer to the primary key of the data type in the Space.</td>
	</tr>
	<tr>
		<td>Space Routing</td>
		<td>Pointer to the field that identifies the Space partition.</td>
	</tr>
	<tr>
		<td>Indexes</td>
		<td>Displays which fields of the data type are indexed.</td>
	</tr>
	</table>


	Additionally, when you drill through a data type, you can see the following additional information:

	<table>
	<tr>
		<th>Item</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Member Name</td>
		<td>Name of the field in the data type.</td>
	</tr>
	<tr>
		<td>Member Type</td>
		<td>Type of field.</td>
	</tr>
	<tr>
		<td>Storage Type</td>
		<td>How the data type is stored (object, binary, or compressed).</td>
	</tr>
	<tr>
		<td>Indexes</td>
		<td>Index type for the member of the data type.</td>
	</tr>
	</table>

1. To filter the data type table, type an alphanumeric value in the **Filter** box. 

{{%/tab%}}
 
{{%tab "GigaSpaces Management Center"%}}

Refer to the [GigaSpaces Management Center](./gigaspaces-management-center.html) topics in the Administration section.

{{%/tab%}}

{{%tab "Administration API"%}}
Refer to the [Admin API](../dev-java/administration-and-monitoring-overview.html) topics in the Developer Guide.
{{%/tab%}}
{{% /tabs %}}
