import bcrypt from 'bcryptjs';
import { UserModel } from '../../models/users.model.js';
import { UsersService, getOptions } from './users.class.js';
import { usersPath, usersMethods } from './users.shared.js';
import jwt from 'jsonwebtoken';

export * from './users.class.js';

export const users = (app) => {
  const options = {
    Model: UserModel,
    paginate: app.get('paginate')
  };

  app.use(usersPath, new UsersService(options), {
    methods: usersMethods,
    events: []
  });

  app.service(usersPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [hashPassword],
      patch: [hashPassword],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });

  app.post('/login', login);
};

const hashPassword = async (context) => {
  if (context.data && context.data.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(context.data.password, saltRounds);
    context.data.password = hashedPassword;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await UserModel.findOne({ email });
  console.log(user);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user._id);
  return res.json({ token });
};

const generateToken = (userId) => {
  const expiresIn = '24h'; // 24 hours
  const secretKey = 'islam';
  const token = jwt.sign({ userId }, secretKey, { expiresIn });
  return token;
};

