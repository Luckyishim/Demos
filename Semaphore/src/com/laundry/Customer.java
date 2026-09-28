/**
 * Customer.java — Single Customer Thread (Runnable).
 *
 * Responsibilities:
 * - Implements Runnable; each instance represents one customer's full lifecycle.
 * - Lifecycle: Arrive → Wash (4-6s, 5% fail/retry) → Dry (3-5s) →
 *   Pay (1-2s, 5% fail/retry) → Done.
 * - Logs every state transition via LaundryLogger with customer ID.
 */
package com.laundry;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public class Customer implements Runnable {

    private final int customerId;
    private final LaundryFacility facility;
    private final SimulationMetrics metrics;
    private final CountDownLatch latch;

    public Customer(int customerId, LaundryFacility facility,
                    SimulationMetrics metrics, CountDownLatch latch) {
        this.customerId = customerId;
        this.facility   = facility;
        this.metrics    = metrics;
        this.latch      = latch;
    }

    @Override
    public void run() {
        long startTime = System.currentTimeMillis();
        String tag = tag();

        try {
            LaundryLogger.log(tag, "Arrived at laundry facility");

            // --- WASH phase ---
            int washerId = facility.acquireWasher();
            LaundryLogger.log(tag, "Acquired Washer " + (washerId + 1));
            boolean washSuccess = false;
            while (!washSuccess) {
                long washTime = ThreadLocalRandom.current().nextLong(4000, 6001) ;
                TimeUnit.MILLISECONDS.sleep(washTime);
                if (FailureSimulator.rollWasherFailure()) {
                    LaundryLogger.log(tag, "Washer " + (washerId + 1) + " failed! Re-washing...");
                } else {
                    washSuccess = true;
                }
            }
            facility.releaseWasher(washerId);
            LaundryLogger.log(tag, "Released Washer " + (washerId +1));

            // --- DRY phase ---
            int dryerId = facility.acquireDryer();
            LaundryLogger.log(tag, "Acquired Dryer " + (dryerId + 1));
            long dryTime = ThreadLocalRandom.current().nextLong(3000, 5001);
            TimeUnit.MILLISECONDS.sleep(dryTime);
            facility.releaseDryer(dryerId);
            LaundryLogger.log(tag, "Released Dryer " + (dryerId + 1));

            // --- PAY phase ---
            int kioskId = facility.acquireKiosk();
            LaundryLogger.log(tag, "Acquired Kiosk " + (kioskId + 1));
            boolean paySuccess = false;
            while (!paySuccess) {
                long payTime = ThreadLocalRandom.current().nextLong(1000, 2001);
                TimeUnit.MILLISECONDS.sleep(payTime);
                if (FailureSimulator.rollKioskFailure()) {
                    LaundryLogger.log(tag, "Kiosk " + (kioskId + 1) + " payment failed — retrying in 2s");
                    TimeUnit.SECONDS.sleep(2);
                } else {
                    paySuccess = true;
                }
            }
            facility.releaseKiosk(kioskId);
            LaundryLogger.log(tag, "Released Kiosk " + (kioskId + 1));

            // --- DONE ---
            long elapsed = System.currentTimeMillis() - startTime;
            metrics.recordCustomerServed(elapsed);
            LaundryLogger.log(tag, String.format("Done in %.1fs", elapsed / 1000.0));

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            LaundryLogger.log(tag, "Interrupted!");
        } finally {
            latch.countDown();
        }
    }

    private String tag() {
        return String.format("Customer-%02d", customerId);
    }
}
