import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

// ✅ Export manager so the Screen can check if Bluetooth is 'PoweredOn'
export const manager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

export const liveSensorDataService = {
  connectToDevice: (onDataReceived: (data: any) => void) => {
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.error("Scan Error:", error.message);
        return;
      }

      if (device?.name === 'STACHY_NODE_01') {
        manager.stopDeviceScan();
        try {
          const connectedDevice = await device.connect();
          await connectedDevice.discoverAllServicesAndCharacteristics();
          
          connectedDevice.monitorCharacteristicForService(
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            (error, characteristic) => {
              if (characteristic?.value) {
                const decoded = Buffer.from(characteristic.value, 'base64').toString();
                onDataReceived(JSON.parse(decoded));
              }
            }
          );
        } catch (e) {
          console.error("Connection Error:", e);
        }
      }
    });
  }
};