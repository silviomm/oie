module.exports = function(app){

  app.get('/exemplos', function(req, res){
    console.log('GET received at /exemplos');

    res.send('OK');
  });

  app.delete('/exemplos/exemplo/:id', function(req, res){
    console.log('DELETE received at /exemplos/exemplo/'+req.params.id);

    var exemplo = {};
    var id = req.params.id;

    exemplo.id = id;
    exemplo.status = 'deleted';

    var connection = app.persistence.connectionFactory();
    var ExemploDao = new app.persistence.ExemploDao(connection);

    ExemploDao.update(exemplo, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('DB soft deleted exemplo');
        res.status(204).send(exemplo);
    });
  });

  app.post('/exemplos/exemplo', function(req, res){
    console.log('POST received at /exemplos/exemplo');

    req.assert("exemplo.valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var exemplo = req.body["exemplo"];
    console.log('processando uma requisicao de um novo exemplo');

    exemplo.status = 'CRIADO';
    exemplo.data = new Date;

    var connection = app.persistence.connectionFactory();
    var ExemploDao = new app.persistence.ExemploDao(connection);

    ExemploDao.save(exemplo, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } 
      else {
        exemplo.id = resultado.insertId;
        console.log('exemplo criado');

        res.location('/exemplos/exemplo/' +
              exemplo.id);

        var response = {
          links: [
            {
              href:"http://localhost:3000/exemplos/exemplo/"
                      + exemplo.id,
              rel:"deletar",
              method:"DELETE"
            }
          ]
        }
      }
      res.status(201).json(response);
    });
  });
}
