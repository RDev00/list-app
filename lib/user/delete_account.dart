// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/session_storage.dart';
import '../auth/login.dart';

class DeleteAccountForm extends StatefulWidget {
  const DeleteAccountForm({super.key});

  @override
  State<DeleteAccountForm> createState() => _DeleteAccountForm();
}

class _DeleteAccountForm extends State<DeleteAccountForm> {
  final fgk = GlobalKey<FormState>();
  final TextEditingController password = TextEditingController();
  final TextEditingController passwordConfirm = TextEditingController();
  bool isPressed = false;

  Future<void> _submitForm() async {
    if(!fgk.currentState!.validate()) return;
    if(!mounted) return;

    isPressed = true;
    String? passwordString = password.text;
    String? passwordConfirmString = passwordConfirm.text;

    String? token = await getSession();

    if(token == null || token.isEmpty){
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const LogInWidget()),
        (route) => false
      );
      isPressed = false;
      return;
    }

    if(
      passwordString.isEmpty ||
      passwordConfirmString.isEmpty ||
      passwordString != passwordConfirmString
    ) {
      isPressed = false;
      return;
    }

    final res = await deleteAccount(token, passwordString);

    if(res!.isEmpty || res["error"] != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("${
        res["message"] ?? "Ha ocurrido un error en el servidor"
      }. Error: ${
        res["error"] ?? "servidor no encontrado"
      }")));
      isPressed = false;
      return;
    }

    await closeSession();
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => LogInForm()
      ),
      (route) => false
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("CloudBook"),
      ),
      body: Center(
        child: Form(
          key: fgk,
          child: Column(
            children: [
              Container(
                width: 300.0,
                height: 350.0,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 245, 245, 245),
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                      color: Color.fromARGB(50,0,0,0),
                      blurRadius: 15,
                      spreadRadius: 5,
                      offset: Offset(0, 15)
                    )
                  ]
                ),
                child: Column(
                  children: <Widget>[
                    Text(
                      "Eliminar cuenta",
                      style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.w500
                      ),
                    ),
                    SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: password,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: "Contraseña",
                          hintText: "Contraseña segura",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(5, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "La contraseña es de caracter obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    SizedBox(height: 20.0,),
                    SizedBox(
                      width: 250.0,
                      child: TextFormField(
                        controller: passwordConfirm,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: "Confirmación",
                          hintText: "Contraseña segura",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          filled: true,
                          fillColor: const Color.fromARGB(5, 0, 0, 0)
                        ),
                        validator: (value) {
                          if(value!.isEmpty) {
                            return "La contraseña es de caracter obligatorio";
                          }
                          return null;
                        },
                      ),
                    ),
                    SizedBox(height: 40.0,),
                    SizedBox(
                      width: 200.0,
                      child: ElevatedButton(
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? const Color.fromARGB(255, 83, 83, 83) : Colors.red[600],
                          foregroundColor: Colors.white,
                        ),
                        child: Text("Eliminar cuenta"),
                      ),
                    ),
                    SizedBox(height: 20.0),
                    SizedBox(
                      width: 280.0,
                      child: Text(
                        'El presionar "Eliminar cuenta" borrará la cuenta de manera permanente, los datos no podrán ser recuperados más tarde.',
                        style: TextStyle(
                          fontSize: 15.0,
                          color: Color.fromARGB(150, 0, 0, 0),
                        ),
                        textAlign: TextAlign.center,
                      ),
                    )
                  ],
                ),
              ),
            ]  
          )
        ),
      ),
    );
  }
}

Future<Map<String, dynamic>?> deleteAccount(String token, String password) async {
  try {
    final url = Uri.parse("https://cloudbook.ravexcode.com/api/users");
    final res = await http.delete(
      url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: jsonEncode({ "password": password }),
    );

    final data = jsonDecode(res.body);

    if(res.statusCode == 200) {
      return data;
    } else {
      return {
        "message": data["message"],
        "error": data["error"],
      };
    }
  } catch(err) {
    return {
      "message": "Ha ocurrido un error en el servidor",
      "error": err,
    };
  }
}