import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class SupervisorDashboard extends StatelessWidget {
  const SupervisorDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Operations Control"),
        actions: [
          IconButton(icon: const Icon(LucideIcons.map), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          _buildQuickStats(),
          const Divider(),
          Expanded(child: _buildWorkerList()),
        ],
      ),
    );
  }

  Widget _buildQuickStats() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildStat("42", "Active Workers", Colors.blue),
          _buildStat("12", "Urgent Tasks", Colors.orange),
          _buildStat("5", "SLA Breach", Colors.rose),
        ],
      ),
    );
  }

  Widget _buildStat(String val, String label, Color color) {
    return Column(
      children: [
        Text(val, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
        Text(label, style: const TextStyle(fontSize: 10, color: Colors.slate500)),
      ],
    );
  }

  Widget _buildWorkerList() {
    return ListView.separated(
      padding: const EdgeInsets.all(20),
      itemCount: 5,
      separatorBuilder: (_, __) => const SizedBox(height: 16),
      itemBuilder: (context, index) {
        return _buildWorkerItem("Worker ${index + 1}", index % 2 == 0 ? "IN FIELD" : "ON BREAK");
      },
    );
  }

  Widget _buildWorkerItem(String name, String status) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.slate100),
      ),
      child: Row(
        children: [
          const CircleAvatar(backgroundColor: Color(0xFFE2E8F0), child: Icon(LucideIcons.user, size: 20)),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(status, style: TextStyle(color: status == "IN FIELD" ? Colors.emerald : Colors.orange, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white, elevation: 0),
            child: const Text("Assign"),
          ),
        ],
      ),
    );
  }
}
