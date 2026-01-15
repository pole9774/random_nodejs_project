class User {
  username: string;
  name: string;
  surname: string;
  role: Role;

  constructor(
    username: string,
    name: string,
    surname: string,
    role: Role
  ) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.role = role;
  }
}

enum Role {
  URBANPLANNER = "UrbanPlanner",
  ADMIN = "Admin",
}

export { User, Role };
