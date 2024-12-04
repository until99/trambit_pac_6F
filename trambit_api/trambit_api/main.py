from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Configurações da URL de destino
url = "https://hell.pockethost.io/api/collections/trambit_pac_6F/records"


@app.route("/health", methods=["GET"])
def health_check():
    """Verifica a saúde do servidor."""
    return jsonify({"message": "OK"}), 200


@app.route("/sensors", methods=["POST"])
def receive_sensors_data():
    """Recebe os dados de todos os sensores, transforma no formato esperado e envia para a URL configurada."""
    # Obtém os dados do corpo da requisição
    data = request.get_json()

    # Validação dos dados recebidos
    if not data:
        return jsonify({"error": "Nenhum dado recebido"}), 400

    print("Dados recebidos:", data)

    # Transforma os dados no formato esperado
    formatted_data = []
    for sensor_name, sensor_value in data.items():
        formatted_data.append(
            {"ds_sensor": sensor_name, "nr_sensor_value": sensor_value}
        )

    print("Dados formatados para envio:", formatted_data)

    # Envio de cada sensor individualmente para a URL configurada
    for entry in formatted_data:
        response = requests.post(url, json=entry)
        if response.status_code == 200:
            print(f"Dados enviados com sucesso para o sensor {entry['ds_sensor']}!")
        else:
            print(
                f"Erro ao enviar dados do sensor {entry['ds_sensor']}: {response.status_code} - {response.text}"
            )

    return jsonify({"message": "Dados recebidos e enviados"}), 200


@app.route("/list-data", methods=["GET"])
def return_sensor_data():
    """Retorna os dados de todos os sensores"""
    response = requests.get("https://hell.pockethost.io/api/collections/trambit_pac_6F/records")

    if response.status_code == 200:
        data = response.json()

    if not data:
        return jsonify({"error": "Nenhum dado encontrado"}), 400

    return data, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
