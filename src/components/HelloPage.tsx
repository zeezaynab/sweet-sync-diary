import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share2 } from "lucide-react";
import carousel1 from "@/assets/carousel-1.png";
import carousel2 from "@/assets/carousel-2.png";
import carousel3 from "@/assets/carousel-3.png";

interface HelloPageProps {
  onNavigateToDiary: () => void;
}

const slides = [
  { image: carousel1, caption: "I know you're mad" },
  { image: carousel2, caption: "so I made this for you" },
  { image: carousel3, caption: "please don't be mad" },
];

export const HelloPage = ({ onNavigateToDiary }: HelloPageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-2xl border-2 border-border">
          {/* Instagram-style header */}
          <div className="flex items-center gap-3 p-3 bg-background border-b border-border">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-primary">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="font-semibold text-foreground">rayyan</span>
          </div>

          <div className="relative aspect-square bg-muted">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].caption}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-all shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-primary w-6"
                      : "bg-background/60 backdrop-blur-sm"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Instagram-style action buttons */}
          <div className="flex items-center gap-4 p-3 bg-background border-t border-border">
            <button className="hover:opacity-70 transition-opacity" aria-label="Like">
              <Heart className="w-6 h-6 text-foreground" />
            </button>
            <button className="hover:opacity-70 transition-opacity" aria-label="Comment">
              <MessageCircle className="w-6 h-6 text-foreground" />
            </button>
            <button className="hover:opacity-70 transition-opacity" aria-label="Share">
              <Share2 className="w-6 h-6 text-foreground" />
            </button>
          </div>
          
          {/* Instagram-style caption */}
          <div className="px-3 pb-3 bg-background">
            <p className="text-foreground font-baloo text-base">
              {slides[currentIndex].caption}
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={onNavigateToDiary}
            size="lg"
            className="text-xl font-baloo px-12 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            hi ♡
          </Button>
        </div>
      </div>
    </div>
  );
};
