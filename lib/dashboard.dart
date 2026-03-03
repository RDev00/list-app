// ignore_for_file: use_build_context_synchronously, duplicate_ignore

import 'package:flutter/material.dart';
import 'package:list_app/user/change_password.dart';
import 'auth/login.dart';
import 'services/session_storage.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'dart:convert';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: checkSession(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        final logged = snapshot.data ?? false;
        return logged ? const DashboardWidget() : const LogInForm();
      },
    );
  }
}

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
    updateUserData();
  }

  Future<void> updateUserData() async{
    String? token = await getSession();
    final res = await getUserData(token!);
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
    } else {
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
    }

    return;
  }

  void createNewNote(String title, String content) async{
    if(title.isEmpty || content.isEmpty) {
      return;
    }

    Map<String, dynamic> newNote = {
      "title": title,
      "content": content
    };

    String? token = await getSession();

    final res = await uploadNotes(newNote, token!);

    if(res!.isEmpty || res["error"] != null){
      const errorSnackBar = SnackBar(content: Text("Ocurrió un error al subir la nota, intentelo de nuevo más tarde"));
      // ignore: use_build_context_synchronously
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
    } else {
      const successSnackBar = SnackBar(content: Text("Se guardó correctamente tu nota"));
      // ignore: use_build_context_synchronously
      ScaffoldMessenger.of(context).showSnackBar(successSnackBar);
    }

    return;
  }

  Future<void> updateNote(String title, String content, int index) async{
    if(title.isEmpty || content.isEmpty) {
      return;
    }

    Map<String, dynamic> updatedNote = {
      "title": title,
      "content": content
    };

    String? token = await getSession();
    
    final res = await uploadUpdatedNote(updatedNote, index, token!);

    if(res!.isEmpty || res["error"] != null){
      const errorSnackBar = SnackBar(content: Text("Ocurrió un error al subir la nota, intentelo de nuevo más tarde"));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
    } else {
      const successSnackBar = SnackBar(content: Text("Se guardó correctamente tu nota"));
      ScaffoldMessenger.of(context).showSnackBar(successSnackBar);
    }

    return;
  }
  
  @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text("CloudBook"),
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              ListTile(
                leading: const Icon(Icons.password),
                title: Text("Cambiar contraseña"),
                onTap: () {
                  Navigator.push(
                    // ignore: use_build_context_synchronously
                    context, 
                    MaterialPageRoute(
                      builder: (context) => ChangePassword(),
                    )
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
                onTap: () {
                  closeSession();
                  Navigator.push(
                    context, 
                    MaterialPageRoute(
                      builder: (context) => LogInWidget(),
                    )
                  );
                },
              ),
            ],
          ),
        ),
        body: userData.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : ListView.builder(
                itemCount: userData["notes"]?.length ?? 0,
                itemBuilder: (context, index) {
                  final note = userData["notes"][index];
                  return ListTile(
                    title: Text(note["title"]),
                    subtitle: Text(note["content"]),
                  );
                },
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

Future<Map<String, dynamic>?> uploadUpdatedNote(Map<String, dynamic> note, int index, String token) async {
  try {
    final url = Uri.parse("https://list-app-iota.vercel.app/api/users");
    final response = await http.put(
      url,
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      body: jsonEncode({"title": note["title"], "content": note["content"],"index": index}),
    ).timeout(const Duration(seconds: 10));

    return jsonDecode(response.body) as Map<String, dynamic>;
  } catch (e) {
    return {
      "message": "Ocurrió un problema al querer subir la nota",
      "error": e.toString()
    };
  }
}