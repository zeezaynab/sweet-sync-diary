import { format } from "date-fns";

interface Note {
  id: string;
  sender: "zainab" | "rayyan";
  message: string;
  created_at: string;
}

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const isZainab = note.sender === "zainab";
  
  return (
    <div
      className={`flex ${isZainab ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
    >
      <div
        className={`relative max-w-[85%] sm:max-w-md p-5 rounded-[25px] shadow-lg ${
          isZainab
            ? "bg-note-zainab rotate-1"
            : "bg-note-rayyan -rotate-1"
        }`}
      >
        {/* Tape effect */}
        <div
          className={`absolute -top-3 ${
            isZainab ? "right-8" : "left-8"
          } w-16 h-6 bg-accent/30 backdrop-blur-sm rounded-sm -rotate-6`}
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-baloo font-semibold text-foreground capitalize">
              {note.sender}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(note.created_at), "MMM d, h:mm a")}
            </span>
          </div>
          <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed">
            {note.message}
          </p>
        </div>
      </div>
    </div>
  );
};
