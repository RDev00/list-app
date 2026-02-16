import 'package:flutter/material.dart';
import 'auth/login.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: LogInWidget(),
        ),
      ),
    );
  }
}

//TODO - Rafa: Agregar los cambios de pantallas entre widgets