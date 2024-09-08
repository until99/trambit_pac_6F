Nomes: Gustavo Henrique Costa,
	   Lucas Mendes Israel,
     Gabriel Kasten
     
Projeto: Estufa Iot

Visão Geral do projeto:

O projeto "Estufa IoT" consiste em uma aplicação de Internet das Coisas (IoT) integrada com Inteligência Artificial (IA) para otimizar o ambiente de uma estufa agrícola. O objetivo principal é monitorar e ajustar as condições ambientais, como umidade, temperatura e qualidade do ar, usando uma variedade de sensores e algoritmos de IA. Isso permite uma gestão mais eficiente do microclima dentro da estufa, essencial para a saúde e crescimento ótimo das plantas. A solução proposta visa não apenas melhorar a qualidade dos cultivos, mas também reduzir o desperdício de recursos e aumentar a eficiência da produção agrícola.

Funcionamento:

O projeto utilizará uma série de sensores conectados a um microcontrolador Arduino para capturar dados ambientais em tempo real, como luminosidade, temperatura, umidade do ar, umidade do solo e qualidade do ar. Esses dados serão coletados por requisição para a parte server-side do projeto, onde serão armazenados em um banco de dados e processados. Utilizando algoritmos de IA, como regressão linear e detecção de anomalias, o sistema será capaz de analisar os dados históricos e prever as condições futuras, além de identificar leituras que fogem do padrão esperado. Com base nessa análise, o sistema poderá ajustar automaticamente as condições dentro da estufa ou alertar os usuários sobre possíveis problemas através de uma interface web. Os Sensores:

•	Sensor de Luminosidade (LDR): Mede a intensidade da luz disponível.

•	Sensor de Temperatura e Umidade (DHT22): Monitora a temperatura e a umidade do ar.

•	Sensor de Umidade do Solo (FC-28): Verifica a umidade do solo.

•	Sensor de Qualidade do Ar (MQ-135): Avalia a qualidade do ar, detectando gases como CO2.

Fluxo de Informações:

O fluxo de informações no projeto se inicia com a captura de dados pelos sensores. Esses dados são enviados ao Arduino e de lá, por meio de requisições, são transmitidos para o lado server-side do projeto. Assim, os dados são recebidos e gerenciados por controladores que direcionam as informações para armazenamento no banco de dados. Posteriormente, módulos de análise preditiva processam esses dados, aplicando algoritmos de IA para previsão e detecção de condições anormais. Os resultados dessas análises são disponibilizados através de rotas HTTP, permitindo a visualização e o monitoramento em tempo real pelo usuário por meio da interface web.

Requisitos funcionais do projeto:

•	O sistema deve monitorar em tempo real as condições de luminosidade, temperatura, umidade do ar, umidade do solo e qualidade do ar dentro da estufa utilizando sensores específicos (LDR, DHT22, FC-28, MQ-135);

•	Os dados coletados pelos sensores devem ser armazenados em um banco de dados para posterior análise e consulta;

•	O sistema deve ser capaz de aplicar algoritmos de IA para prever condições futuras na estufa, como temperatura, umidade e qualidade do ar, utilizando técnicas de regressão linear;

•	O sistema deve identificar leituras de sensores que fogem do padrão esperado, utilizando algoritmos de detecção de anomalias;

•	O sistema deve classificar as condições detectadas como ruins, boas ou ótimas e enviar alertas apropriados com base nas classificações;

•	O sistema deve fornecer uma interface web que permita aos usuários visualizarem as condições ambientais em tempo real, assim como o histórico dos dados;

•	O sistema deve ajustar automaticamente as condições dentro da estufa com base nos dados analisados, quando necessário;

•	Deve haver rotas HTTP disponíveis para visualização e armazenamento dos dados coletados pelos sensores;

•	O sistema deve ser capaz de se comunicar e receber dados do Arduino utilizando o Ethernet Shield para envio dos dados ao servidor

Requisitos Não Funcionais do projeto:

•	Os sensores devem ser calibrados com precisão para garantir a confiabilidade dos dados coletados;

•	O sistema deve ser capaz de processar e analisar grandes volumes de dados em tempo real sem degradação significativa do desempenho;

•	O sistema deve ser escalável para suportar a adição de mais sensores ou módulos de análise conforme a necessidade;

•	A interface web deve ser intuitiva e fácil de usar, permitindo que usuários sem conhecimento técnico possam monitorar as condições da estufa e entender os alertas;

•	O código do sistema deve ser bem documentado e modular para facilitar futuras manutenções e atualizações;

•	O sistema deve integrar-se perfeitamente com os componentes de hardware e software, garantindo comunicação fluida entre eles.

Arquitetura do projeto:
 ![image](https://github.com/user-attachments/assets/f84dd346-3309-4e83-84f5-85abf5cd9865)

Interface Visual Base do Projeto: 
![image](https://github.com/user-attachments/assets/95c39dea-dc86-4b97-9971-4d73bb130e5a)
