# ESP32 Sensor Readings => CSV
import serial
import csv
import time

port = 'COM13'
baud_rate = 9600

ser = serial.Serial(port, baud_rate, timeout=1)
time.sleep(2)

with open('sensor-data.csv', 'w', newline='') as csvfile:
    fieldnames = ['Ax', 'Ay', 'Az', 'Distance']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    print("Collecting data... Press CTRL+C to quit.")

    try:
        while True:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if line:
                print(f"Received: {line}")

                data = line.split(',')

                if len(data) == 4:
                    writer.writerow({
                        'Ax': data[0],
                        'Ay': data[1],
                        'Az': data[2],
                        'Distance': data[3],
                        'Severity': data[4]
                    })
                    csvfile.flush()
                else:
                    print("Data format error:", data)

    except KeyboardInterrupt:
        print("Data collection stopped.")

    finally:
        ser.close()
