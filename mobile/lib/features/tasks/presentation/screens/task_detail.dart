import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class TaskDetail extends StatefulWidget {
  final String taskId;
  const TaskDetail({super.key, required this.taskId});

  @override
  State<TaskDetail> createState() => _TaskDetailState();
}

class _TaskDetailState extends State<TaskDetail> {
  String status = "ASSIGNED";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Complaint: ${widget.taskId}")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildInfoSection(),
          const SizedBox(height: 32),
          const Text("Execution Workflow", style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          _buildTimeline(),
          const SizedBox(height: 32),
          _buildProofSection(),
        ],
      ),
      bottomNavigationBar: _buildActionFooter(),
    );
  }

  Widget _buildInfoSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Badge(label: "HIGH PRIORITY", color: Colors.orange),
        const SizedBox(height: 12),
        const Text("Garbage Overflow at Market St.", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Row(
          children: [
            const Icon(LucideIcons.mapPin, size: 14, color: Colors.slate400),
            const SizedBox(width: 4),
            const Text("Ward 4, Sector 12, Mumbai", style: TextStyle(color: Colors.slate500)),
            const Spacer(),
            TextButton.icon(
              onPressed: () {},
              icon: const Icon(LucideIcons.navigation, size: 16),
              label: const Text("Navigate"),
            )
          ],
        ),
      ],
    );
  }

  Widget _buildTimeline() {
    return Column(
      children: [
        _buildTimelineStep("Accepted", "10:30 AM", true),
        _buildTimelineStep("Reached Site", "--:--", false),
        _buildTimelineStep("Work Started", "--:--", false),
        _buildTimelineStep("Completed", "--:--", false),
      ],
    );
  }

  Widget _buildTimelineStep(String label, String time, bool isDone) {
    return Row(
      children: [
        Column(
          children: [
            CircleAvatar(
              radius: 6,
              backgroundColor: isDone ? Colors.emerald : Colors.slate200,
            ),
            Container(width: 2, height: 30, color: Colors.slate100),
          ],
        ),
        const SizedBox(width: 16),
        Text(label, style: TextStyle(color: isDone ? Colors.black : Colors.slate400, fontWeight: isDone ? FontWeight.bold : FontWeight.normal)),
        const Spacer(),
        Text(time, style: const TextStyle(color: Colors.slate400, fontSize: 12)),
      ],
    );
  }

  Widget _buildProofSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text("Proof of Work", style: TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildImagePicker("Before Cleaning"),
            const SizedBox(width: 16),
            _buildImagePicker("After Cleaning"),
          ],
        ),
      ],
    );
  }

  Widget _buildImagePicker(String label) {
    return Expanded(
      child: Column(
        children: [
          Container(
            aspectRatio: 1,
            decoration: BoxDecoration(
              color: Colors.slate50,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.slate200, style: BorderStyle.none),
            ),
            child: const Icon(LucideIcons.camera, color: Colors.slate300, size: 32),
          ),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontSize: 10, color: Colors.slate500)),
        ],
      ),
    );
  }

  Widget _buildActionFooter() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.emerald,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 56),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        child: const Text("UPDATE STATUS", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1)),
      ),
    );
  }
}

class Badge extends StatelessWidget {
  final String label;
  final Color color;
  const Badge({super.key, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
      child: Text(label, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold)),
    );
  }
}
