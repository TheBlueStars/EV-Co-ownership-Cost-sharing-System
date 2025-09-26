import '../entities/user.dart';

abstract class UserRepository {
  Future<User?> getUserById(String id);
  Future<List<User>> getAllUsers();
  Future<void> createUser(User user);
}
