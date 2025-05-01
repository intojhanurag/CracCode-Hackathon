"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { YoutubeIcon, ChevronDown, BookOpen } from "lucide-react";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  thumbnailUrl?: string;
  progress?: number;
}

interface PlaylistProps {
  playlist: {
    videos: Video[];
  };
}

export function VideoList({ playlist }: PlaylistProps) {
  const [videos, setVideos] = useState(playlist.videos);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [openAssignments, setOpenAssignments] = useState<Record<string, boolean>>({});

  const toggleVideoCompletion = (videoId: string) => {
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, completed: !video.completed } : video)));
  };

  const handleSaveNotes = (videoId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [videoId]: note,
    }));
  };

  const handleSaveAssignment = (videoId: string, assignment: string) => {
    setAssignments((prev) => ({
      ...prev,
      [videoId]: assignment,
    }));
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-gray-800/50">
        <h2 className="text-lg font-semibold">Course Content</h2>
        <p className="text-sm text-gray-400">Complete all videos and assignments to finish the course</p>
      </div>

      <div className="divide-y divide-gray-800">
        {videos.map((video, index) => (
          <div key={video.id} className={`p-4 ${video.completed ? "bg-gray-800/30" : ""}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 relative">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl || "/placeholder.svg"}
                    alt={video.title}
                    width={120}
                    height={68}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[68px] bg-gray-800 rounded-md flex items-center justify-center">
                    <YoutubeIcon className="h-8 w-8 text-red-500" />
                  </div>
                )}
                <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">{video.duration}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium line-clamp-2">
                      {index + 1}. {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox
                        checked={video.completed}
                        onCheckedChange={() => toggleVideoCompletion(video.id)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                      />
                      <span className="text-xs text-gray-400">
                        {video.completed ? "Completed" : "Mark as completed"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <Collapsible open={!!notes[video.id]} onOpenChange={() => {}}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-green-400 mt-2">
                      Notes
                      <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${notes[video.id] ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 p-4 bg-gray-800/50 rounded-md text-sm">
                    <textarea
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-md p-2"
                      placeholder="Write your notes here..."
                      value={notes[video.id] || ""}
                      onChange={(e) => handleSaveNotes(video.id, e.target.value)}
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Assignment Section */}
                <Collapsible
                  open={openAssignments[video.id]}
                  onOpenChange={() =>
                    setOpenAssignments((prev) => ({ ...prev, [video.id]: !prev[video.id] }))
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-xs text-blue-400 mt-2">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Assignment
                      <ChevronDown
                        className={`h-3 w-3 ml-1 transition-transform ${
                          openAssignments[video.id] ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 p-4 bg-gray-800/50 rounded-md text-sm">
                    <textarea
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-md p-2"
                      placeholder="Write your assignment here..."
                      value={assignments[video.id] || ""}
                      onChange={(e) => handleSaveAssignment(video.id, e.target.value)}
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Other Features */}
                <div className="mt-4 text-sm text-gray-400">
                  <p>Quiz: <span className="text-yellow-400">Coming Soon</span></p>
                  <p>Documentation: <span className="text-purple-400">Coming Soon</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
