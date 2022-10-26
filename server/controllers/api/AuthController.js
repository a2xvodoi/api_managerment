import jwt from "jsonwebtoken";
import User from "../../models/Users";
import { loginValidator, registerValidator } from "../../validations/auth";

const AuthController = {
    async register(req, res) {
        const { error } = registerValidator(req.body);

        if (error) return res.status(422).send(error.details[0].message);

        const checkEmailExist = await User.findOne({ email: req.body.email });

        if (checkEmailExist) return res.status(422).send("Email is exist");

        const user = new User({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        });

        try {
            const newUser = await user.save();
            const token = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: 60 * 60 * 24,
                }
            );
            const response = {
                user_name: newUser.user_name,
                email: newUser.email,
                token
            }
            return res.send(response);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async login(req, res) {
        const { error } = loginValidator(req.body);

        if (error) return res.status(422).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(422).send("Email or Password is not correct");

        const isCorrectPassword = await user.isValidPassword(req.body.password);

        if (!isCorrectPassword)
            return res.status(422).send("Email or Password is not correct");

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24,
        });
        const response = {
            user_name: user.user_name,
            email: user.email,
            token
        }
        return res.send(response);
    },
};

export default AuthController;
