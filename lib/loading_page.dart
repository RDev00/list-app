// ignore_for_file: depend_on_referenced_packages, use_build_context_synchronously

import 'package:flutter/material.dart';
import './auth/login.dart';
import 'package:http/http.dart' as http;

class LoadingPage extends StatelessWidget {
  const LoadingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CheckStatus();
  }
}

class CheckStatus extends StatefulWidget {
  const CheckStatus({super.key});

  @override
  State<StatefulWidget> createState() {
    return _CheckStatus();
  }
}

class _CheckStatus extends State<CheckStatus> {
  final fgk = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    updateServerStatus();
  }

  Future<void> updateServerStatus() async {
    final status = await getStatus();
    if(status == true) {
      if(!mounted) return;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const LogInWidget(),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("El servidor está teniendo problemas ahora mismo, por favor intenta de nuevo más tarde."))
      );
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Cloudbook",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              const CircularProgressIndicator(),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  updateServerStatus();
                },
                child: const Text("Reintentar conectarme")
              ),
              Text("Conectando con el servidor, espera un momento...")
            ],
          ),
        )
      );
  }
}

Future<bool> getStatus() async {
  try {
    final url = Uri.parse("https://list-app-iota.vercel.app/api/status");
    final res = await http.get(
      url,
      headers: {"Content-Type": "application/json"}
    ).timeout(const Duration(seconds: 10));

    if(res.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
}