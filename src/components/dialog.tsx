"use client";
import { useSession } from "@clerk/nextjs";
import { Dialog, DialogPanel, Text, TextInput, Title } from "@tremor/react";
import { UploadDropzone } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { AddCardButton, Button } from "./ui/button";

const defaultErrorState = {
  itemName: "",
  description: "",
  itemImage: "",
};

export default function PublishDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const router = useRouter();
  const session = useSession();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  //   const saveStorageId = useMutation(api.files.saveStorageId);
  //   const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
  //     await saveStorageId({
  //       storageIds: uploaded.map(({ response }) => ({
  //         storageId: (response as any).storageId,
  //       })),
  //     });
  //   };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <AddCardButton onClick={() => setIsOpen(true)} />
        <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
          <DialogPanel className="rounded-lg">
            <Title className="mb-3">Input Lisiting Details</Title>
            <div className="flex flex-col gap-4">
              <Text className="text-lg dark:text-white">Item Name</Text>
              <TextInput
                placeholder="Item Name"
                onChange={(e) => setItemName(e.target.value)}
              />
              <Text className="text-lg dark:text-white">Description</Text>
              <TextInput
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <UploadDropzone
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                }}
                multiple
                onUploadComplete={() => console.log("uploaded")}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full dark:text-white bg-gray-500/20 hover:bg-gray-600/40"
              >
                Publish Item
              </Button>
            </div>
          </DialogPanel>
        </Dialog>
      </div>
    </>
  );
}
