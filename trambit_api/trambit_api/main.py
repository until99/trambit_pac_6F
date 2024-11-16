from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Configurações da URL de destino
url = "https://hell.pockethost.io/api/collections/trambit_pac_6F/records"


@app.route("/health", methods=["GET"])
def health_check():
    """Verifica a saúde do servidor."""
    return jsonify({"message": "OK"}), 200


@app.route("/sensors", methods=["POST"])
def receive_sensors_data():
    """Recebe os dados de todos os sensores e envia para a URL configurada."""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Nenhum dado recebido"}), 400

    print("Dados recebidos:", data)

    response = requests.post(url, json=data)

    if response.status_code == 200:
        print("Dados enviados com sucesso")
    else:
        print(
            f"Erro ao enviar dados para a nova rota: {response.status_code} - {response.text}"
        )

    return jsonify({"message": "Dados recebidos e enviados"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
