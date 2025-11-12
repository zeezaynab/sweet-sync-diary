import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NoteCard } from "./NoteCard";

interface Note {
  id: string;
  sender: "zainab" | "rayyan";
  message: string;
  created_at: string;
}

interface DiaryPageProps {
  onNavigateBack: () => void;
}

export const DiaryPage = ({ onNavigateBack }: DiaryPageProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedSender, setSelectedSender] = useState<"zainab" | "rayyan">("zainab");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('notes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notes'
        },
        (payload) => {
          const newNote = payload.new as Note;
          setNotes((current) => [newNote, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      toast.error("Failed to load notes");
      console.error(error);
    } else {
      setNotes(data || []);
    }
  };

  const handleAddNote = async () => {
    if (!newMessage.trim()) {
      toast.error("Please write a message");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('notes')
      .insert([{ sender: selectedSender, message: newMessage.trim() }]);

    if (error) {
      toast.error("Failed to add note");
      console.error(error);
    } else {
      toast.success("Note added ♡");
      setNewMessage("");
      setIsModalOpen(false);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-baloo font-semibold text-foreground">
            Our Diary ♡
          </h1>
        </div>
      </header>

      {/* Notes list */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg font-baloo">
              No notes yet. Start writing! ✨
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl hover:shadow-xl transition-all hover:scale-110"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-baloo text-2xl">Add Note ♡</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="font-medium">Who's writing?</Label>
              <RadioGroup
                value={selectedSender}
                onValueChange={(value) => setSelectedSender(value as "zainab" | "rayyan")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zainab" id="zainab" />
                  <Label htmlFor="zainab" className="cursor-pointer font-baloo">
                    Zainab
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rayyan" id="rayyan" />
                  <Label htmlFor="rayyan" className="cursor-pointer font-baloo">
                    Rayyan
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNote} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Note"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
