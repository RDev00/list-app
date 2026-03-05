// ignore_for_file: use_build_context_synchronously, duplicate_ignore

import 'package:flutter/material.dart';
import 'package:list_app/notes/note.dart';
import 'package:list_app/user/change_password.dart';
import 'auth/login.dart';
import 'services/session_storage.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'dart:convert';

class DashboardWidget extends StatefulWidget {
  const DashboardWidget({super.key});

  @override
  State<DashboardWidget> createState() => _DashboardWidgetState();
}

class _DashboardWidgetState extends State<DashboardWidget> {
  final fgk = GlobalKey<FormState>();
  final TextEditingController title = TextEditingController();
  final TextEditingController content = TextEditingController();
  Map<String, dynamic> userData = {};

  @override
  void dispose() {
    title.dispose();
    content.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      updateUserData();
    });
  }

  Future<void> updateUserData() async{
    String? token = await getSession();

    if(token == null || token.isEmpty){
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const LogInWidget())
      );
      return;
    }

    final res = await getUserData(token);
    if (!mounted) return;
    if(res!.isEmpty || res["error"] != null) {
      const errorSnackBar = SnackBar(content: Text("Sesión invalida o error en el servidor, intente regresar más tarde"));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
      Navigator.push(
        context, 
        MaterialPageRoute(
          builder: (context) => LogInWidget(),
        )
      );
    }
    
    setState(() {
      userData = {
        "id": res["user"]["id"],
        "email": res["user"]["email"],
        "notes": res["user"]["notes"],
        "created_at": res["user"]["created_at"],
      };
    });

    final email = res["user"]["email"];
    final successSnackBar = SnackBar(content: Text("Bienvenido de nuevo $email"));
    ScaffoldMessenger.of(context).showSnackBar(successSnackBar);

    return;
  }
  
  @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text("CloudBook"),
        ),
        drawer: Drawer(
          child: Column(
            children: [
              DrawerHeader(
                child: Text(
                  "CloudBook",
                  style: TextStyle(fontSize: 24),
                  ),
                ),
              Expanded(
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: [
                    ListTile(
                      leading: const Icon(Icons.password),
                      title: Text("Cambiar contraseña"),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ChangePassword(),
                          ),
                        );
                      },
                    ),
                    ListTile(
                      leading: const Icon(Icons.bug_report),
                      title: Text("Reportar un error"),
                      onTap: () {
                        Navigator.pop(context);
                      },
                    ),
                    ListTile(
                      leading: const Icon(Icons.logout),
                      title: Text("Cerrar sesión"),
                      onTap: () async {
                        await closeSession();
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LogInWidget(),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  "© CloudBook - 2025",
                  style: TextStyle(fontSize: 16),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
        body: userData.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : userData["notes"] == null || userData["notes"].isEmpty ? 
            const Center(
              child: Text(
                "Aún no tienes notas creadas, ¡Empieza desde ahora!",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 30.0,
                  color: Color.fromARGB(122, 20, 20, 20),
                ),
              ),
            )
           : ListView.builder(
            itemCount: userData["notes"].length,
            itemBuilder: (context, index) {
              final Map<String, dynamic> note = userData["notes"][index];
              return Align(
                alignment: Alignment.topLeft,
                child: SizedBox(
                  width: 300,
                  child: Card(
                    elevation: 2,
                    margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                    child: ListTile(
                      title: Text(
                        note["title"] ?? "",
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => NoteWidget(
                              title: note["title"] ?? "",
                              content: note["content"] ?? "",
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              );
            },
          ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => NoteWidget(title: "", content: ""),
              ),
            );
          },
          backgroundColor: Colors.blue[400],
          foregroundColor: Colors.black87,
          child: Icon(Icons.add),
        ),

        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
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

    return jsonDecode(response.body) as Map<String, dynamic>;
  } catch (e) {
    return {
      "message": "Ocurrió un problema al querer obtener datos del usuario",
      "error": e.toString()
    };
  }
}

Future<Map<String, dynamic>?> uploadNotes(Map<String, dynamic> note, String token) async {
  try {
    final url = Uri.parse("https://list-app-iota.vercel.app/api/users");
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      body: jsonEncode({"title": note["title"], "content": note["content"]}),
    ).timeout(const Duration(seconds: 10));

    return jsonDecode(response.body) as Map<String, dynamic>;
  } catch (e) {
    return {
      "message": "Ocurrió un problema al querer subir la nota",
      "error": e.toString()
    };
  }
}