export interface AdminColumn {
  _id: string;
  fname: string;
  lname: string;
  username: string;
  imageData?: string;
  canUpdate: boolean;
}

export interface GetAdminListResponse {
  status: boolean;
  admins: AdminColumn[] | null;
  message: string | null;
}