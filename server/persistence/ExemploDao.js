function ExemploDao(connection) {
    this._connection = connection;
}

ExemploDao.prototype.save = function(exemplo,callback) {
    this._connection.query('INSERT INTO exemplos SET ?', exemplo, callback);
}

ExemploDao.prototype.update = function(exemplo,callback) {
    this._connection.query('UPDATE exemplos SET status = ? where id = ?', [exemplo.status, exemplo.id], callback);
}

ExemploDao.prototype.list = function(callback) {
    this._connection.query('select * from exemplos',callback);
}

ExemploDao.prototype.getById = function (id,callback) {
    this._connection.query("select * from exemplos where id = ?",[id],callback);
}

module.exports = function(){
    return ExemploDao;
};
