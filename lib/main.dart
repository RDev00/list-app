import 'package:flutter/material.dart';
import 'auth/login.dart';
import 'services/session_storage.dart';
import 'dashboard.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: FutureBuilder<bool>(
            future: checkSession(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              }
              return snapshot.data ?? true ? const Dashboard() : const LogInWidget();
            },
          ),
        ),
      ),
    );
  }
}