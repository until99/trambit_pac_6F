from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Configurações da nova rota
url = "https://hell.pockethost.io/api/collections/trambit_pac_6F/records"


@app.route("/ldr", methods=["POST"])
def receive_data():
    data = request.get_json()

    ds_sensor = data.get("ds_sensor")
    nr_sensor_value = data.get("nr_sensor_value")

    print(f"Dados recebidos - Sensor: {ds_sensor}, Valor: {nr_sensor_value}")

    sensor_data = {"ds_sensor": ds_sensor, "nr_sensor_value": nr_sensor_value}

    response = requests.post(url, json=sensor_data)

    if response.status_code == 200:
        print("Dados enviados com sucesso para a nova rota!")
    else:
        print(
            f"Erro ao enviar dados para a nova rota: {response.status_code} - {response.text}"
        )

    return jsonify({"message": "Dados recebidos"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
