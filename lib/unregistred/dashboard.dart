import 'package:cloudbook/auth/login.dart';
import 'package:flutter/material.dart';
import '../dashboard.dart';
import '../services/session_storage.dart';
import '../services/unregisted_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import './note.dart';

class UnregistedDashboard extends StatefulWidget {
  const UnregistedDashboard({super.key});

  @override
  State<UnregistedDashboard> createState() => _UnregistedDashboard();
}

class _UnregistedDashboard extends State<UnregistedDashboard> {
  final Uri aboutMDUri = Uri.parse("https://cloudbook.ravexcode.com/about-md");
  List<Note> userData = [];

  final Uri reportBugsUri =
      Uri.parse("https://cloudbook.ravexcode.com/bug-reports");

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      verifySessionStatus();
      updateUserData();
    });
  }

  Future<void> verifySessionStatus() async {

    final session = await checkSession();

    if (session) {
      if (!mounted) return;

      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(
          builder: (context) => DashboardWidget(),
        ),
        (route) => false,
      );

      return;
    }

    return;
  }

  Future<void> updateUserData() async {
    if(!mounted) return;
    final notes = await loadNotes();

    setState(() {
      userData = notes;
    });

    return;
  }

  void redirectToLogin() {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => LogInWidget(),
      ),
      (route) => false,
    );
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
                    leading: const Icon(Icons.login),
                    title: const Text("Iniciar sesión"),
                    onTap: redirectToLogin,
                  ),
                  ListTile(
                    leading: Icon(Icons.bug_report_outlined),
                    title: Text("Reportar un error"),
                    onTap: () async {
                      await launchUrl(reportBugsUri);
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
                  color: Color.fromARGB(200, 0, 0, 0),
                ),
              ),
            ),
          ],
        ),
      ),

      body: userData.isEmpty
          ? _buildEmptyState()
          : _buildNotesGrid(context),

      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => UnregistedNoteWidget(
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
            Icon(Icons.note_alt_outlined,
                size: 80, color: Colors.grey.shade400),
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
              style: TextStyle(
                  fontSize: 16.0,
                  color: Colors.grey.shade500),
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
        maxCrossAxisExtent: 200,
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
        childAspectRatio: 0.85,
      ),
      itemCount: userData.length,
      itemBuilder: (context, index) {
        final Note note = userData[index];
        return Card(
          elevation: 2,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16)),
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => UnregistedNoteWidget(
                    title: note.titulo,
                    content: note.contenido,
                    index: note.index,
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
                    note.titulo.isEmpty
                        ? "Sin título"
                        : note.titulo,
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