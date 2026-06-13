// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/session_storage.dart';
import '../auth/login.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

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
  bool _isObscure = false;

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
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(30.0),
            child: Form(
              key: fgk,
              child: Container(
                width: double.infinity,
                constraints: const BoxConstraints(
                  maxWidth: 360
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 25.0,
                  vertical: 32.0
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[

                    const Text(
                      "¿Estás seguro de querer eliminar tu cuenta?",
                      style: TextStyle(
                        fontSize: 25.0,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20.0),

                    TextFormField(
                      controller: password,
                      keyboardType: TextInputType.text,
                      obscureText: _isObscure,
                      textInputAction: TextInputAction.next,
                      decoration: InputDecoration(
                        labelText: "Confirma tu contraseña",
                        hintText: "••••••••",
                        filled: true,
                        fillColor: Colors.grey.shade50,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide.none,
                        ),

                        suffixIcon: IconButton(
                          onPressed: () {
                            setState(() {
                              _isObscure = !_isObscure;
                            });
                          },
                          icon: Icon(
                            _isObscure ? Icons.visibility : Icons.visibility_off,
                          )
                        )
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "La contraseña es obligatoria";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 50.0),

                    SizedBox(
                      width: double.infinity,
                      height: 40.0,
                      child: ElevatedButton(
                        onPressed: isPressed ? null : _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isPressed ? Colors.blueGrey[200] : Colors.red[600],
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: Text(
                          isPressed ? "Eliminando tu cuenta..." : "Eliminar tu cuenta",
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600
                          ),
                        ),
                      ),
                    ),

                    SizedBox(height: 20.0,),
                    Text(
                      "¡Está acción no es reversible!",
                      style: TextStyle(
                        fontSize: 20.0,
                        color: Colors.red,
                        fontWeight: FontWeight(700)
                      ),
                    ),
                    SizedBox(height: 10.0,),
                    Text(
                      "v1.1.2",
                      style: TextStyle(
                        fontSize: 15.0,
                        color: Color.fromARGB(200, 0, 0, 0)
                      ),
                    ),
                  ],
                ),
              ),
            ),
          )
        )
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
        "Authorization": token,
        'cloudbook-api-key': dotenv.get("API_KEY")
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