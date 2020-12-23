/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrobitService {

  private UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  private UART_RX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

  private textEncoder = new TextEncoder();

  private device: BluetoothDevice;
  private connection: BluetoothRemoteGATTServer;
  private uartRxCharacteristic: BluetoothRemoteGATTCharacteristic;

  public isConnected$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public async connect(): Promise<void> {
    this.device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [
        this.UART_SERVICE_UUID
      ]
    });
    console.log(`Device`, this.device);

    this.connection = await this.device.gatt.connect();
    console.log(`Connection`, this.connection);

    const service = await this.connection.getPrimaryService(this.UART_SERVICE_UUID);

    this.uartRxCharacteristic = await service.getCharacteristic(this.UART_RX_CHARACTERISTIC_UUID);
    console.log(`Service`, service);
    console.log(`Characteristic`, this.uartRxCharacteristic);

    this.isConnected$.next(true);
  }

  public async sendMessage(message: string): Promise<void> {
    if (this.isConnected$.value) {
      const encodedMessage = this.textEncoder.encode(`${message}:`);
      await this.uartRxCharacteristic.writeValue(encodedMessage);
    }
  }
}
