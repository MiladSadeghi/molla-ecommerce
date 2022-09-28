export const validateSignUp = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email Required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email Address Is Invalid";
  } else {
    delete errors.email;
  }

  if (!data.userName) {
    errors.userName = "Username Required.";
  } else if (data.userName.length < 3) {
    errors.userName = "You Must Enter Valid Username.";
  } else {
    delete errors.userName;
  }

  if (!data.password) {
    errors.password = "Password Required.";
  } else if (data.password.length < 6) {
    errors.password = "Enter Stronger Password.";
  } else {
    delete errors.password;
  }

  if (!data.repeatPassword) {
    errors.repeatPassword = "This Field Is Required.";
  } else if (data.repeatPassword !== data.password) {
    errors.repeatPassword = "Passwords Must Match.";
  } else {
    delete errors.repeatPassword;
  }
  
  if (!data.isAccepted) {
    errors.isAccepted = "You Most Accept!.";
  } else {
    delete errors.isAccepted;
  }

  return errors;
}

export const validateSignIn = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email Required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email Address Is Invalid";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password Required.";
  } else {
    delete errors.password;
  }

  return errors;
}

export const handleFirebaseError = (error) => {
  switch(error) {
    case "auth/email-already-in-use":
      return {message: "e-mail is already linked to an account or is invalid", severity: "error"}
    case "auth/network-request-failed":
      return {message: "check Your Connection!.", severity: "error"}
      case "auth/user-not-found":
        return {message: "user not found!", severity: "error"}
        case "auth/wrong-password":
      return {message: "your password is wrong", severity: "error"}
      case "auth/too-many-requests":
        return {message: "to many request, try later.", severity: "error"}
      case "regd":
        return {message: "thanks for register.", severity: "success"}
      case "lgsc":
      case "golg":
        return {message: "welcome back...", severity: "success"}
      case "okcheckout":
        return {message: "Thank you for purchase. Please remember your purchase process takes 2-3 days", severity: "success"}
      default:
        return {message: "Something bad happened! try again later...", severity: "error"}
  }
}