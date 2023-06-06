import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
    },
    time: {
        type: Date,
        required: [true, 'Task time is required'],
    },
    finished: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'required user']
    }
});

export const TodoModel = mongoose.model('Todo', todoSchema);
