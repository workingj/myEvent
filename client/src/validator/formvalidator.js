import validator from "validator";

export default function validateForm(data) {
    const newErrors = {};

    if (!validator.isAlpha(data.firstName)) {
        newErrors.firstName = "Please enter a valid first name";
    }

    if (!validator.isAlpha(data.lastName)) {
        newErrors.lastName = "Please enter a valid last name";
    }

    if (!validator.isEmail(data.email)) {
        newErrors.email = "Please enter a valid email";
    }

    // if (!validator.isDate(data.birthDate)   ) {
    //   newErrors.birthDate = "Please enter a valid date";
    // }

    if (!validator.isURL(data.avater)) {
        newErrors.avater = "Please enter a valid URL";
    }
    // if (Object.keys(newErrors).length === 0) {
    //   toast.success("Form is valid");
    // }

    return newErrors;
};