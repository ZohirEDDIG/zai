import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registrated successfully' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Login successful', user: {
      id: user._id,
      username: user.username,
    }, token: token });
  } catch(e) {
    console.error('');
    return res.status(500).json({ message: 'Internal server error' });
  }
}