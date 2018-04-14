const db = require('./context')();
const express = require('express');
const app = express();

(async function() {
    await db.sequelize.sync();
    const port = 3030;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})();