module.exports = (app, express, Body_parser, passport, compression, cookieParser, flash, expressSession) =>{
    app.use(cookieParser());

    app.use(compression());

    //app.use(formidable());

    app.use(passport.initialize());
    app.use(passport.session());

    //app.use(expressSession())
    
    app.use(expressSession({
        secret: 'RRRRRRRRRYYYYYYYYYYYOOOOOOOOOOOOO',
        saveUninitialized: true,
        resave : false
    }))

    app.use(flash());

    app.use(Body_parser.json());
    app.use(Body_parser.urlencoded({ extended: true }))

    app.set('views', __dirname+'/Views')
    app.set('view engine', 'ejs')
    
    app.use('/static', express.static(__dirname+ '/../public'))

    app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });
}