const {login,register} = require('./Auth');
const {getUser,getUsers,updateUser,deleteUser} = require('./User');
const {getCollections,getCollection,updateCollection,createCollection,deleteCollection} = require('./Collection');
const {createEditor,deleteEditor} = require('./Editor');
const {createCard,deleteCard,updateCard} = require('./Card');
module.exports = {
    paths:{
        '/login':{
            ...login
        },
        '/register': {
            ...register
        },
        '/users': {
            ...getUsers
        },
        '/users/{id}':{
            ...getUser,
            ...updateUser,
            ...deleteUser
        },
        '/collections': {
            ...getCollections,
            ...createCollection
        },
        '/collections/{id}': {
            ...getCollection,
            ...updateCollection,
            ...deleteCollection,
        },
        '/editors/{id}': {
            ...deleteEditor,
            ...createEditor
        },
        '/card': {
            ...createCard
        },
        '/card/{id}': {
            ...updateCard,
            ...deleteCard
        }
    }
}