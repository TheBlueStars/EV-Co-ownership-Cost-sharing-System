import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// NOTE:
/// - Đây là router stub (LoginPage / HomePage). Thay bằng các page thực tế của features khi bạn có.
/// - Nếu bạn đã có features/auth/presentation/login_page.dart, import và sử dụng thay cho LoginPageStub.

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomePageStub(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPageStub(),
      ),
    ],
  );
}

class HomePageStub extends StatelessWidget {
  const HomePageStub({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('EV Co-ownership - Home')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.go('/login'),
          child: const Text('Go to Login'),
        ),
      ),
    );
  }
}

class LoginPageStub extends StatelessWidget {
  const LoginPageStub({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login (stub)')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.go('/'),
          child: const Text('Back to Home'),
        ),
      ),
    );
  }
}
