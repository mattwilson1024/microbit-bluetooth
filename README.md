# microbit-bluetooth

This is an example of communicating via bluetooth between a web app and a BBC micro:bit device.

## Wiring

1. Connect LED1:
  - red wire from pin 1 -> resistor -> LED (positive leg)
  - black wire from LED negative leg -> GND
3. Connect LED2, sharing the same GND
  - red wire from pin 2 -> resistor -> LED (positive leg)
  - black wire from LED negative leg -> GND

## Setup and run Micro:bit program

1. Connect micro:bit device to computer with USB
2. Update the firmware to allow pairing (see https://support.microbit.org/support/solutions/articles/19000019131-upgrade-the-firmware-on-the-micro-bit)
3. Open the MakeCode editor (https://makecode.microbit.org/) and create a new project
4. Expand the `Advanced` section and click `Extensions`. Select `bluetooth` and click the `Remove extensions(s) and add bluetooth` button
5. Click the cog icon in the top right, then go to `Project Settings`. Enable `No Pairing Required: Anyone can connect via Bluetooth`
6. Click `JavaScript` at the top and paste in the code from `microbit/microbit-bluetooth.js` in this repo
7. Click the cog icon in the top right, then `Pair Device` and pair with the Microbit (note: requires latest firmware on the device for this to work).
8. Click `Download` to flash the program to the device. It should show a smiley face to show that it is ready.

## Run the web app

This repo contains an example web app built with Angular. In `src/microbit` there is a component which shows a simple form containing a slider to change the speed of the flashing LEDs. The most interesting part is `src/app/microbit/microbit.service.ts` which uses the Web Bluetooth API to connect to the micro:bit and send messages.

1. Install Node and Yarn
2. In the `web` directory, run the following to install dependencies and start the app
   ```
   yarn
   yarn start
   ```
3. Go to http://localhost:4200/
4. Click the `Connect` button and select the microbit in the device pairing pop up. On the Microbit LED display you should see a tick to signify that the connection is active. The LEDs should start to flash.
5. Move the slider to change the speed. This transmits a bluetooth message for example `400:` for 400ms delay between on/off states. The microbit reads until it sees a `:` character, parses the number to an int and sets the flash speed.