/* global process */
var http = require('http');
var express = require('express');
var RED = require('node-red');
var request = require('request');

var app = express();
app.use('/', express.static('public'));
var server = http.createServer(app);

var settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/api",
    userDir: './.nodered',
    functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(8000);
RED.start().then(initFlows);


function initFlows() {

    //READ From DB.
    var flows = [
        {
            "id": "d01ade6a.afa7e",
            "type": "mqtt-broker",
            "broker": "localhost",
            "port": "1883",
            "clientid": "client1", 
            //how can I pass credentials here in flow array?!!
            "credentials": {
                "user": "client1",
                "password": "pass1"
            }
        },
        {
            "id": "459e1943.d0745",
            "type": "mqtt in",
            "name": "test_topic",
            "topic": "test_topic",
            "broker": "d01ade6a.afa7e",
            "x": 231, "y": 198, "z": "4a8212ad.6b8304",
            "wires": [["55e90008.0d6238"]]
        },
        {
            "id": "55e90008.0d6238",
            "type": "debug",
            "name": "",
            "active": true,
            "console": "false",
            "complete": "false",
            "x": 450, "y": 199, "z": "4a8212ad.6b8304",
            "wires": []
        }
    ];
    
    var flowOpt = {
        url : 'http://localhost:8000/red/flows', 
        method : 'POST', 
        body : JSON.stringify(flows),
        headers : {
            'Content-type' : 'application/json', 
            'Node-RED-Deployment-Type' : 'full'
        }
    };
    
    request(flowOpt, function (err, res, body) {
        
        // do other stuff ...
    });
}