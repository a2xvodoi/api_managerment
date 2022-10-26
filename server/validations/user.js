import Joi from "joi";

const obj = {
    access_token: Joi.string(),
    user_name: Joi.string().min(6).max(225).required(),
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
};

export const userValidator = (data) => {
    const rule = Joi.object({
        ...obj,
    });

    return rule.validate(data);
};
