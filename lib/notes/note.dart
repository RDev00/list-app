// ignore_for_file: use_build_context_synchronously, non_constant_identifier_names, depend_on_referenced_packages

import 'dart:convert';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/session_storage.dart';
import '../dashboard.dart';

class NoteWidget extends StatefulWidget {
  final String title;
  final String content;
  final int? index;
  final bool isNew;

  const NoteWidget({
    super.key,
    required this.title,
    required this.content,
    this.index,
    this.isNew = false,
  });

  @override
  State<NoteWidget> createState() {
    return _NoteState();
  }
}

class _NoteState extends State<NoteWidget> {
  final TextEditingController title = TextEditingController();
  final TextEditingController content = TextEditingController();
  
  bool isBold = false;
  bool isItalic = false;
  bool isUnderlined = false;
  bool isPreview = false;

  @override
  void initState() {
    super.initState();
    title.text = widget.title;
    content.text = "Cargando tu texto...";
    if(widget.content.isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        getDecryptedContent();
      });
    } else {
      setState(() {
        content.text = "";
      });
    }
    if (!widget.isNew) {
      isPreview = true;
    }
  }

  Future<void> getDecryptedContent() async{
    if(!mounted) return;
    
    String initialContentData = widget.content;
    final res = await decryptContent(initialContentData);
    if(res["error"] != null){
      String message = res["message"];
      String error = res["error"];
      final errorSnackBar = SnackBar(content: Text("$message, Error: $error"));
      ScaffoldMessenger.of(context).showSnackBar(errorSnackBar); } else { String message = res["message"];
      final success = SnackBar(content: Text(message)); ScaffoldMessenger.of(context).showSnackBar(success);
      setState(() {
        content.text = res["content"];
        });
      }
    }

  Future<void> saveNote() async {
    if(!mounted) return;

    final token = await getSession();
    if(token == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("No hay sesión activa")),
      );
      return;
    }

    Map<String,dynamic> res;

    if(widget.isNew){
      res = await SaveNote(title.text, content.text, token);
    }else{
      res = await UpdateNote(widget.index!, title.text, content.text, token);
    }

    if(!mounted) return;

    if(res["statusCode"] == 200){
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(res["message"] ?? "Nota guardada")),
      );

      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => DashboardWidget()),
        (route) => false,
      );
    }else{
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(res["message"] ?? "Error al guardar")),
      );
    }
  }

  void applyStyle(String prefix, String suffix) {
    final text = content.text;
    final selection = content.selection;

    if (!selection.isValid) return;

    String newText;
    int newOffset;

    if (selection.isCollapsed) {
      newText = text.replaceRange(selection.start, selection.end, "$prefix$suffix");
      newOffset = selection.start + prefix.length;
    } else {
      newText = text.replaceRange(
        selection.start,
        selection.end,
        "$prefix${selection.textInside(text)}$suffix",
      );
      newOffset = selection.end + prefix.length + suffix.length;
    }

    content.value = TextEditingValue(
      text: newText,
      selection: TextSelection.collapsed(offset: newOffset),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        title: Text(isPreview ? "Modo Lectura" : "Modo Edición"),
        actions: [
          IconButton(
            icon: Icon(isPreview ? Icons.edit_outlined : Icons.visibility_outlined),
            tooltip: isPreview ? "Editar" : "Vista previa",
            onPressed: () {
              setState(() {
                isPreview = !isPreview;
              });
            },
          ),
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: FilledButton.icon(
              onPressed: () { saveNote(); }, 
              icon: const Icon(Icons.check, size: 18),
              label: const Text("Guardar"),
            ),
          )
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
            child: TextField(
              controller: title,
              readOnly: isPreview, 
              decoration: InputDecoration(
                hintText: "Título de tu nota",
                hintStyle: TextStyle(color: Colors.grey.shade400),
                border: InputBorder.none,
              ),
              style: const TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          if (!isPreview)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              decoration: BoxDecoration(
                // ignore: deprecated_member_use
                color: Theme.of(context).colorScheme.surfaceContainerHighest.withOpacity(0.5),
                border: Border(
                  top: BorderSide(color: Colors.grey.shade300),
                  bottom: BorderSide(color: Colors.grey.shade300),
                ),
              ),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.format_bold),
                    onPressed: () => applyStyle("**", "**"),
                  ),
                  IconButton(
                    icon: const Icon(Icons.format_italic),
                    onPressed: () => applyStyle("_", "_"),
                  ),
                  IconButton(
                    icon: const Icon(Icons.format_strikethrough),
                    onPressed: () => applyStyle("~~", "~~"),
                  ),
                ],
              ),
            ),

          Expanded(
            child: isPreview 
              ?
                Markdown(
                  data: content.text.isEmpty ? "*Aún no hay contenido...*" : content.text,
                  padding: const EdgeInsets.all(24),
                  styleSheet: MarkdownStyleSheet(
                    p: const TextStyle(fontSize: 16, height: 1.5),
                    h1: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                )
              :
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: TextField(
                    controller: content,
                    expands: true,
                    maxLines: null,
                    textAlignVertical: TextAlignVertical.top,
                    decoration: const InputDecoration(
                      hintText: "Escribe tus ideas aquí...",
                      border: InputBorder.none,
                    ),
                    style: const TextStyle(fontSize: 16, height: 1.5),
                  ),
                ),
          ),
        ],
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

Future<Map<String, dynamic>> UpdateNote(
  int noteIndex,
  String title,
  String content,
  String token
) async {
  try {

    final url = Uri.parse(
      "https://list-app-iota.vercel.app/api/notes"
    );

    final res = await http.put(
      url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: jsonEncode({
        "updatedTitle": title,
        "updatedContent": content,
        "noteIndex": noteIndex + 1
      }),
    );

    final body = jsonDecode(res.body);

    if(res.statusCode == 200){
      return {
        "statusCode": 200,
        "message": body["message"]
      };
    }else{
      return {
        "statusCode": res.statusCode,
        "message": body["message"] ?? "Error al actualizar la nota",
        "error": body["error"]
      };
    }

  } catch(err){
    return {
      "statusCode": 500,
      "message": "Hubo un error en el servidor",
      "error": err.toString(),
    };
  }
}