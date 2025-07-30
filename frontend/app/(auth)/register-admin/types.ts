

export interface RegisterAdminPayload {
    username: string;
    password: string;
    email: string;
    fname: string;
    lname: string;
    imageData:string;
    ext: string;
}

export interface RegisterAdminResponse {
    status: boolean;
    message?: string;
}

export interface FileUploadData {
    fileBase64: string;
    fileBlob: string;
    filename: string;
    fileExt: string;
}