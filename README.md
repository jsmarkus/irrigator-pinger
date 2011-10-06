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

## Usage

1. Install node.js 0.4.11 or later.

2. Under UNIX - go to this directory and type:

    ./emulator

This will run emulation servers.

3. Open new console and type:

    ./pinger

This will run pinger.

## Configuration

Currently you can configure a set of `host:port` values.

Go to `lib/pinger/dev-config.js` to set up servers you want to check.

Go to `lib/emulator/dev-config.js` to set up devices you want to emulate.

## Check algorythm

The client connects to the server.

The client sends command `connect_1\n`.

If server responds with byte `0x55` during 10s timeout the server is considered alive.

Otherwise - or in case of connection refused - the server is considered dead.

Connections to all servers are made simultaneously.
This is achived by asynchronous architecture of Node.js, that means that
every long-running I/O operation is made by OS with corresponding
callbacks to main process in case of operation success or failure.

## Production

The system is production ready.

You can modify `pinger` to handle report data as you wish.

You can modify `lib/pinger/client` to match real-life device protocol.
