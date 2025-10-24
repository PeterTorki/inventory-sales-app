import * as Yup from "yup";

const emailSchema = Yup.string()
	.required("Email is required")
	.email("Invalid email address");

const passwordSchema = Yup.string()
	.required("Password is required")
	.min(6, "Password must be at least 6 characters");

export const validateEmail = (email: string): string => {
	try {
		emailSchema.validateSync(email);
		return "";
	} catch (err: any) {
		return err.message;
	}
};

export const validatePassword = (password: string): string => {
	try {
		passwordSchema.validateSync(password);
		return "";
	} catch (err: any) {
		return err.message;
	}
};
