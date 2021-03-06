import restaurantsResolvers from './restaurants.js';
import customersResolvers from './customers.js';

const resolvers = {
    Query: {
        ...restaurantsResolvers.Query,
        ...customersResolvers.Query,
    },
    Mutation: {
        ...customersResolvers.Mutation,
        ...restaurantsResolvers.Mutation,
    },
}

export default resolvers;