"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Send, Trash2, Zap, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComplaintService } from "@/services/complaintService";

const categories = [
  "Garbage Overflow",
  "Sweeping Not Done",
  "Debris Waste",
  "Garden Waste",
  "Drain Blockage",
  "Dead Animal",
  "Public Toilet",
  "Street Littering",
];

export default function RaiseComplaint() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [landmark, setLandmark] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    
    setIsSubmitting(true);
    try {
      // In a real app, these would come from the user's session and geolocation
      const mockComplaintData = {
        title: selectedCategory,
        description: description || `Issue with ${selectedCategory} at ${landmark}`,
        category: selectedCategory,
        lat: 19.0760 + (Math.random() - 0.5) * 0.01,
        lng: 72.8777 + (Math.random() - 0.5) * 0.01,
        address: landmark || "Market Square, Sector 4",
        wardId: "ward-a-id", // This should be looked up via GIS or selected
        citizenId: "citizen-id", // From auth session
      };

      await ComplaintService.createComplaint(mockComplaintData);
      router.push("/citizen");
    } catch (error) {
      console.error("Failed to create complaint:", error);
      alert("Failed to register complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-card sticky top-0 z-10 flex items-center justify-between">
        <h1 className="font-bold text-lg">New Complaint</h1>
        <Link href="/citizen" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 flex-1 overflow-y-auto">
        
        {/* Category Selection */}
        <section>
          <label className="text-sm font-semibold mb-3 block">1. Select Category *</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  selectedCategory === cat 
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/20" 
                    : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* AI Priority Auto Detection */}
        {selectedCategory === "Dead Animal" || selectedCategory === "Drain Blockage" ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 flex gap-3 items-start"
          >
            <Zap className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">AI Priority: High</p>
              <p className="text-[11px] text-orange-600/80 dark:text-orange-400/80 mt-0.5">
                This category typically requires immediate action to prevent health hazards.
              </p>
            </div>
          </motion.div>
        ) : null}

        {/* Location Section */}
        <section>
          <label className="text-sm font-semibold mb-3 block">2. Location Details *</label>
          <div className="space-y-3">
            <button type="button" className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors text-left">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Current Location</p>
                  <p className="text-xs text-muted-foreground">Accuracy: 12 meters</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Auto</span>
            </button>
            
            <input 
              type="text" 
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Landmark (Optional)" 
              className="w-full p-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
        </section>

        {/* Photo Upload Section */}
        <section>
          <label className="text-sm font-semibold mb-3 block">3. Upload Photos *</label>
          <div className="grid grid-cols-3 gap-3">
            <button type="button" className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-secondary/50 transition-colors">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-medium">Add Photo</span>
            </button>
          </div>
        </section>

        {/* Description Section */}
        <section>
          <label className="text-sm font-semibold mb-3 block">4. Additional Details</label>
          <textarea 
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue clearly..." 
            className="w-full p-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
          />
        </section>

        <div className="pt-4 pb-24">
          <button 
            type="submit"
            disabled={!selectedCategory || isSubmitting}
            className="w-full py-4 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/25 flex justify-center items-center gap-2 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Complaint
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
