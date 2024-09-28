import User from "../../model.js";
import { getToken } from "../../utils.js";
import bcrypt from "bcrypt";
export async function register(req, res) {
    const { name, email, password } = req.body;
    const  user = await User.findOne({ email,  });
    if (user) return res.send({ "Status": "Account Exist!" })
    const newUser = await User.create({
        name,
        email,
        password,
    })
    const savedUser = await newUser.save()
    var token = getToken(req);
    res.send({
        token: token,
        savedUser,
        message: "Created SucessFully "
    });
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
      
        if (!user) return res.status(404).send({ message: "Account does not exist" })
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }
        const token = await getToken(req)
        console.log(token);
        return res.send({ token:token, user:user })
    } catch (err) {
        res.status(500).send({
            'status': 500,
            'message': 'Internal server error'
        });
    }
}

export default async function uploadimage 
    (req, res)   {
        try {
            res.status(200).send({
                message: 'Image uploaded successfully',
                file: req.file
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
         
    }
}