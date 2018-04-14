"use strict";
const db = require('./context')();
const server = require('./server')(db);

(async function () {
    await db.sequelize.sync({
        force: true
    });
    const port = 3030;
    server.listen(port, () => console.log(`Server is running on port ${port}`));
})();