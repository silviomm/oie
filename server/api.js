const https = require('https');
module.exports = app => {

    const ip = app.get('ip');
    let counter = 0;

    const turistas = [
	    { "nome": "Silvio Junior", "fotos": [`http://${ip}:8080/images/guias/silvio.jpg`], "idade": 81, "descricao": "Desenvolvedor"},
       { "nome": "Rodrigo Lindoso", "fotos": [`http://${ip}:8080/images/turistas/rodrigo.png`], "idade": 51, "descricao": "Jogador no melhor clube do mundo"},
    ];

    const guias = [
        { "nome": "Daniel Artine", "preco": 51.0, "fotos": [`http://${ip}:8080/images/guias/daniel.jpg`], "nota": 4.8, "descricao": "Apaixonado por trilhas e história", badges: ["library_books", "terrain"], badgesDef: ["História", "Trilhas"]},
        { "nome": "George Rappel", "preco": 31.0, "fotos": [`http://${ip}:8080/images/guias/george.jpg`], "nota": 4.6, "descricao": "Adoro fazer umas compras", badges: ["alarm_on", "add_shopping_cart", "terrain"], badgesDef: ["Pontual", "Compras", "Trilhas"]},
	    { "nome": "Silvio Junior", "preco": 41.0, "fotos": [`http://${ip}:8080/images/guias/silvio.jpg`], "nota": 4.4, "descricao": "Atraso não é comigo", badges: ["alarm_on"], badgesDef: ["Pontual"]},
    ];

    const eventos = [
        {
            nome: 'Festa Junina',
            data: new Date(),
            local: 'Feira de São Cristóvão',
            pessoas: [{}, {}, {}],
            imagem: `http://${ip}:8080/images/passeios/junina.jpg`,
            guia: guias[0],
            preco: 200
        },
        {
            nome: 'Visita ao Cristo',
            data: new Date(),
            local: 'Cristo Redentor',
            pessoas: [{}, {}, {}],
            imagem: `http://${ip}:8080/images/passeios/cristo2.png`,
            guia: guias[0],
            preco: 90
        },
        {
            nome: 'Bondinho',
            data: new Date(),
            local: 'Pão de Açúcar',
            pessoas: [{}, {}, {}],
            imagem: `http://${ip}:8080/images/passeios/paoddeacucar.jpg`,
            guia: guias[0],
            preco: 120
        },
        {
            nome: 'Praia',
            data: new Date(),
            local: 'Praia de Copacabana',
            pessoas: [{}, {}, {}],
            imagem: `http://${ip}:8080/images/passeios/copacabana.jpg`,
            guia: guias[0],
            preco: 150
        }
    ];

    const passeios = [
        { "local": "Cristo Redentor", "fotos": [`http://${ip}:8080/images/passeios/cristo2.png`]},
        { "local": "Pão de Açúcar", "fotos": [`http://${ip}:8080/images/passeios/paoddeacucar.jpg`]},
	    { "local": "Praia de Copacabana", "fotos": [`http://${ip}:8080/images/passeios/copacabana.jpg`]},
    ];

    const proximidades = [
        { "local": "Local 1", "fotos": [`http://${ip}:8080/images/proximidades/passeio1.jpg`]},
        { "local": "Local 2", "fotos": [`http://${ip}:8080/images/proximidades/passeio1.jpg`]},
	    { "local": "Local 3", "fotos": [`http://${ip}:8080/images/proximidades/passeio1.jpg`]},
    ];

    app.get('/api/guias/listaGuias', (req, res) =>
        res.json(guias));

    app.get('/api/passeios/listaPasseios', (req, res) =>
        res.json(passeios));

    app.get('/api/proximidades/listaProximidades', (req, res) =>
        res.json(proximidades));
    
    app.get('/api/turistas/listaTuristas', (req, res) =>
        res.json(turistas));

    app.post('/api/guias/eventos/evento', (req, res) => {
        let evento = req.body;
        evento.guia = guias[0];
        evento.imagem = `http://${ip}:8080/images/eventos/evento.png`;
        eventos.push(evento);
    });

    app.get('/api/guias/eventos', (req, res) => {
        res.json(eventos);
    });

};
