const express = require('express');

// initialize 
app = express();
port = process.env.PORT || 4444;


// default view
app.use((_, res) => (res.send(`<h1><em>Welcome...</em></h1>`)));

// listening the port
app.listen(port, () => (console.log(`Listening on port ${port} ...`)));
