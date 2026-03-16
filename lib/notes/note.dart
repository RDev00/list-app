// ignore_for_file: use_build_context_synchronously, non_constant_identifier_names, depend_on_referenced_packages, deprecated_member_use

import 'dart:convert';
import 'package:cloudbook/auth/login.dart';
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
  bool isPressed = false;
  
  bool isBold = false;
  bool isItalic = false;
  bool isUnderlined = false;
  bool isPreview = false;

  void updateButtonState(bool status){
    setState(() {
      isPressed = status;
    });
  }

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
    updateButtonState(true);
    
    String initialContentData = widget.content;
    final res = await decryptContent(initialContentData);
    if(res["content"] != null){
      setState(() {
        content.text = res["content"];
      });
      updateButtonState(false);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            "Ha ocurrido un error con tu nota. ¡Reportalo con nosotros para solucionarlo!\nError: ${res["error"] ?? "Ha ocurrido un error en el servidor"}"
          )
        )
      );
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => DashboardWidget()),
        (route) => false,
      );
    }
  }

  Future<void> saveNote() async {
    if(!mounted) return;
    if(title.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Primero ingresa un titulo")
        )
      );

      return;
    }
    updateButtonState(true);

    final token = await getSession();
    if(token == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Sesión expirada.")
        )
      );
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => LogInForm()),
        (route) => false
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
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => DashboardWidget()),
        (route) => false,
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

  Future<void> deleteNote() async {
    if(!mounted) return;
    int? noteIndex = widget.index;
    if(noteIndex!.isNaN) return;
    updateButtonState(true);

    String? token = await getSession();
    if(token!.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Sesión expirada.")
        )
      );
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => LogInForm()),
        (route) => false
      );
      return;
    }

    final res = await DeleteNote(token, noteIndex);

    if(res!["error"] != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            "${res["message"] ?? "Ha ocurrido un error en el servidor"}. ¡Reportalo para poder solucionarlo!\nError: ${res["error"] ?? "Error en el servidor"}"
          )
        )
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            "Nota borrada con éxito!"  
          ),
        )
      );
    }
    
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (_) => DashboardWidget()),
      (route) => false
    );
    return;
  }

  void _showDeleteConfirmation() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Eliminar nota"),
        content: Text("¿Estás seguro de que deseas eliminar esta nota?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text("Cancelar"),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              deleteNote();
            },
            child: Text("Eliminar", style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  Future<bool> _onBackPressed(BuildContext context) async {
    return await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Salir"),
        content: Text("¿Seguro que quieres salir sin guardar?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(
              "Cancelar",
              style: TextStyle(
                color: Colors.redAccent
              ),
            ),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(
              "Salir",
              style: TextStyle(
                color: Colors.blue
              ),
            ),
          ),
        ],
      ),
    ) ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => _onBackPressed(context),
      child: Scaffold(
        appBar: AppBar(
          elevation: 0,
          title: Text(isPreview ? "Modo Lectura" : "Modo Edición"),
          actions: [
            widget.index != null && widget.index! >= 0 ? IconButton(
              icon: Icon(Icons.delete_outline, color: Colors.redAccent),
              onPressed: widget.index != null && widget.index! >= 0 
                ? () => _showDeleteConfirmation() 
                : null,
              tooltip: "Eliminar nota",
            ) : SizedBox(height: 0.0,),
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
                onPressed: () { isPressed ? null : saveNote(); }, 
                icon: Icon(isPressed ? Icons.replay_outlined : Icons.check, size: 18),
                label: Text(isPressed ? "Cargando..." : "Guardar"),
                style: FilledButton.styleFrom(
                  backgroundColor: isPressed ? Colors.grey[600] : Colors.blue[600],
                )
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

Future<Map<String, dynamic>?> DeleteNote(String token, int index) async {
  try {
    final url = Uri.parse("https://list-app-iota.vercel.app/api/notes");
    final res = await http.delete(
      url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: jsonEncode({"noteIndex": index + 1})
    );

    final data = jsonDecode(res.body);
    return data;
  } catch(err) {
    return {
      "message": "Ha ocurrido un error en el servidor",
      "error": err.toString()
    };
  }
}