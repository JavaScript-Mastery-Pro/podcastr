"use client";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
}

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
}: GenerateThumbnailProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const { toast } = useToast();

  const generateImage = async () => {
    setIsImageLoading(true);
    setImage("");
    try {
      const response = await handleGenerateThumbnail({ prompt: aiPrompt });
      const blob = new Blob([response], { type: "image/png" });
      const file = new File([blob], `thumbnail-${uuidv4()}`, {
        type: "image/png",
      });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      console.error("Error generating thumbnail", error);
      toast({
        title: "Error generating thumbnail",
        variant: "destructive",
      });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsImageLoading(true);
    setImage("");
    try {
      const files = e.target.files;
      if (!files) return;
      const fileArray = Array.from(files);
      const uploaded = await startUpload(fileArray);
      const storageId = (uploaded[0].response as any).storageId;
      setImageStorageId(storageId);
      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      console.error("Error uploading image", error);
      toast({
        title: "Error generating thumbnail",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="mt-[30px] flex w-full max-w-[520px] flex-col justify-between gap-2 rounded-lg border border-black-6 bg-black-1 px-2.5 py-2 md:flex-row md:gap-0">
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(true)}
          variant="plain"
          className={cn("", {
            "bg-black-6": isAiThumbnail,
          })}
        >
          AI prompt to generate thumbnail
        </Button>
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(false)}
          variant="plain"
          className={cn("", {
            "bg-black-6": !isAiThumbnail,
          })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              AI prompt to generate thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-orange-1"
              placeholder="Write a prompt to generate custom thumbnail"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="button"
              className="text-16 bg-orange-1 font-bold text-white-1 duration-500"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  &nbsp; Generating...
                </>
              ) : (
                "Generate Thumbnail"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex-center mt-5 h-[142px] w-full cursor-pointer flex-col gap-3 rounded-xl border-[3.2px] border-dashed border-black-6 bg-black-1"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            className="hidden"
            placeholder="Upload Custom Image"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt="upload icon"
            />
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              <Loader className="animate-spin" size={20} /> &nbsp; Uploading...
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">
              Click to upload{" "}
            </h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            width={200}
            height={200}
            alt="thumbnail"
            className="mt-5"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
