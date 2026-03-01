// Main Application File
// Entry point for the Flutter application.
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Truce App',
      home: Scaffold(
        appBar: AppBar(title: Text('Truce App')),
        body: Center(child: Text('Welcome to Truce!')),
      ),
    );
  }
}