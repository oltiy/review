export interface PutUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture?: {
    data: Buffer;
    contentType: String;
  };
  permissionFlags: number;
}
