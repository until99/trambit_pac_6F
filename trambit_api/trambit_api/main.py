import httpx
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# URL da API para obter dados
url = "https://hell.pockethost.io/api/collections/trambit_pac_6F/records?perPage=500"
# URL de destino para enviar previsões
ai_url = "https://hell.pockethost.io/api/collections/trambit_pac_6F_AI/records"


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
async def return_sensor_data():
    """Retorna os dados de todos os sensores e faz previsão para o próximo dia, enviando as previsões para a URL de AI, página por página."""
    page = 1
    totalPages = 1

    async with httpx.AsyncClient() as client:
        while page <= totalPages:
            # Faz a requisição GET para a página atual
            response = await client.get(url, params={'page': page})
            print(f"Requisição para página {page}: Status {response.status_code}")

            if response.status_code != 200:
                print("Erro na requisição:", response.text)
                return jsonify({"error": "Erro ao buscar dados"}), 500

            try:
                data = response.json()
            except ValueError:
                print("Erro ao parsear a resposta JSON:", response.text)
                return jsonify({"error": "Erro ao parsear a resposta da API"}), 500

            # Organiza os dados da página para a previsão
            if 'items' in data:
                page_data = data['items']
                sensor_data = {}

                # Organiza os dados por sensor
                for record in page_data:
                    sensor_id = record.get("ds_sensor")
                    sensor_value = record.get("nr_sensor_value")
                    timestamp = record.get("created")

                    if sensor_id and sensor_value and timestamp:
                        timestamp = datetime.fromisoformat(timestamp.rstrip("Z"))

                        if sensor_id not in sensor_data:
                            sensor_data[sensor_id] = []

                        sensor_data[sensor_id].append((timestamp, sensor_value))

                # Faz a previsão para cada sensor e envia para o AI
                for sensor_id, records in sensor_data.items():
                    df = pd.DataFrame(records, columns=["timestamp", "value"])
                    df["timestamp"] = pd.to_datetime(df["timestamp"])
                    df["timestamp"] = df["timestamp"].apply(lambda x: (x - df["timestamp"].min()).days)

                    X = df["timestamp"].values.reshape(-1, 1)
                    y = df["value"].values

                    # Ajusta o modelo de regressão linear
                    model = LinearRegression()
                    model.fit(X, y)

                    # Faz a previsão para o próximo dia
                    next_day = (df["timestamp"].max() + 1).reshape(-1, 1)
                    predicted_value = model.predict(next_day)

                    # Prepara os dados da previsão para o envio
                    prediction_data = {
                        "ds_sensor": sensor_id,
                        "nr_sensor_value": predicted_value[0]
                    }

                    # Envia a previsão para o AI
                    ai_response = requests.post(ai_url, json=prediction_data)
                    if ai_response.status_code == 200:
                        print(f"Previsão enviada com sucesso para o sensor {sensor_id}!")
                    else:
                        print(f"Erro ao enviar previsão para o sensor {sensor_id}: {ai_response.status_code} - {ai_response.text}")

            # Atualiza o número total de páginas
            totalPages = data.get('totalPages', 1)
            page += 1

    return jsonify({"message": "Processamento de dados concluído."}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
