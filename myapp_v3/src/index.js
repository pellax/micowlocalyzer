//Arrancar server,base de datos y otras configs básicas
require('dotenv').config();
const { default: CreateApi } = require('@elastic/elasticsearch/lib/api/api/create');
const app = require('./server');
require('./database');
const createTables = require('./setup/setupelastic.js')
createTables().catch( e => console.log(e))


app.listen(app.get('port'),() => {
    //const  misetup = setup.createTables().catch(e => console.log(e))
    console.log('Server on port:', app.get('port'));
});
