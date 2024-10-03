import { EUserState } from "../config/state";
import User, { UserInstance } from "../models/User";
import { RequestError } from "../utils/errors";
import bcrypt from "bcrypt"

class AuthService {
  async registration(data: UserInstance) {
    const {email, password, username} = data

    const isExist = await User.findOne({ where: { email } });
    
    if (isExist) RequestError.BadRequest(`User with email: ${email} already exist!`);
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email: email, 
        password: hashedPassword, 
        username: username, 
        roleId: "dada",
        salt: salt,
        state: EUserState.ACTIVE,
    })
  }
}

export default new AuthService();
