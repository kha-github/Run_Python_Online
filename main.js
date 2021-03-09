const { PythonShell } = require("python-shell");
let options = {
    scriptPath: "",
    args: ["노원구", "value3", "value4"]
};

PythonShell.run("naverWeather.py", options, function(err, results) {
    if (err) throw err;

    let data = results[0].replace(`b\'`, '').replace(`\'`, '');
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString('utf-8');

    console.log(text);
});