export interface IAwards {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
