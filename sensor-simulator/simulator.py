import random
import time
import requests
from datetime import datetime

import os

API_URL = os.getenv("API_URL", "http://backend:5000/api/sensors")

SENSORS = ["sensor_001", "sensor_002", "sensor_003"]


def generate_reading(sensor_id):
    """
    Generate one fake sensor reading.
    Most values will be normal, but sometimes warning/critical values appear.
    """
    scenario = random.choices(
        population=["normal", "warning", "critical"],
        weights=[70, 20, 10],
        k=1
    )[0]

    if scenario == "normal":
        temperature = round(random.uniform(30, 55), 2)
        pressure = round(random.uniform(70, 95), 2)
        vibration = round(random.uniform(20, 45), 2)
    elif scenario == "warning":
        temperature = round(random.uniform(61, 75), 2)
        pressure = round(random.uniform(101, 115), 2)
        vibration = round(random.uniform(51, 65), 2)
    else:
        temperature = round(random.uniform(81, 95), 2)
        pressure = round(random.uniform(121, 135), 2)
        vibration = round(random.uniform(71, 85), 2)

    return {
        "sensor_id": sensor_id,
        "temperature": temperature,
        "pressure": pressure,
        "vibration": vibration
    }


def send_reading(reading):
    """
    Send a reading to the backend API.
    """
    try:
        response = requests.post(API_URL, json=reading, timeout=5)
        response.raise_for_status()
        data = response.json()

        print(
            f"[{datetime.now().strftime('%H:%M:%S')}] "
            f"Sent {data['sensor_id']} | "
            f"T={data['temperature']} | "
            f"P={data['pressure']} | "
            f"V={data['vibration']} | "
            f"Status={data['status']}"
        )
    except requests.exceptions.RequestException as error:
        print(f"Error sending reading: {error}")


def run_simulator():
    """
    Continuously generate and send readings for all sensors.
    """
    print("Starting sensor simulator...")
    print("Sending data to backend every 3 seconds.\n")

    while True:
        for sensor_id in SENSORS:
            reading = generate_reading(sensor_id)
            send_reading(reading)

        time.sleep(3)


if __name__ == "__main__":
    run_simulator()