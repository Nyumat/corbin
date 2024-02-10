"use client";
import { Button } from "@/components/ui/button";
import * as Toast from "@radix-ui/react-toast";
import { Text, TextInput, Title } from "@tremor/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const defaultErrorState = {
  itemName: "",
  description: "",
  itemImage: "",
};

export default function NewItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [cachedImages, setCachedImages] = useState([] as string[]);
  const [itemImages, setItemImages] = useState([] as string[]);
  const [errors, setErrors] = useState(defaultErrorState);
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);
  const [itemId, setItemId] = useState<Id<"items"> | null>(null);

  React.useEffect(() => {
    return () => {
      setItemName("");
      setDescription("");
      setItemId(null);
      setItemImages([]);
      setCachedImages([]);
      clearTimeout(timerRef.current);
    };
  }, []);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createListing = useMutation(api.items.create);
  const undoCreation = useMutation(api.items.undoCreation);

  const resetErrors = () => {
    setErrors(defaultErrorState);
  };

  return (
    <div className="flex flex-col gap-4 mx-12">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!itemName) {
            setErrors({ ...errors, itemName: "Item Name is required" });
            return;
          }
          if (!description) {
            setErrors({
              ...errors,
              description: "Description is required",
            });
            return;
          }
          if (itemImages.length <= 0 && cachedImages.length <= 0) {
            setErrors({
              ...errors,
              itemImage: "At least one image is required",
            });
            return;
          }
          const id: Id<"items"> = await createListing({
            itemName: itemName,
            description,
            images: [...cachedImages, ...itemImages],
          });

          setItemName("");
          setDescription("");
          setItemId(id);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = new Date();
            setOpen(true);
          }, 100);
        }}
      >
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
          {itemImages.length <= 0 && (
            <UploadDropzone
              uploadUrl={generateUploadUrl}
              fileTypes={{
                "image/*": [".png", ".gif", ".jpeg", ".jpg"],
              }}
              multiple
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setItemImages(
                  uploaded.map(({ response }) => (response as any).storageId)
                );
              }}
              onUploadError={(error: unknown) => {
                alert(`ERROR! ${error}`);
              }}
            />
          )}
          {itemImages.length > 0 && (
            <div className="flex flex-col gap-4">
              <Text className="text-lg dark:text-white">
                Your Item&#39;s Images
              </Text>
              <div className="flex flex-row gap-2 overflow-x-auto">
                {[...itemImages, ...cachedImages].map((image) => (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
                    width={400}
                    height={100}
                    alt={`Image of ${itemName}`}
                    key={image}
                    className="max-w-xs max-h-32"
                  />
                ))}
              </div>

              <Button
                onClick={() => {
                  setCachedImages([...cachedImages, ...itemImages]);
                  setItemImages([]);
                }}
              >
                Upload More Images
              </Button>
            </div>
          )}
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            onClick={() => {
              resetErrors();
            }}
            className="w-full dark:text-white bg-gray-500/20 hover:bg-gray-600/40"
          >
            Publish Item
          </Button>
        </div>
      </form>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="dark:bg-gray-700 bg-gray-500 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
            Item Published
          </Toast.Title>
          <Toast.Description asChild>
            <time
              className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
              dateTime={eventDateRef.current.toISOString()}
            >
              {eventDateRef.current.toLocaleString()}
            </time>
          </Toast.Description>
          <Toast.Action className="[grid-area:_action]" asChild altText="Undo">
            <button
              className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
              onClick={async () => {
                if (!itemId) return;
                await undoCreation({ id: itemId, images: itemImages });
                setOpen(false);
                setItemId(null);
                setItemName("");
                setDescription("");
                setItemImages([]);
                setCachedImages([]);
              }}
            >
              Undo
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>

      <div className="mt-6">
        {errors.itemName && (
          <Text className="text-red-500">{errors.itemName}</Text>
        )}
        {errors.description && (
          <Text className="text-red-500">{errors.description}</Text>
        )}
        {errors.itemImage && (
          <Text className="text-red-500">{errors.itemImage}</Text>
        )}
      </div>
    </div>
  );
}
