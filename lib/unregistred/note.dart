// ignore_for_file: deprecated_member_use, use_build_context_synchronously

import 'package:cloudbook/services/unregisted_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import './dashboard.dart';

class UnregistedNoteWidget extends StatefulWidget {
  final String title;
  final String content;
  final int? index;
  final bool isNew;

  const UnregistedNoteWidget({
    super.key,
    required this.title,
    required this.content,
    this.index,
    this.isNew = false,
  });

  @override
  State<UnregistedNoteWidget> createState() => _UnregistedNoteState();
}

class _UnregistedNoteState extends State<UnregistedNoteWidget> {
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
    content.text = widget.content;
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
              removeNote();
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

  Future<void> removeNote() async {
    if (widget.index == null) return;

    await deleteNote(widget.index!);

    if (!mounted) return;

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => UnregistedDashboard(),
      ),
      (route) => false,
    );
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
                onPressed: () async {
                  if (isPressed) return;

                  updateButtonState(true);

                  final note = Note(
                    titulo: title.text,
                    contenido: content.text,
                    index: widget.index ?? DateTime.now().millisecondsSinceEpoch,
                  );

                  await addNote(note);

                  updateButtonState(false);

                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                      builder: (context) => UnregistedDashboard(),
                    ),
                    (route) => false,
                  );
                }, 
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