// ignore_for_file: use_build_context_synchronously, duplicate_ignore

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../notes/note.dart';
import '../user/change_password.dart';
import 'auth/login.dart';
import 'services/session_storage.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'dart:convert';
import './user/delete_account.dart';

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
  final Uri reportBugsUri = Uri.parse("https://list-app-iota.vercel.app/bug-reports");

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

    return;
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "CloudBook",
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: "Actualizar",
            onPressed: updateUserData,
          ),
        ],
      ),
      drawer: Drawer(
        child: Column(
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blueAccent,
              ),
              child: SizedBox(
                width: double.infinity,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Icon(Icons.cloud, color: Colors.white, size: 48),
                    SizedBox(height: 12),
                    Text(
                      "CloudBook",
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  ListTile(
                    leading: const Icon(Icons.password_outlined),
                    title: const Text("Cambiar contraseña"),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => ChangePassword()),
                      );
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.bug_report_outlined),
                    title: const Text("Reportar un error"),
                    onTap: () async => await launchUrl(reportBugsUri),
                  ),
                  const Divider(),
                  ListTile(
                    leading: const Icon(Icons.logout, color: Colors.redAccent),
                    title: const Text(
                      "Cerrar sesión",
                      style: TextStyle(color: Colors.redAccent),
                    ),
                    onTap: () async {
                      await closeSession();
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(builder: (context) => LogInWidget()),
                        (route) => false,
                      );
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.delete_forever_outlined, color: Colors.redAccent),
                    title: const Text(
                      "Eliminar mi cuenta",
                      style: TextStyle(color: Colors.redAccent),
                    ),
                    onTap: () {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(builder: (context) => DeleteAccountForm()),
                        (route) => true,
                      );
                    },
                  ),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Text(
                "© CloudBook 2026 - Beta 1.2",
                style: TextStyle(
                  fontSize: 14,
                  color: Color.fromARGB(200, 0, 0, 0)
                ),
              ),
            ),
          ],
        ),
      ),
      body: userData.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : (userData["notes"] == null || userData["notes"].isEmpty)
              ? _buildEmptyState()
              : _buildNotesGrid(context),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => NoteWidget(
                title: "",
                content: "",
                isNew: true,
              ),
            ),
          );
        },
        icon: const Icon(Icons.add),
        label: const Text("Nueva nota"),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.note_alt_outlined, size: 80, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              "Aún no tienes notas",
              style: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.bold,
                color: Colors.grey.shade700,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              "Toca el botón de abajo para empezar a escribir.",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16.0, color: Colors.grey.shade500),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotesGrid(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(16.0),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 200, // Hace que sea responsivo (celular o tablet)
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
        childAspectRatio: 0.85, // Proporción de la tarjeta
      ),
      itemCount: userData["notes"].length,
      itemBuilder: (context, index) {
        final Map<String, dynamic> note = userData["notes"][index];
        return Card(
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => NoteWidget(
                    title: note["title"] ?? "",
                    content: note["content"] ?? "",
                    index: index,
                    isNew: false,
                  ),
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    note["title"] ?? "Sin título",
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
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