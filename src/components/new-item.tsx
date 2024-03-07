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
    <div className="mx-12 flex flex-col gap-4">
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
        <Title className="my-8 text-lg md:text-2xl">
          Input Listing Details
        </Title>
        <div className="my-2 flex flex-col gap-4">
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
                    className="max-w-xs"
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
            className="w-full bg-gray-500/20 hover:bg-gray-600/40 dark:text-white"
          >
            Publish Item
          </Button>
        </div>
      </form>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-gray-500 p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:bg-gray-700"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
            Item Published
          </Toast.Title>
          <Toast.Description asChild>
            <time
              className="m-0 text-[13px] leading-[1.3] text-slate11 [grid-area:_description]"
              dateTime={eventDateRef.current.toISOString()}
            >
              {eventDateRef.current.toLocaleString()}
            </time>
          </Toast.Description>
          <Toast.Action className="[grid-area:_action]" asChild altText="Undo">
            <button
              className="inline-flex h-[25px] items-center justify-center rounded bg-green2 px-[10px] text-xs font-medium leading-[25px] text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
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
        <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
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

type Item = {
  _id: Id<"items">;
  item_name: string;
  description: string;
  images: string[];
  owner_info: {
    first_name: string;
    last_name: string;
    username: string;
    image_url: string;
    has_image: boolean;
  };
  created_at: number;
  _creationTime: number;
};

export const EditItemForm = ({ itemDetails }: { itemDetails: Item }) => {
  const [itemName, setItemName] = useState(itemDetails.item_name);
  const [description, setDescription] = useState(itemDetails.description);
  const [cachedImages, setCachedImages] = useState(itemDetails.images);
  const [itemImages, setItemImages] = useState([] as string[]);
  const [errors, setErrors] = useState(defaultErrorState);
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);
  const [itemId, setItemId] = useState<Id<"items"> | null>(itemDetails._id);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createListing = useMutation(api.items.create);
  const undoCreation = useMutation(api.items.undoCreation);
  const deleteImage = useMutation(api.items.deleteImage);

  const resetErrors = () => {
    setErrors(defaultErrorState);
  };

  return (
    <div className="mx-12 flex flex-col gap-4">
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
        <Title className="mb-3">Edit Listing Details</Title>
        <div className="flex flex-col gap-4">
          <Text className="text-lg dark:text-white">Item Name</Text>
          <TextInput
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Text className="text-lg dark:text-white">Description</Text>
          <TextInput
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {itemDetails.images.length <= 0 && (
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

          {itemDetails.images.length > 0 && (
            <div className="flex flex-col gap-4">
              <Text className="text-lg dark:text-white">
                Your Item&#39;s Images
              </Text>
              <div className="flex flex-row gap-2 overflow-x-auto">
                {[...itemDetails.images].map((image) => (
                  <div key={image} className="flex flex-col gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${image}`}
                      width={400}
                      height={100}
                      alt={`Image of ${itemName}`}
                      key={image}
                      className="max-w-xs"
                    />
                    <Button
                      onClick={async () => {
                        await deleteImage({ imageId: image });
                        setCachedImages(
                          cachedImages.filter((i) => i !== image)
                        );
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
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
            className="w-full bg-gray-500/20 hover:bg-gray-600/40 dark:text-white"
          >
            Publish Item
          </Button>
        </div>
      </form>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-gray-500 p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:bg-gray-700"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
            Item Published
          </Toast.Title>
          <Toast.Description asChild>
            <time
              className="m-0 text-[13px] leading-[1.3] text-slate11 [grid-area:_description]"
              dateTime={eventDateRef.current.toISOString()}
            >
              {eventDateRef.current.toLocaleString()}
            </time>
          </Toast.Description>
          <Toast.Action className="[grid-area:_action]" asChild altText="Undo">
            <button
              className="inline-flex h-[25px] items-center justify-center rounded bg-green2 px-[10px] text-xs font-medium leading-[25px] text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
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
        <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
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
};
