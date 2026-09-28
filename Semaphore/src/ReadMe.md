# Smart Laundry Facility Simulation

**Module:** Concurrent Programming (CT074-3-2)
**Student:** Lucky Rajkarnikar (NP070226)
**Language:** Java (Swing GUI)

## What is this?

A simulation of a self-service laundromat. **50 customers**, each running as its own **thread**, compete for a limited set of machines:

| Resource | Count |
|---|---|
| Washers | 6 |
| Dryers | 4 |
| Payment kiosks | 2 |

Every customer goes through the same pipeline: **Arrive → Wash → Dry → Pay → Leave**.
If every machine of a type is busy, the customer waits. The simulation runs for about 2 minutes.

## Timings and failures

| Step | Time | Failure |
|---|---|---|
| Arrival | random 0-3 s apart | none |
| Washing | 4-6 s | 5% chance, re-wash on the same machine |
| Drying | 3-5 s | none |
| Payment | 1-2 s | 5% chance, retry after 2 s |

## Concurrency tools used

| Tool | Where | Why |
|---|---|---|
| `ExecutorService` (fixed pool of 50) | `Main` | Manages the customer threads |
| `Semaphore(n, true)` (fair) | `LaundryFacility` | Limits how many customers use each machine type, first come first served |
| `synchronized` block | `LaundryFacility` | Picks a free machine ID safely, so no double-booking |
| `AtomicInteger` / `AtomicLong` + CAS | `SimulationMetrics` | Lock-free, accurate statistics |
| `volatile` | `LaundryFacility` | Every thread sees the kiosk outage instantly |
| `ReentrantLock` + `Condition` | `OwnerArrivalEvent` | Holds waiting customers, then releases them all |
| `CountDownLatch` | `Main` / `Customer` | Main waits until all 50 customers are done |
| `CopyOnWriteArrayList` | `LaundryLogger` | Thread-safe list of log listeners |
| `ThreadLocalRandom` | `FailureSimulator` | Random numbers with no thread contention |
| `SwingUtilities.invokeLater` + `javax.swing.Timer` | `LaundryGUI` | Keeps all GUI updates on the Event Dispatch Thread |

## Requirements

- **Basic:** customer threads, washing, drying and payment stages
- **Additional:** mutual exclusion, error handling, statistics, visible concurrency, about 2 minute run
- **Bonus:** congested scenario (both kiosks fail, the owner arrives after 30 customers are waiting) and a live GUI dashboard
- **Not met:** none

## Project structure

```
com.laundry
├── Main.java               Starts everything, thread pool, latch
├── Customer.java           One customer's full lifecycle (Runnable)
├── LaundryFacility.java    Semaphores, machine claiming, outage flag
├── SimulationMetrics.java  Atomic statistics
├── FailureSimulator.java   5% washer and kiosk failures
├── OwnerArrivalEvent.java  Congestion bonus (Lock + Condition)
├── LaundryLogger.java      Thread-safe, tagged logging
├── MetricsReporter.java    Final report
└── gui/
    └── LaundryGUI.java     Live Swing dashboard
```

## How to run

1. Open the project in IntelliJ IDEA.
2. Run `Main.java`.
3. The dashboard opens and the log prints in the console.
4. When all 50 customers are served, the final report is printed.

## What to watch for

- Several machines busy at the same time, never more than 6 washers, 4 dryers or 2 kiosks.
- Every log line is tagged with the thread that wrote it, like `[Customer-07]`.
- Both kiosks fail, customers queue up to 30, then the owner arrives and releases them.
- The run finishes with **50 / 50 customers served**.