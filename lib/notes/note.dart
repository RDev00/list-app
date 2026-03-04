// ignore_for_file: use_build_context_synchronously, non_constant_identifier_names

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/session_storage.dart';

class NoteWidget extends StatefulWidget {
  final String initialTitle;
  final String initialContent;

  const NoteWidget({
    super.key,
    this.initialTitle = "",
    this.initialContent = "", required String content,
  });

  @override
  State<NoteWidget> createState() {
    return _NoteState();
  }
}

class _NoteState extends State<NoteWidget> {
  final fgk = GlobalKey<FormState>();
  final TextEditingController title = TextEditingController();
  final TextEditingController content = TextEditingController();
  
  bool isBold = false;
  bool isItalic = false;
  bool isUnderlined = false;

  @override
  void initState() {
    super.initState();
    title.text = widget.initialTitle;
    content.text = widget.initialContent;
    getDecryptedContent();
  }

  Future<void> getDecryptedContent() async{
    if(!fgk.currentState!.validate()) return;
    if(!mounted) return;

    final res = await decryptContent(content.text);

    if(res["error"] != null) {
      String message = res["message"];
      String error = res["error"];
      final errorSnackBar = SnackBar(content: Text("$message, Error: $error"));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar);
    } else {
      String message = res["message"];
      final success = SnackBar(content: Text(message));
      ScaffoldMessenger.of(context).showSnackBar(success);
      setState(() {
        content.text = res["content"];
      });
    }
  }

  Future<void> saveNote() async {
    if(!fgk.currentState!.validate()) return;
    if(!mounted) return;

    final token = await getSession();
    if(token == null) {
      if(!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("No hay sesión activa")),
      );
      return;
    }

    final res = await SaveNote(title.text, content.text, token);
    
    if(!mounted) return;
    
    if(res["statusCode"] == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(res["message"] ?? "Nota guardada")),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(res["message"] ?? "Error al guardar")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("CloudBook"),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: saveNote,
            tooltip: "Guardar nota",
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: fgk,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Title
              TextField(
                controller: title,
                decoration: const InputDecoration(
                  hintText: "Título",
                  border: InputBorder.none,
                  isDense: true,
                ),
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              
              // Text formatting buttons
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.format_bold),
                    onPressed: () {
                      setState(() {
                        isBold = !isBold;
                      });
                    },
                    isSelected: isBold,
                    tooltip: "Negrita",
                  ),
                  IconButton(
                    icon: const Icon(Icons.format_italic),
                    onPressed: () {
                      setState(() {
                        isItalic = !isItalic;
                      });
                    },
                    isSelected: isItalic,
                    tooltip: "Cursiva",
                  ),
                  IconButton(
                    icon: const Icon(Icons.format_underlined),
                    onPressed: () {
                      setState(() {
                        isUnderlined = !isUnderlined;
                      });
                    },
                    isSelected: isUnderlined,
                    tooltip: "Subrayado",
                  ),
                  const Spacer(),
                  // Botón para reset de estilos
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () {
                      setState(() {
                        isBold = false;
                        isItalic = false;
                        isUnderlined = false;
                      });
                    },
                    tooltip: "Limpiar estilos",
                  ),
                ],
              ),
              const SizedBox(height: 16),
              
              // Content
              TextField(
                controller: content,
                decoration: const InputDecoration(
                  hintText: "Contenido",
                  border: InputBorder.none,
                ),
                maxLines: null,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
                  fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
                  decoration: isUnderlined ? TextDecoration.underline : TextDecoration.none,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    title.dispose();
    content.dispose();
    super.dispose();
  }
}

Future<Map<String, dynamic>> decryptContent(String content) async {
  try {
    final url = Uri.parse('https://list-app-iota.vercel.app/api/notes/decrypt');
    final res = await http.post(
      url,
      headers: { "Content-Type": "application/json" },
      body: jsonEncode({"content": content}),
    );

    final body = jsonDecode(res.body);

    if(res.statusCode == 200) {
      return {
        "message": body["message"],
        "content": body["content"]
      };
    } else {
      return {
        "message": body["message"],
        "error": body["error"]
      };
    }
  } catch(err) {
    return {
      "message": "Hubo un error en el servidor",
      "error": err,
    };
  }
}

Future<Map<String, dynamic>> SaveNote(String title, String content, String token) async {
  try {
    final url = Uri.parse('https://list-app-iota.vercel.app/api/notes');
    final res = await http.post(
      url,
      headers: {
        "Content-Type": "application/json",
        "authorization": token,
      },
      body: jsonEncode({"title": title, "content": content}),
    );

    final body = jsonDecode(res.body);

    if(res.statusCode == 200) {
      return {
        "statusCode": 200,
        "message": body["message"],
        "content": body["content"]
      };
    } else {
      return {
        "statusCode": res.statusCode,
        "message": body["message"] ?? "Error al guardar la nota",
        "error": body["error"]
      };
    }
  } catch(err) {
    return {
      "statusCode": 500,
      "message": "Hubo un error en el servidor",
      "error": err,
    };
  }
}