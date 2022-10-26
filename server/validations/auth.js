import Joi from "joi";

const obj = {
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
};

export const registerValidator = (data) => {
    const rule = Joi.object({
        ...obj,
        user_name: Joi.string().min(6).max(225).required(),
    });

    return rule.validate(data);
};

export const loginValidator = (data) => {
    const rule = Joi.object(obj);

    return rule.validate(data);
};
