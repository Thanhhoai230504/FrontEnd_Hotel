
import axiosClient from "../axiosClient";

export const cartsRequest = async ({
  productId,
  quantity,
  size,
  userId,
}: {
  productId: string;
  quantity: number;
  size: string;
  userId: string;
}) => {
  try {

    const response = await axiosClient.post("/carts", {
      productId,
      quantity,
      size,
      userId,
    });
    
    return response; 
  } catch (error) {
    console.error("Error in cartsRequest:", error);
    return null;
  }
};
