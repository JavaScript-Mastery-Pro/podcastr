"use client";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type VoiceType = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

interface GeneratePodcastProps {
  voiceType: VoiceType;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
}

const GeneratePodcast = ({
  voiceType,
  setAudio,
  setAudioStorageId,
  audio,
}: GeneratePodcastProps) => {
  const { toast } = useToast();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);
  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: aiPrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, {
        type: "audio/mpeg",
      });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.error("Error generating and uploading podcast:", error);
      setIsGenerating(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI prompt to generate podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-orange-1"
          placeholder="Provide text to AI to generate audio"
          rows={5}
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          className="text-16 bg-orange-1 font-bold text-white-1 duration-500"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin" size={20} /> &nbsp; Generating...
            </>
          ) : (
            "Generate Podcast"
          )}
        </Button>
      </div>
      {audio && <audio controls src={audio} autoPlay className="mt-5" />}
    </div>
  );
};

export default GeneratePodcast;
