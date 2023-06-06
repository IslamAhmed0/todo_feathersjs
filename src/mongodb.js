import mongoose from 'mongoose';

export const mongodb = (app) => {
    const connection = app.get('mongodb');
    mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('MongoDB connected successfully');
    });

    app.set('mongodbClient', db);
};
