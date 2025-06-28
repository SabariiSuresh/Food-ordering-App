
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email alredy registred' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await new User({ email, name, password: hashed });

    await newUser.save();

    return res.status(201).json({ message: 'User registred successfully' });


  } catch (err) {
    res.status(500).json({ message: 'Register failed ', error: err.message })
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(401).json({ message : 'All fields are required'})
    }

    const user = await User.findOne({ email });
    if (!user)
     return res.status(401).json({ message: "Invalid email or password " });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
     return res.status(401).json({ message: "Invalid password or email" });

    const token = jwt.sign({id : user._id , role : user.role} , process.env.TOKEN , { expiresIn : '1d' })

   return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role , token } , message: 'Login successfully' });
  
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};