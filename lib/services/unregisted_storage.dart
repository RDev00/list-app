import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'dart:convert';

class Note {
  String titulo;
  String contenido;
  int index;

  Note({
    required this.titulo,
    required this.contenido,
    required this.index
  });

  Map<String, dynamic> toJson() {
    return {
      "titulo": titulo,
      "contenido": contenido,
      "index": index
    };
  }

  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      titulo: json["titulo"],
      contenido: json["contenido"],
      index: json["index"]
    );
  }
}

Future<File> getNotesFile() async{
  final dir = await getApplicationDocumentsDirectory();
  return File('${dir.path}/notes.json');
}

Future<void> saveNotes(List<Note> notes) async {
  final file = await getNotesFile();

  List<Map<String, dynamic>> jsonList =
      notes.map((n) => n.toJson()).toList();

  await file.writeAsString(jsonEncode(jsonList));
}

Future<List<Note>> loadNotes() async {
  final file = await getNotesFile();

  if (!await file.exists()) return [];

  String content = await file.readAsString();
  List data = jsonDecode(content);

  return data.map((e) => Note.fromJson(e)).toList();
}

Future<void> addNote(Note note) async {
  List<Note> notes = await loadNotes();

  int index = notes.indexWhere((n) => n.index == note.index);

  if (index >= 0) {
    notes[index] = note;
  } else {
    notes.add(note);
  }

  await saveNotes(notes);
}

Future<void> deleteNote(int index) async {
  List<Note> notes = await loadNotes();

  notes.removeWhere((note) => note.index == index);

  await saveNotes(notes);
}
