import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class WorkerDashboard extends StatelessWidget {
  const WorkerDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text("Worker Hub", style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(icon: const Icon(LucideIcons.bell), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildStatusCard(),
            const SizedBox(height: 24),
            const Text("Today's Targets", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            _buildTaskItem("Garbage at Sector 4", "HIGH", "9:00 AM"),
            _buildTaskItem("Drain Blockage - Ward 2", "CRITICAL", "10:30 AM"),
            const SizedBox(height: 24),
            _buildPerformanceWidget(),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildStatusCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [Color(0xFF10B981), Color(0xFF059669)]),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.emerald.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Shift Status", style: TextStyle(color: Colors.white70, fontSize: 12)),
              Text("ON DUTY", style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
            ],
          ),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.emerald),
            child: const Text("End Shift"),
          )
        ],
      ),
    );
  }

  Widget _buildTaskItem(String title, String priority, String time) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: priority == "CRITICAL" ? Colors.rose.withOpacity(0.1) : Colors.orange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              priority == "CRITICAL" ? LucideIcons.zap : LucideIcons.alertTriangle,
              color: priority == "CRITICAL" ? Colors.rose : Colors.orange,
              size: 20,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(time, style: const TextStyle(color: Colors.slate500, fontSize: 12)),
              ],
            ),
          ),
          const Icon(LucideIcons.chevronRight, color: Colors.slate300),
        ],
      ),
    );
  }

  Widget _buildPerformanceWidget() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildMetric("85%", "Score"),
          _buildMetric("12", "Done"),
          _buildMetric("2", "Pending"),
        ],
      ),
    );
  }

  Widget _buildMetric(String value, String label) {
    return Column(
      children: [
        Text(value, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 10)),
      ],
    );
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      selectedItemColor: const Color(0xFF10B981),
      unselectedItemColor: Colors.slate400,
      showUnselectedLabels: true,
      items: const [
        BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: "Home"),
        BottomNavigationBarItem(icon: Icon(LucideIcons.list), label: "Tasks"),
        BottomNavigationBarItem(icon: Icon(LucideIcons.map), label: "Route"),
        BottomNavigationBarItem(icon: Icon(LucideIcons.user), label: "Profile"),
      ],
    );
  }
}
