---
type: post122
title:  Failover Considerations
categories: XAP122PROD
parent: none
weight: 700
canonical: auto
---

GigaSpaces applications provide continuous high-availability even when the infrastructure processes or entire (physical/virtual) machines fail. This capability is provided **out of the box** but does require some attention to configuration to meet the needs of your specific application.

# N+1 and N+2 Configurations

When determining the optimal high-availability configuration for your particular application, you have to balance the cost of additional hardware (or virtual machines) against the risk of downtime. In most cases, it pays to have additional resources available to avoid downtime, which can compromise system health and result in instability, poor reliability, no durability, and incompleteness.

The two most common XAP deployment configurations are referred to as **N+1** and **N+2**.  This refers to the number of machines running XAP that can fail without compromising the data grid and its applications, in order to continue delivering reasonable performance and to remain in good health.  In an **N+1** configuration, the core N machines have sufficient RAM and CPU power to run the application if one of the **N+1** machines fail.  In an **N+2** configuration, the same is true if two of the machines fail or become unavailable.

In either configuration, the data grid (or any deployed business logic) is distributed across all available machines.  Each machine hosts a set of GSCs and there are at least two GSMs and two LUSs running.  When deploying a regular (static) PU, you may have spare GSCs available on each machine to accommodate a failure. If a machine becomes unavailable, the backup PU instance corresponding to the primary nodes on that machine becomes the primary, and the GSM provisions a new backup instance in one of the spare GSCs.  In this case, you may have to call the rebalance utility to redistribute the primary and backups evenly across all GSCs. This failover is transparent to clients of the application, and to the business logic running within it.

When deploying an elastic PU, GSCs are created on the fly and missing PU instances will be provisioned into these newly started GSCs. In this case, the primary and backup instances are automatically distributed evenly across all machines. 

# Grid Failure Handling Strategy

When deploying your XAP-based system in production, you should consider the following failure handling strategies to determine which is the worst case scenario that should be taken into account for your specific environment. Your final failover plan should address, GSC, Machine/VM, and complete Data Center failure.

## Single GSC Failure

This is the simplest scenario to plan for, and is generally sufficent for small deployments that are not mission critical, and do not require continuous high-availability to survive multiple failures. The GSA will manage the GSC life-cycle locally or globally and accomadate GSC failure. This assumes you are using static PU deployment.

## Multiple GSC Failures

To accommodate a failure scenario that involves continuous operation if more than one GSC fails at a time, you should deploy your production environment using an Elastic PU. This method will initiate GSCs as needed on available VMs or hardware machines, enabling the system to survive multiple failures and support dynamic scaling.

## Complete VM/Machine Failure

In a scenario where an entire machine failing could be damaging to your system, deploy Elastic PU deployment and configure `XAP init.d setup`. This will initiate the GigaSpaces XAP agent when the failed machine restarts. 

{{%note "Note"%}}
The Cloudify platform can be used to automate XAP installation and configuration of the machine upon recovery.
{{%/note%}}

## Complete Data Center Failure

This is a catastrophic failure scenario and it is important to automate the recovery process as much as possible. Use Elastic PU together with `XAP init.d setup` in order to get machines up and running. Then perform data replication over the WAN using the WAN Gateway to restore the data.

{{%note "Note"%}}
The Cloudify platform can be used to automate XAP installation and configuration of the data center upon recovery.
{{%/note%}}

# Guaranteed Notifications

When using notifications (notify container, session messaging API), should enable Guaranteed Notifications to address a primary Space failure while sending notifications. This allows the backup (when promoted to a primary), to continue notification delivery. Guaranteed Notifications are managed on the client side. 

When considering a notify container that is embedded with the Space, note that guaranteed notifications are not supported in this scenario. This means that upon failure, notifications that have been send might not be fully processed. In this case, blocking read/asychronous read should be considered as an alternative to notifications.

# Balanced Primary-Backup Provisioning

To plan for failure of the data grid nodes or a machine running XAP, you should consider having even distribution of the primary and backup instances across all existing machines running XAP. This will ensure balanced CPU utilization across all XAP machines. The Elastic PU should be used to deploy the data grid, because it supports even primary/backup distribution automatically when a XAP machine fails and when a new one added to the grid. In this case, spare GSCs on each XAP machine are not required. 

