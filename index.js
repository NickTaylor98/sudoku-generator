"use strict";
const db = require('./context')();
const server = require('./server')(db);
const PORT = process.env.PORT || 3030;
(async function () {
    await db.sequelize.sync({
        force: false
    });
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();