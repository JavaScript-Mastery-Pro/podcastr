"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { voiceDetails } from "@/constants";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
const formSchema = z.object({
  podcastTitle: z.string().min(1, "Podcast Title is required"),
  podcastDescription: z.string().min(1, "Podcast Description is required"),
});

type VoiceType = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

const CreatePodcast = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const createPodcast = useMutation(api.podcasts.createPodcast);
  const [voiceType, setVoiceType] = useState<VoiceType>("alloy");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });
  const handleCreatePodcast = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await createPodcast({
        audioStorageId: audioStorageId as Id<"_storage">,
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        imageStorageId: imageStorageId as Id<"_storage">,
        author: user?.firstName || "",
        authorId: user?.id || "",
      });
      toast({
        title: "Podcast created successfully",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating podcast", error);
      toast({
        title: "Error creating podcast",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create a Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreatePodcast)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Podcast title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class font-bold focus-visible:ring-orange-1"
                      placeholder="JSM masterclass"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select
                onValueChange={(value) => setVoiceType(value as VoiceType)}
              >
                <SelectTrigger className="text-16 w-full border-none bg-black-1 font-light text-gray-1 focus:ring-orange-1">
                  <SelectValue placeholder="Select AI Voice" />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceDetails.map((category) => (
                    <SelectItem
                      value={category.name}
                      className="capitalize focus:bg-orange-1"
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-light text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class font-light focus-visible:ring-orange-1"
                      placeholder="Write a short description about the podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType}
              audio={audioUrl}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit & publish podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
