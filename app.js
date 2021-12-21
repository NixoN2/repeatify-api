const express = require("express");
const bcrypt = require('bcrypt');
// const jwt_decode = require('jwt-decode');
// const cors = require('cors');
// const path = require("path");
// const expressSession = require("express-session");
// const passport = require("passport");
// const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
// const jwt = require('express-jwt');
// const axios = require('axios');
// const jwks = require('jwks-rsa');
// const guard = require('express-jwt-permissions')();
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
// const localStrategy = require('passport-local').Strategy;
// const { auth } = require('express-oauth2-jwt-bearer');
const { sequelize, User, Collection, Card, Editor } = require("./models");
const { QueryTypes } = require('sequelize');
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
session = require('express-session')
const app = express();
// app.use(passport.initialize());
app.use(express.json());
// app.use(oAuth);
// passport.use(
//     new JWTstrategy(
//         {
//             secretOrKey: 'TOP_SECRET',
//             jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
//         },
//         async (token, done) => {
//             try {
//                 return done(null, token.user);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );

// var jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://nixonweb.eu.auth0.com/.well-known/jwks.json'
//     }),
//     audience: 'http://localhost:4000',
//     issuer: 'https://nixonweb.eu.auth0.com/',
//     algorithms: ['RS256']
// });

app.use(
    session({
        secret: 'you secret key',
        saveUninitialized: true,
    })
)

// app.use(jwtCheck);
// async function basicAuth(req, res, next) {
//     // make authenticate path public
//     // check for basic auth header
//     if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
//         return res.status(401).json({ message: 'Missing Authorization Header' });
//     }

//     // verify auth credentials
//     const base64Credentials =  req.headers.authorization.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//     const [email, password] = credentials.split(':');
//     const exists = await User.findOne({where: {email: email.toLowerCase()}});
//     if (!exists) {
//         return res.status(401).json({msg: `User with email ${email} doesn't exist`});
//     }
//     const validPassword = await bcrypt.compare(password, exists.password);
//     if (!validPassword) {
//         return res.status(403).json({ error: "Invalid Password" });
//     }
//     // attach user to request object
//     req.user = exists;
//     if (validPassword) {
//         next();
//     }
// }
async function checkUser(req,res,next) {
    if (!req.session.user){
        return res.status(400).json({err: "You are not signed in"});
    }
    return next();
}
async function checkAdmin(req,res,next) {
    if (req.session.user.role !== 'admin') {
        return res.status(400).json({err: "You are not an admin"});
    }
    return next();
}

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

