const CreateUser = require('../../application/use-cases/user/CreateUser');
const LoginUser = require('../../application/use-cases/user/LoginUser');
const ListUsers = require('../../application/use-cases/user/ListUsers');
const UpdateUser = require('../../application/use-cases/user/UpdateUser');
const DeleteUser = require('../../application/use-cases/user/DeleteUser');

class UserController {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const createUser = new CreateUser(this.userRepository, this.authService);
      const user = await createUser.execute({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const loginUser = new LoginUser(this.userRepository, this.authService);
      const { user, token } = await loginUser.execute({ email, password });
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async list(req, res) {
    try {
      const listUsers = new ListUsers(this.userRepository);
      const users = await listUsers.execute();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async update(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updateUser = new UpdateUser(this.userRepository, this.authService);
        const updatedUser = await updateUser.execute({ userId: id, updates });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async delete(req, res) {
    try {
        const { id } = req.params;
        const deleteUser = new DeleteUser(this.userRepository);
        // Passamos o ID do usuário a ser deletado e o ID do admin que está fazendo a ação
        await deleteUser.execute({ userIdToDelete: id, currentUserId: req.user.id });
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
}

module.exports = UserController;