# CPU Utilization

CPU utilization should not exceed 40% on average, to support complete machine/VM failure. This buffer will enable the machines running XAP to cope with the additional capacity required when one or more machines running the grid fail or go through maintenance.

# Local XAP Component Failure

## LUS

To enable failover on LUS (Lookup Service) failure, at least two LUSs should be started for redundancy. You can use global or local [LUS configuration](../admin/lus-configuration.html) to ensure that two LUS will be running.

When using a multicast discovery configuration, it is recommended to use the global LUS configuration to ensure that two LUS will run on two different machines, even if a machine running a LUS fails. When using a unicast lookup discovery configuration and a LUS fails, the clients and service grid components may throw exceptions because internally they are frequently trying to perform lookup discovery for the missing lookup.

You can configure the lookup discovery intervals using the `com.gigaspaces.unicast.interval` property.

## GSA 

The GSA acts as a process manager, watching the GSC, LUS, ESM, and GSM processes.  GSA failure is a very rare scenario. If it happens, you should look for unusual hardware, operating system, or JDK failure that may have caused it. To address GSA failure you should run it as a service so that the operating system will restart it automatically if it fails (see how you can run it as a Windows Service or a Linux Service).

## GSM 

The GSM is responsible for deployment and provisioning of deployed PUs(stateless, statefull). The GSM is utilized during deploymnt, PU failure, and PU migration from one GSC to another. To support high availability, you should have two GSMs started per grid. You can use either global or local [GSM configuration](../admin/gsm-configuration.html) to ensure that two GSM will be running. In most cases, global GSM configuration is recommended unless you require hot deploy functionality.

## ESM 

The ESM is responsible for Elastic PU provisioning when deployed, and rebalances Space instances if a PU scales up/down/in/out or when a GSA fails or starts. When the ESM fails, it is restarted automatically using one of the existing agents. 

# XAP Distributed Transactions

XAP Distributed Transactions involve a  remote or local XAP Distributed Transaction Manager and one or more data grid. With a remote Distributed Transaction Manager, you should consider running at least two remote transaction managers. It is recommended to use a local Distributed Transaction Manager as it makes the overall architecture simpler.

# XA Transactions

XA Transactions involves the XA transaction manager, XAP data grid node(s) and some additional participant(s). The transaction manager is usually deployed independently. The transaction manager can fail, so it should be deployed in a high availability configuration. Client code should support transaction manager failure by caching relevant transaction exceptions, and retrying the activity by aborting the old transaction, starting a new transaction, executing relevant operations and committing. tomikos and JBoss transaction managers are XAP certified and recommended.

# WAN Gateway Failure

The WAN gateway acts as a broker, and is responsible for replicating activities conducted in the local data grid in another (remote) data grid. The WAN Gateway does not hold state, so its failure does not result any data loss. However if it fails, data is not replicated between the source and destination data grid. The WAN Gateway does not have to be deployed in a cluster configuration (aka primary-backup). By default, XAP will try to start the WAN Gateway if it fails. The WAN Gateway is usually configured to use a specific port on specific machine(s), therefore you should configure the WAN Gateway PU to be provisioned on specific machine(s).

# Mirror Service Failure

The Mirror Service is like the WAN Gateway, acting as a broker. It is responsible for persisting activities conducted in the data grid into external data sources, such as a database.

The Mirror Service does not hold state, so its failure does not result in data loss. However, Mirror Service failure means data will not get stored in the external data source. The mirror does not have to be deployed in a cluster configuration (aka primary-backup). By default, XAP will try to start the Mirror Service if it fails. In many cases the Mirror Service accesses a database, which may be set to accept connections only from specific machines with specific ports. To address this, configure the database to allow connections from all machines that may run the Mirror Service, which is all XAP machines by default. 

# Split Brain 

{{%warning "Important"%}}
A partitioned Space topology with no backups should **not** be used in production. Running a XAP Space with no backups may cause split brain and data inconsistency issues.
{{%/warning%}}

