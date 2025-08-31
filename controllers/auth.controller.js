const prisma = require("../config/db");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, name, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });
    delete user.password;
    res.status(201).json({
      status: "success",
      msg: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error from signUp",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    let isPasswordMatch = false;
    if (user) {
      isPasswordMatch = await bcrypt.compare(password, user.password);
    }
    if (!isPasswordMatch || !user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    delete user.password;
    
    

    res.status(200).json({
      status: "success",
      msg: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error from login",
    });
  }
};
