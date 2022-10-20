const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = require("graphql");

const {
    BookGraphQlType,
    AuthorGraphQlType
} = require("./types");

const {BookDbModel} = require("../model/book");
const {AuthorDbModel} = require("../model/author");

const GraphQLMutations = new GraphQLObjectType({
    name: "GraphQLMutations",
    fields: {
        addAuthor: {
            type: AuthorGraphQlType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                years: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new AuthorDbModel({
                    name: args.name,
                    years: args.years,
                    age: args.age
                });
                return author.save();
            }
        },

        addBook: {
            type: BookGraphQlType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                pubYear: {type: new GraphQLNonNull(GraphQLInt)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new BookDbModel({
                    title: args.title,
                    genre: args.genre,
                    pubYear: args.pubYear,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = {
    GraphQLMutations
};
