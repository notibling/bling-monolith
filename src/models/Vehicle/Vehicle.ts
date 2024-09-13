export interface IVehicle {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
}