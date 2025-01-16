import React, { useRef, useState } from "react";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import { FaCloudUploadAlt } from "react-icons/fa";
import { error } from "console";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(
        `Request Failed with Status ${response.status}:${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(
      `Authenticator request failed: ${(error as Error).message}`
    );
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string | null }>();
  const onError = (error: any) => {
    console.log(error);
    toast({
      title: "Image upload failed",
      description: "FYour Image coukd not be uploaded",
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded ",
      description: `${res.filePath} uploaded `,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <FaCloudUploadAlt size={60} className="object-contain" />
        <p className="text-base ">Upload File</p>
        {file && <p className="mt-1 text-center text-xs">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath ?? ""}
          path={file.filePath ?? ""}
          width={200}
          height={200}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
