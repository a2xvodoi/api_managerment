import User from "../../models/Users";
import { userValidator } from "../../validations/user";

const UsersController = {
    list(req, res) {
        User.find({}).exec(function (err, users) {
            res.send({data: users});
        });
    },
    async store(req, res) {
        const { error } = userValidator(req.body);
        if (error) return res.status(422).send(error.details[0].message);

        try {
            const user = await new User(req.body);
            await user.save();

            await res.send("success");
        } catch (error) {
            return res.send("failure");
        }
    },
    async update(req, res) {
        const userUpdate = req.body;
        const { error } = userValidator(userUpdate);
        if (error) return res.status(422).send(error.details[0].message);

        try {
            const user = await User.findOne({ id: req.params.id });
            user.user_name = userUpdate.user_name;
            user.password = userUpdate.password;
            user.full_name = userUpdate.full_name;
            user.birthday = userUpdate.birthday;
            user.phone = userUpdate.phone;
            user.email = userUpdate.email;
            user.address = userUpdate.address;
            user.userType = userUpdate.userType;
            await user.save();

            return res.send("success");
        } catch (error) {
            return res.send("failure");
        }
    },
    async destroy(req, res) {
        try {
            if (req.params.id === res.locals.token.id) {
                throw new Error("Can not delete user!")
            }
            await User.deleteOne({
                id: req.params.id,
            });

            return res.send("success");
        } catch (error) {
            return res.send("failure");
        }
    },
};

export default UsersController;
