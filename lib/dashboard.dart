import 'package:flutter/material.dart';
import 'auth/login.dart';
import 'services/session_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'user-config.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});

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
              return snapshot.data ?? false ? DashboardWidget() : const LogInWidget();
            },
          ),
        ),
      ),
    );
  }
}

class DashboardWidget extends StatefulWidget {
  const DashboardWidget({super.key});

  @override
  State<DashboardWidget> createState() => _DashboardWigetState();
}

class _DashboardWigetState extends State<DashboardWidget> {
  final formGK = GlobalKey<FormState>();
  Map<String, dynamic> userData = {};

  void initState() {
    super.initState();
    _initCode();
  }

  Future<void> _initCode() async{
    final token = await getSession();
    final res = await getUserData(token!);

    if(res!.isEmpty || res['error'] != null){
      const errorSnackBar = SnackBar(content: Text("Ocurrió un error en el servidor"), duration: Duration(seconds: 2));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
    } else {
      setState(() {
        userData = {
          "id": res['user']['id'],
          "email": res['user']['email'],
          "notes": res['user']['notes'],
          "created_at": res['user']['created_at'],
        };
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "CloudBook",
          style: TextStyle(
            fontWeight: FontWeight.w600
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => userConfig(),
                ),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Form(
          key: formGK,
          child: Column(
            children: <Widget>[
              
            ],
          ),
        ),
      ),
    );
  }
}

Future<Map<String, dynamic>?> getUserData(String token) async {
  try {
    final url = Uri.parse("https://list-app-iota.vercel.app/api/users");
    final response = await http.get(
      url,
      headers: {'Content-Type': 'application/json', 'Authorization': token},
    ).timeout(const Duration(seconds: 10));

    return jsonDecode(response.body);
  } catch (e) {
    return {
      "message": "Ocurrió un problema al querer obtener datos del usuario",
      "error": e
    };
  }
}