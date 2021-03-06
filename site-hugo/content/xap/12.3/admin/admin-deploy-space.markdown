---
type: post123
title:  Deploying a Space
categories: XAP123ADM,PRM
weight: 100
canonical: auto
parent: admin-spaces-pu.html
---
 
 

As part of evaluating XAP or InsightEdge, or as part of working with the products in a lab environment, you’ll want to deploy a data grid, also known as a Space. After you’ve deployed the Space, you can perform Space-related activities, such as adding data objects, viewing information about the Space configuration, querying the data in the Space, and viewing logs and alerts. 

{{%note "Note"%}}
In order to deploy a Space, you must first have a [service grid](./admin-service-grid.html)  up and running. Deploying a Space creates a Processing Unit that contains only a Space, without any application components.
{{%/note%}}


**To deploy a Space to the service grid:**

{{%tabs%}}
{{%tab "Command Line Interface"%}}

*Command:* 

`xap space deploy`

*Description:* 

Deploys a Space in a stateful Processing Unit.

{{%note "Note"%}}
Before deploying a Space, you must start a container (refer to [Starting a Container](./admin-service-grid-container-start.html)).
{{%/note%}}


*Parameters and Options:*

<table>
  <tr>
    <th>Item</th>
    <th>Name</th>
    <th>Description</th>
    <th>Comment</th>
  </tr>
   <tr>
    <td>Parameter</td>
    <td>name</td>
    <td>Provide the name of the Space you are deploying.</td>
    <td>If you run the command without defining any options, a non-clustered Space is deployed.</td>
  </tr>
  <tr>
    <td>Option</td>
    <td style="white-space: nowrap">--partitions</td>
    <td>Define how many primary partitions the Space should contain, using the syntax <code>--partitions=n</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td>Option</td>
    <td>--ha</td>
    <td>High availability. Adds a single backup partition per primary partition.</td>
    <td></td>
  </tr>
  <tr>
    <td>Option</td>
    <td style="white-space: nowrap">--requires-isolation</td>
    <td>If this Space should not share a container, adding this option provisions the Space in a dedicated container.</td>
    <td></td>
  </tr>
</table>


*Input Example:*

This example deploys a Space named **mySpace** with high availability and two partitions, two instances for the first parition (mySpace~1_1,mySpace~1_2) and two for the second partition (mySpace~2_1,mySpace~2_2). For this example, you must start at least 2 containers.


```bash
<XAP-HOME>/bin/xap space deploy --ha --partitions=2 mySpace
```

{{%/tab%}}


{{%tab "REST Manager API"%}}

*Path*

`POST /spaces`

*Description:* 

Deploys a Space in a stateful Processing Unit. If you run the command without defining any options, a non-clustered Space is deployed.

*Example Request:*

```bash
curl -X POST --header 'Content-Type: application/json' --header 'Accept: text/plain' 'http://localhost:8090/v2/spaces?name=mySpace&partitions=3&backups=true&requiresIsolation=true'
```
This example deploys a Space named **mySpace** with high availability, three partitions and isolation. 


*Options:*

| Option     | Description       |   Required     |
|------|-------------------|----------------|
| name | Provide the name of the Space you are deploying. | Yes |
| ha         |High availability. Adds a single backup partition per primary partition. | No |
| partitions= &lt;partitions&gt;    | Define how many primary partitions the Space should contain, using the syntax `--partitions=n`. | No |
|requiresIsolation   | If this Space should not share a container, adding this option provisions the Space in a dedicated container. | No |

{{%/tab%}}


{{%tab "Web Management Console"%}}

1. From the Deploy menu on the menu bar, select **Space**.
1. In the Space Deployment dialog box, do the following:

	<ol type="a">
		<li>In the <b>Space name</b> box, type a name for the Space.</li>
		<li>(Optional) If you want this Space to be secure, do the following In the <b>User Login Details</b> area:
		<ul>
			<li>Select <b>Secured Space</b>.</li>
			<li>Provide the user credentials in the <b>User Name</b> and <b>Password</b> boxes.</li>
		</ul>
		</li>
		<li>In the <b>Cluster Info</b> area, apply the required configuration details.</li>
		<li>In the <b>Cluster schema</b> box, specify the SLA definitions (cluster topology):
		<ul>
			<li><b>None</b> - A standalone Space.</li>
			<li><b>Partitioned</b> - A cluster that is partitioned across the instances that are specified.</li>
			<li><b>Sync_replicated</b> - A cluster with synchronous replication across the instances that are specified.</li>
			<li><b>Async_replicated</b> - A cluster with asynchronous replication across the instances that are specified.</li>
		</ul>
		<li>In the <b>Number of Instances</b> box, specify the number of primary Space instances to deploy in the cluster.</li>
		<li>(For partitioned clusters) In the <b>Number of Backups</b> box, define the number of backup Spaces for each primary Space.</li>
		<li>In the <b>Max Inst. per VM</b> box, define the maximum number of Space instances each virtual host may contain (the default is 1).</li>
		<li>In the <b>Max Inst. per VM</b> box, define the maximum number of Space instances each physical host may contain.</li>
		<li>If you have more than one host, you can specify on which host to deploy the primary Space instances.</li>
		</li>
	</ol>	
	
1. (Optional) If you want to use a configuration file to specify the SLA definitions, or if you want to override your defined SLA definitions in specific scenarios, click **Next**. 
1. Click the **Browse** button next to the **SLA override** box and select the sla.xml file that you want to use.
1. If your environment contains zones, you can do one of the following:


	<ol type="a">
		<li>Select the <b>Select Zone</b> option and:
      <ul>
        <li>From the list on the left, select which zone to use for the -zone deployment parameter.</li>
        <li>In the <b>Max. Instances (partitions) number</b> area on the right, define the maximum instances per zone (`-max-instances-per-zone` deployment parameter).</li>
      </ul>
    </li>
		<li>If you don’t want to specify a zone, select <b>Any Zone</b>.</li>
  </ol>
	
1. Click **Deploy**.

{{%/tab%}}


{{%tab "GigaSpaces Management Center"%}}

Refer to the [GigaSpaces Management Center](./gigaspaces-management-center.html) topics in the Administration section.

{{%/tab%}}


{{%tab "Administration API"%}}
Refer to the [Admin API](../dev-java/administration-and-monitoring-overview.html) topics in the Developer Guide.
{{%/tab%}}

{{% /tabs %}}

