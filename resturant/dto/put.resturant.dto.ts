export interface PutResturanDto {
  resturantName: string;
  rank?: number;
  comment?: Array<string>;
  ownerName?: string;
  permissionFlags?: number;
}
