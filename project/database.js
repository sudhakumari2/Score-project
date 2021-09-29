const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Sudha@123',
        database: 'sudhakumari'
    }
});
knex.schema.hasTable("candidate").then(function (exits) {
    if (!exits) {

        return knex.schema.createTable("candidate", function (table) {
            table.increments('id').primary();
            table.string("Name");
            table.string("Email");
            table.string("address");


        })
    }
    knex.schema.hasTable("test_score").then(function (exits) {
        if (!exits) {

            return knex.schema.createTable("test_score", function (table) {
                table.increments('id').primary();
                table.integer("user_id");
                table.integer("first_round");
                table.integer("second_round");
                table.integer("third_round");


            })
        }
    }).then((data) => {
        console.log("test_score table created")
        console.log("\n")
    }).catch((err) => {
        console.log("error")
    })

}).then((data) => {
    console.log("candidate table created")
}).catch((err) => {
    console.log("error")
})
module.exports = knex;
