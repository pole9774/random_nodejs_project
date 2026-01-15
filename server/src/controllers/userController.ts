import UserDAO from "../dao/userDAO";

class UserController {
  private dao: UserDAO;

  constructor() {
    this.dao = new UserDAO();
  }

  async createUser(
    username: string,
    name: string,
    surname: string,
    password: string,
    role: string
  ): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.dao
        .createUser(username, name, surname, password, role)
        .then(() => {
          resolve(true);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}

export default UserController;
