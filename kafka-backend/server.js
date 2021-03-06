// var connection =  new require('./kafka/Connection');
import mongoose from "mongoose";
import connection from './kafka/Connection.js';

//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
import Books from './services/books.js';
import getRestaurants from './services/getRestaurants.js';
import connectMongoDB from "./dbconnection.js";
import customersignup from "./services/customersignup.js";
import restaurantsignup from "./services/restaurantsignup.js";
import placeorder from "./services/placeorder.js";
import getCustomerOrders from "./services/getCustomerOrders.js";
import updateCustomerProfile from "./services/updateCustomerProfile.js";
import getCustomerProfile from "./services/getCustomerProfile.js";
import addDish from "./services/addDish.js";
import updateDish from "./services/updateDish.js";
import updateRestaurantProfile from "./services/updateRestaurantProfile.js";
import getRestaurantOrders from "./services/getRestaurantOrders.js";
import customerLogin from "./services/customerLogin.js";
import updateDeliveryStatus from "./services/updateDeliveryStatus.js";

try {
    connectMongoDB();

    const db = mongoose.connection;
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('Connected to Database'));
} catch(e) {
    console.log("error3", e);
}

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    const consumer = connection.getConsumer(topic_name);
    const producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        const data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            const payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books);
handleTopicRequest("getRestaurants", getRestaurants);
handleTopicRequest("customersignup", customersignup);
handleTopicRequest("customerLogin", customerLogin);
handleTopicRequest("restaurantsignup", restaurantsignup);
handleTopicRequest("placeorder", placeorder);
handleTopicRequest("getCustomerOrders", getCustomerOrders);
handleTopicRequest("updateCustomerProfile", updateCustomerProfile);
handleTopicRequest("getCustomerProfile", getCustomerProfile);
handleTopicRequest("addDish", addDish);
handleTopicRequest("updateDish", updateDish);
handleTopicRequest("updateRestaurantProfile", updateRestaurantProfile);
handleTopicRequest("getRestaurantOrders", getRestaurantOrders);
handleTopicRequest("updateDeliveryStatus", updateDeliveryStatus);
