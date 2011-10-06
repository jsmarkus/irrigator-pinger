# Remote irrigation device pinger

This project is made to illustate possibilities of asynchronous I/O.

Well, it is a task I got during my interview.

## Emulator

**Emulator** is a simple TCP-server that emulates a remote irrigation controller.

In this experiment an emulator actually represents several devices.
Each can run on its own `host:port`, see `emulator/dev-config.js`.

## Pinger

**Pinger** is a TCP client utility to check a number of device instances.

Pinger sends string 'connect_1', then waits for `0x55` byte from device.
The connections to devices are made asynchronously, so response waiting
stage does not freeze the client process and several checks at once are
possible.
