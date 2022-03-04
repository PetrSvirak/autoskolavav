import {
  DeliveryClient,
  createDeliveryClient,
} from "@kentico/kontent-delivery";

const getDeliveryClient = (): DeliveryClient => {
  const usePreviewMode = !!process.env.previewApiKey;

  return createDeliveryClient({
    projectId: process.env.projectId,
    previewApiKey: process.env.previewApiKey,
    defaultQueryConfig: {
      usePreviewMode,
    },
  });
};

export const deliveryClient = getDeliveryClient();
