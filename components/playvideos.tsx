// components/VideoModal.tsx
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeUrl: string; // full URL like https://www.youtube.com/watch?v=xyz
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  youtubeUrl,
}) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-2">
        
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full rounded-xl"
            src={`${youtubeUrl}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};
