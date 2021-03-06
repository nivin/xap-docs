---
type: post123
title:  Tableau Integration
categories:  XAP123, IEE
parent: sql-query-intro.html
weight: 300
canonical: auto
---

# Overview

Organizations often require quick insight into data to understand the business impact, and don't want to waste valuable time consulting their corporate IT team. With the [In-Grid SQL Query](./sql-query-intro.html) feature,
this can be done using the data stored in the XAP in-memory data grid. [Tableau](https://www.tableau.com/) can be connected to the XAP data grid via an ODBC-JDBC gateway, in order to retrieve and present the required data in a visual format.

This topic describes how to set up a demo integration of Tableau with InsightEdge in a Microsoft Windows environment, so that the In-Grid SQL Query can be used to retrieve data and display it in a graphic visual representation.

## Architecture

Tableau can connect to the XAP data grid using the SQL-99-compatible JDBC driver that is provided with the In-Grid SQL Query feature. However, Tableau can only use ODBC as a general connection option, so a third-party ODBC-JDBC connection is required to convert ODBC requests from Tableau into JDBC requests for the InsightEdge JDBC driver. The Easysoft ODBC-JDBC gateway has been evaluated and certified for use with InsightEdge, and is used in the sample integration. 

<img src="/attachment_files/sbp/tableau/diagram.png" width=386" height="134" />
 
## Sample Data Set

In this example, a familiar `Simple - Superstore` Tableau users data set is used. The original schema is too simple to show the join capabilities, so some additions were made to the model, namely that location information is referenced by the orders entity. The updated schema is as follows:
  
<img src="/attachment_files/sbp/tableau/schema.png" width=389" height="151" />

# Integrating Tableau with InsightEdge

In order to integrate Tableau with InsightEdge, you must have a XAP data grid that is up and running, and you need access to it. The InsightEdge platform includes XAP as a core component. After you set up and start your InsightEdge application, you must add sample data to a Space, for use with the demo.

After InsightEdge has been configured, you can download and install the ODBC-JDBC gateway, activate it with a trial license, and set it up in Microsoft Windows.

Lastly, download and configure Tableau to work with InsightEdge via the ODBC-JDBC gateway. At this point you can perform a query on the data grid via Tableau, and view the results.

## Configuring InsightEdge Locally

Before you deploy the data grid for the purpose of this demo, you should install the InsightEdge [dependencies](../started/insightedge-first-app.html#project-dependencies).

### Deploying the Data Grid

The first step is deploying a XAP data grid and creating a Space for the demo.

**To deploy the data grid on a local machine:**

1. Run ${XAP_HOME}\tools\installmavenrep.bat script.
1. Run ${XAP_HOME}\insightedge\tools\maven\insightedge-maven.cmd script.
1. Navigate to the `$XAP_HOME\bin` directory and launch a cmd window.
1. Type `insightedge host run-agent --auto --gsc=2` to create a XAP data grid.
1. Type `insightedge space deploy --partitions=2 tableauSpace` to create a Space with the name `tableauSpace`.  

### Populating the Space

After the Space is created, it needs to be populated with sample data, so that you can later run queries on this data via Tableau.

**To populate the Space with data:**

1. Download [this file](/download_files/sbp/xap-sql-demo.rar) and unpack it.
1. Under the extracted "xap-sql-demo" folder, build the sample with `mvn clean install`.
1. Execute the following command:

	```bash
	java -jar target\xap-sql-demo.jar --space-url "jini://*/*/tableauSpace?locators=127.0.0.1" --lookup-group <DATA_GRID_LOOKUP_GROUP>
	```
1. Substitute the value `<DATA_GRID_LOOKUP_GROUP>` with the appropriate value for your deployment. The lookup-group argument is optional.
1. View the objects in the Space to verify that the data populated as expected.

	<img src="/attachment_files/sbp/tableau/xap_1.png" width=371" height="68" />

### Adding the XAP JDBC Client JAR to the Classpath

When connecting to the data grid, the ODBC-JDBC gateway runs the XAP JDBC custom driver. In order to make the driver visible to the ODBC-JDBC gateway, you have to create a special JAR file for use when configuring the gateway in Microsoft Windows.

**To generate the XAP JDBC Client JAR:**

1. Navigate to `${XAP_HOME}\insightedge\tools\jdbc`.
1. Run the `build-xap-jdbc-client.cmd` script to create the file `xap-jdbc-client.jar`. 

	
## Setting Up the ODBC-JDBC Connection

Follow these instructions to download, install, and set up the Easysoft ODBC-JDBC gateway.

{{%note%}}
If you don't want to use the Easysoft ODBC-JDBC Gateway, you can run the demo using your preferred bridge implementation.
{{%/note%}}

### Installing the Easysoft ODBC-JDBC Gateway

**To download and install the Easysoft ODBC-JDBC gateway:**

1. Log in to the Easysoft web site: {{%exurl "link""http://www.easysoft.com/cgi-bin/account/login.cgi"%}}. (If this is your first time working with Easysoft, first follow the instructions to register and create your Easysoft user account.)
	
1. {{%exurl "Download ""https://www.easysoft.com/products/data_access/odbc_jdbc_gateway/index.html"%}} the gateway from the Easysoft website.
1. Install the gateway on your local machine.

### Requesting an EasySoft License

After you install the Easysoft gateway on your machine, you have to request a trial license in order to run the application.

**To obtain a trial Easysoft license for the ODBC-JDBC gateway:**

1. Navigate to `<EASYSOFT-HOME>\Easysoft\License Manager` and open the Easysoft Data Access License Manager.
1. Complete the following:

	- Provide your Easysoft account information: `Name`, `E-Mail Address`, `Company`, `Telephone`
	- Click **Request License**.  
	- Select the license type (**Trial**).
	- Click **Next**.

	<img src="/attachment_files/sbp/easysoft/easysoft_data_license_manager_1.png" width=451" height="396" />

1. From the dropdown list, select **Easysoft ODBC-JDBC Gateway (Desktop)(2.5)**, then click **Next**.

	<img src="/attachment_files/sbp/easysoft/easysoft_data_license_manager_2.png" width=452" height="148" />
 
1. Review your contact information to verify that it is correct, and click **On-line Request**.

	<img src="/attachment_files/sbp/easysoft/easysoft_data_license_manager_3.png" width=352" height="247" />
	
Look in your email spam section for the license.
At this point, your user account is updated and you have access to the ODBC-JDBC gateway software for the duration of the trial license period.

### Configuring the ODBC-JDBC Gateway

After you have installed the gateway software and obtained a trial license, you have to configure the gateway to point to the required data source.

**To configure the ODBC-JDBC gateway:**

1. Navigate to the ODBC Data Source Administrator in Microsoft Windows.

{{%note%}}
For instructions on how to access the ODBC Data Source Administrator, see this [Microsoft help topic]( https://docs.microsoft.com/en-us/sql/odbc/admin/odbc-data-source-administrator).
{{%/note%}}
	
1. On the right-hand side of the ODBC Data Source Administrator window, go the System Data Sources tab, click **Add**.

	<img src="/attachment_files/sbp/easysoft/odbc_data_source_administrator_1_3.png" width=478" height="339" />

1. In the Create New Data Source dialog that opens, click **Easysoft ODBC-JDBC Gateway**.

	<img src="/attachment_files/sbp/easysoft/odbc_data_source_administrator_2_1.png" width=373" height="284" />
  
1. Click **Finish**.
1. In the Easysoft ODBC-JDBC Gateway DSN Setup window that is displayed, configure the gateway access to the data source by filling in the fields with the following values:

	- DSN: **easysoft-xap-odbc-jdbc**
	- Driver Class: **com.gigaspaces.jdbc.Driver**
	- Class Path: Leave field empty
	- **IMPORTANT** - edit the CLASSPATH environment variable and append to it the path to your xap-jdbc-client.jar file. Create the CLASSPATH environment variable if it doesn't exist.

	<img src="/attachment_files/sbp/easysoft/odbc_data_source_environment_variable_2_1.png" width=373" height="284" />

	- URL: **jdbc:xap:url=jini://\*/\*/tableauSpace?locators=127.0.0.1**

1. Check the **Strip Quote** check box.

	<img src="/attachment_files/sbp/easysoft/odbc_data_source_administrator_3_1.png" width=366" height="406" />
 
1. Click **Test** to verify the new connection.

	<img src="/attachment_files/sbp/easysoft/odbc_data_source_administrator_4.png" width=322" height="105" />

1. Click **OK** in the confirmation message, and click **OK** in the Easysoft ODBC-JDBC Gateway DSN Setup window to save your changes.
1. Click **OK** in the ODBC Data Source Administrator window.


## Setting Up Tableau

Download and install [Tableau](https://www.tableau.com/) desktop.

After the XAP data grid has been populated with the sample data, and the ODBC-JDBC Gateway has been configured to connect to InsightEdge, you can configure Tableau to read the data and display it in a graphic visual format. You can then query the data grid and see the activity that occurs under the hood when Tableau accesses XAP as a SQL database and reads the requested data. 

### Configuring the Data Source

Tableau has to be configured to use the ODBC-JDBC gateway as the data source.

**To configure the ODBC-JDBC gateway:**

1. Start Tableau.
1. Click Connect in the Tableau desktop, and select **Other Database (ODBC)** as the data source.

	<img src="/attachment_files/sbp/tableau/tableau_0.png" width=243" height="245" />

1. In the Other Databases (ODBC) window, configure the options as follows:	

	a. In the **Connect Using** area, defin the DSN:
	- Select **easysoft-xap-odbc-jdbc**
	- Click **Connect**.

	b. In the *Connection Attributes** area, provide the name of the database:
	
	- In the **Database** field, type **space**.

1. Click **Sign In**.
 
	<img src="/attachment_files/sbp/tableau/tableau_2_1.png" width=310" height="496" /> 

1. Under **Connections**, click the search icon in the **Schema** area and select **space**.

{{%note%}}
The sample data for this demo contains a Space called **space**. If you have additional Spaces in your InsightEdge environment, they may appear in this list.
{{%/note%}}

<img src="/attachment_files/sbp/tableau/tableau_3.png" width=213" height="267" /> 
 
1. Verify that Tableau can see the sample data by peforming a table search.  You should see **Locations** and **Orders** in the list of tables.

	<img src="/attachment_files/sbp/tableau/tableau_1.png" width=229" height="155" />  

### Querying the Data Grid

Before performing a query on the data grid, you can use the GigaSpaces Management Center to look at the Space that contains the sample data. At this point, there have been no read operations.

<img src="/attachment_files/sbp/tableau/xap_2.png" width=500" height="324" /> 
 
Everything that needs to be configured has been set up, and you can execute queries against the data in the grid.

**To query the data in InsightEdge:**

1. From the Data tab, drag and drop the **Orders** and **Locations** tables to the data pane.
1. Join the tables as **Inner**.

	<img src="/attachment_files/sbp/tableau/tableau_2.png" width=595" height="346" /> 
 
1. Below the data pane, select the **Sheet1** tab.
1. Select **Country** and **State** from the **Locations** node using standard Windows functionality (press the **Ctrl** key while selecting).
1. Right click and select **Create Hierarchy** from the menu that is displayed.

	<img src="/attachment_files/sbp/tableau/tableau_4.png" width=338" height="347" />  
 
1. Double-click **State**.
1. From the **Measures** area, drag and drop **Sales** to the Size option in the Marks card, and **Profit** to the Color option.
1. View the results in the data pane; you can easily see the sales-profit insight that was derived from the data retrieved from the XAP data grid.

	<img src="/attachment_files/sbp/tableau/tableau_5.png" width=770" height="388" />

1. In the GigaSpaces Management Center, view the Space operations statistics. You can see the read operations that were performed when Tableau accessed the XAP data grid to construct the view:

	<img src="/attachment_files/sbp/tableau/xap_3.png" width=757" height="392" />

 

 
