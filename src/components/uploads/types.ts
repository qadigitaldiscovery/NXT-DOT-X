
export interface Document {
  id: string;
  name: string;
  documentType: string;
  supplier: string;
  fileType: string;
  uploadDate: Date;
  expiryDate: Date | null;
  fileSize: number;
  status: string;
}
