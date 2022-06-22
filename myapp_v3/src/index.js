//Arrancar server,base de datos y otras configs básicas
require('dotenv').config();
const app = require('./server');
require('./database');
require('./refresh')
app.listen(app.get('port'),() => {
    console.log('Server on port:', app.get('port'));
});
