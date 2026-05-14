// ignore_for_file: use_build_context_synchronously, duplicate_ignore

import 'package:cloudbook/unregistred/dashboard.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../notes/note.dart';
import '../user/change_password.dart';
import 'services/session_storage.dart';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;
import 'dart:convert';
import './user/delete_account.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DashboardWidget extends StatefulWidget {
  const DashboardWidget({super.key});

  @override
  State<DashboardWidget> createState() => _DashboardWidgetState();
}

class _DashboardWidgetState extends State<DashboardWidget> {
  final Uri aboutMDUri = Uri.parse("https://cloudbook.ravexcode.com/about-md");
  final fgk = GlobalKey<FormState>();
  final TextEditingController title = TextEditingController();
  final TextEditingController content = TextEditingController();
  Map<String, dynamic> userData = {};
  final Uri reportBugsUri = Uri.parse("https://cloudbook.ravexcode.com/bug-reports");

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
        MaterialPageRoute(builder: (_) => const UnregistedDashboard())
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
          builder: (context) => UnregistedDashboard(),
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

  void showInfoPopUp() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Información"),
        content: SizedBox(
          width: 300.0,
          height: 500.0,
          child: Column(
            children: [
              Text(
                "¿Cómo funciona el formato de las notas?",
                style: TextStyle(
                  fontSize: 20.0,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 15.0,),
              Text(
                "Las notas funcionan con el formato MD, por lo que en la sección al cual podrás acceder presionando el botón que indica 'Ingresar' te damos una introducción al formato, desde el uso más simple como negritas hasta el uso más complejo que sería ingresar imágenes o hacer tablas, todo esto solo con caracteres ASCII."
              )
            ],
          ),
          
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              "Cerrar",
              style: TextStyle(
                color: Colors.redAccent
              ),
            ),
          ),
          TextButton(
            onPressed: () => launchUrl(aboutMDUri),
            child: Text(
              "Ingresar",
              style: TextStyle(
                color: Colors.blue,
              ),
            ),
          )
        ],
      )
    );
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
          IconButton(
            icon: Icon(Icons.info_outline),
            tooltip: "Información",
            onPressed: showInfoPopUp,
          )
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
                        MaterialPageRoute(builder: (context) => UnregistedDashboard()),
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
                "© CloudBook 2026 - v1.1.0",
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
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white
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
    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users");
    final response = await http.get(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'cloudbook-api-key': dotenv.get("API_KEY")
      },
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
    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users");
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'cloudbook-api-key': dotenv.get("API_KEY")
      },
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