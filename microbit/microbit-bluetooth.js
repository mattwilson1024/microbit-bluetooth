let speed = 500;
let message = "";
let connected = 0

// Listen for bluetooth connections and show tick icon on connection
// When a message is received, set the flash speed and show it on the display
bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    connected = 1
    while (connected == 1) {
        message = bluetooth.uartReadUntil(":")
        speed = parseInt(message)
        basic.showNumber(speed, 50)
        basic.showIcon(IconNames.Yes)
    }
})

// When client disconnects, show a cross icon
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    connected = 0;
})

// Show a smiley face first to show that everything is setup
basic.showIcon(IconNames.Happy)
basic.pause(500)

// Flash the LED and alternative icons on the screen
basic.forever(function () {
    if (connected) {
        // basic.showIcon(IconNames.House)
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(speed)
        // basic.showIcon(IconNames.StickFigure)
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(speed)
    }
})