async function get_sensors_data() {
    try {
        fetch("https://trambit-pac-6f.onrender.com/list-data")
        .then(response => {
            console.log("Response: " + json);
            response.json();
        })
        .then(data => {
            console.log("Data: "+ data)
        })
    }
    catch {
        console.error("Failed to retrive sensor data");
    }
}