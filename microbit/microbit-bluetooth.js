let connected = 0;
let speed = 0;
let message = "";

// Listen for bluetooth connections and show tick icon on connection
// When a message is received, set the flash speed and show it on the display
bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService();
    basic.showIcon(IconNames.Yes);
    basic.pause(500);
    connected = 1;
    speed = 0;
    while (connected == 1) {
        message = bluetooth.uartReadUntil(":");
        speed = parseInt(message);
        basic.showNumber(speed, 50);
        basic.showIcon(IconNames.Yes);
    }
})

// When client disconnects, show a cross icon
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No);
    connected = 0;
})

// Show a smiley face first to show that everything is setup
basic.showIcon(IconNames.Happy);
basic.pause(500);

// Flash the LED and alternative icons on the screen
basic.forever(function () {
    if (connected && speed) {
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P1, 0);
        basic.pause(speed);

        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P1, 1);
        basic.pause(speed);
    }
})

// Reset if the user presses button A
input.onButtonPressed(Button.A, function () {
  speed = 0;
  pins.digitalWritePin(DigitalPin.P0, 0);
  pins.digitalWritePin(DigitalPin.P1, 0);
})