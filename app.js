const express = require('express');
const app = express();


app.get('/*', function(request, response){
    response.sendFile(__dirname + request.originalUrl);
});

app.listen(3000);