app.post("/register",async (req,res)=> {
    const {email,first_name,last_name,password,color,animal,role} = req.body;

    if (!(email && password && first_name && last_name && color && animal)) {
        return res.status(400).json({ msg: "Data not formatted properly" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const new_password = await bcrypt.hash(password, salt);
        const user = await User.create({email: email.toLowerCase(),first_name,last_name,password: new_password,color,animal,role});
        req.session.user = user;
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }

})

app.post("/login", async (req,res)=> {
    const {email, password} = req.body;
    try {
        const exists = await User.findOne({where: {email: email.toLowerCase()}});
        if (!exists) {
            return res.status(401).json({msg: `User with email ${email} doesn't exist`});
        }
        const validPassword = await bcrypt.compare(password, exists.password);
        if (!validPassword) {
            return res.status(403).json({ error: "Invalid Password" });
        }
        req.session.user = exists;
        return res.status(200).json(exists);
    } catch (err) {
        return res.status(500).json(err);
    }
})
app.get("/users", (req,res,next) => checkUser(req,res,next), async (req,res)=> {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.get("/users/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            where: {id},
            include: {model: Collection, as: 'author', include: {model: User, as: 'author'}}
        });
        if (!user) {
            return res.status(400).json({msg: "User doesn't exist"});
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.put("/users/:id",(req,res,next) => checkUser(req,res,next),  async (req,res) => {
    const id = req.params.id;
    const {first_name, last_name, email} = req.body;
    try {
        const user = await User.findOne({where: {id}});
        if (!user) {
            return res.status(400).json({message: "This user doesn't exist"});
        }
        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }
        if (email) {
            user.email = email;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.delete("/users/:id",(req,res,next) => checkUser(req,res,next), (req,res,next) => checkAdmin(req,res,next),async (req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({where: {id}});
        if (!user) {
            return res.status(400).json({message: "User doesn't exist"});
        }
        await user.destroy();
        return res.status(201).json({message: "User was deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.get("/collections",(req,res,next) => checkUser(req,res,next), async (req, res) => {
    try {
        const collections = await Collection.findAll({include: [{
            model: User,
            as: 'author'
        }, {
            model: Card,
            as: 'cards'
        },{
            model: Editor,
            as: 'editors',
            include: [
                {
                    model: User,
                    as: 'editor'
                }
            ]
        }],});
        return res.status(200).json(collections);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.get("/collections/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const collection = await Collection.findOne({
            where: {id},
            include: [{
                model: User,
                as: 'author'
            }, {
                model: Card,
                as: 'cards'
            },{
                model: Editor,
                as: 'editors',
                include: [
                    {
                        model: User,
                        as: 'editor'
                    }
                ]
            }],
        });
        if (!collection){
            return res.status(400).json({msg: "Collection doesn't exist"})
        }
        return res.status(200).json(collection);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.post("/collections",(req,res,next) => checkUser(req,res,next), async (req,res) => {
    const {private,name, userId: id} = req.body;
    try {
        const user = await User.findOne({where: {id:id}});
        if (!user){
            return res.status(400).json({msg: "User doesn't exist"})
        }
        const collection = await Collection.create({private, name, userId: user.id});
        return res.status(201).json(collection);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.delete("/collections/:id",(req,res,next) => checkUser(req,res,next),(req,res,next) => checkAdmin(req,res,next), async (req,res) => {
    const id = req.params.id;
    try {
        const collection = await Collection.findOne({where:{id}});
        if (!collection){
            return res.status(400).status({msg: "Collection doesn't exits"})
        }
        await collection.destroy();
        return res.status(200).json({message: "Collection was deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.put("/collections/:id",(req,res,next) => checkUser(req,res,next), async (req, res) => {
    const id = req.params.id;
    const {private,name} = req.body;
    try {
        const collection = await Collection.findOne({where:{id}, include: ['author','cards','editors']});
        if (!collection){
            return res.status(400).json({msg: "Collection doesn't exist"})
        }
        if (req.body.hasOwnProperty('private')){
            collection.private = private;
        }
        if (name){
            collection.name = name;
        }
        await collection.save();
        return res.status(200).json(collection);
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.post("/editors/:id",(req,res,next) => checkUser(req,res,next), async (req,res) => {
    const id = req.params.id;
    const {email} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        const collection = await Collection.findOne({where: {id}});
        if (!collection){
            return res.status(400).json({msg: "Collection doesn't exist"})
        }
        if (!user){
            return res.status(400).json({msg: "User doesn't exist"})
        }
        const exists = await Editor.findOne({where: {collectionId: id, userId: user.id}});
        if (exists){
            return res.status(400).json({msg: "This user is already an editor of this collection"})
        }
        await Editor.create({collectionId: id, userId: user.id});
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.delete("/editors/:id",(req,res,next) => checkUser(req,res,next), async (req,res) => {
    const id = req.params.id;
    const {userId} = req.body;
    try {
        const user = await User.findOne({where:{id:userId}});
        if (!user){
            return res.status(400).json({msg: "User doesn't exist"})
        }
        const collection = await Collection.findOne({where: {id}});
        if (!collection){
            return res.status(400).json({msg: "Collection doesn't exist"})
        }
        const editor = await Editor.findOne({where: {collectionId: id, userId: userId}});
        if (!editor) {
            return res.status(400).json({msg: "Editor doesn't exist"});
        }
        await editor.destroy();
        return res.status(200).json({message: "Editor was deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
})


app.post("/card",(req,res,next) => checkUser(req,res,next), async (req, res) => {
    const {collectionId, name, material} =  req.body;
    try {
        const collection = await Collection.findOne({where: {id: collectionId}});
        if (!collection){
            return res.status(400).json({msg: "Collection doesn't exist"})
        }
        const card = await Card.create({name,material,collectionId:collection.id});
        return res.status(201).json(card);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.put("/card/:id",(req,res,next) => checkUser(req,res,next), async (req, res) => {
    const id = req.params.id;
    const {name, material} = req.body;
    try {
        const card = await Card.findOne({where: {id}});
        if (!card){
            return res.status(400).json({msg: "Card doesn't exist"})
        }
        if (name) {
            card.name = name;
        }
        if (material) {
            card.material = material;
        }
        await card.save();
        return res.status(200).json(card);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.delete("/card/:id",(req,res,next) => checkUser(req,res,next), async (req, res) => {
    const id = req.params.id;
    try {
        const card = await Card.findOne({where: {id}});
        if (!card){
            return res.status(400).json({msg: "Card doesn't exist"})
        }
        await card.destroy();
        return res.status(201).json({message: "Card was deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
});


// app.delete("/card/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
//     const id = req.params.id;
//     try {
//         const card = await Card.findOne({where: {id}});
//         await card.destroy();
//         return res.status(201).json({message: "Card was deleted"});
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });

app.listen({port:5000}, async () => {
    console.log("Server up on http://localhost:5000");
    await sequelize.authenticate();
    console.log("Database connected");
})

