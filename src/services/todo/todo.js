import {TodoModel} from "../../models/task.model.js";
import {TodoService} from "./todo.class.js";
import {todoMethods, todoPath} from "./todo.shared.js";
import jwt from 'jsonwebtoken';

export const todo = (app) => {
  // Register our service on the Feathers application
  const options = {
    Model: TodoModel,
    paginate: app.get('paginate')
  };

  app.use(todoPath, new TodoService(options), {
    // A list of all methods this service exposes externally
    methods: todoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });

  // Initialize hooks
  app.service(todoPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [authenticate],
      find: [authenticate],
      get: [authenticate],
      create: [authenticate], // Add the authenticate middleware to create hook
      patch: [authenticate],
      remove: [authenticate]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};

const authenticate = async (context) => {
  const { headers } = context.params;
  const authHeader = headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authentication token.');
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, 'islam');
    console.log(decoded)
    const userId = decoded.userId;
    context.params.user = { userId }; // Attach the user object with userId to context.params
    console.log(userId)

    return userId;
  } catch (error) {
    throw new Error('Invalid authentication token.');
  }
};




