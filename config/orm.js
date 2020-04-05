const connection = require("./connection.js");

let orm = {
    selectAll: function (tableInput, cb) {
        const queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableInput, colToInsert, valOfCol, cb) {
        const queryString = "INSERT INTO ?? (??) VALUES (?)";
        connection.query(queryString, [tableInput, colToInsert, valOfCol], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (tableInput, colToUpdate, valOfCol, condition, cb) {
        const queryString = "UPDATE ?? SET ?? = ? WHERE " + condition;
        connection.query(queryString, [tableInput, colToUpdate, valOfCol], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    deleteOne: function (tableInput, condition, cb) {
        const queryString = "DELETE FROM ?? WHERE " + condition;
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;