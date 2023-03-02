interface UserInfo {
  email: string;
  name: string;
  password: string;
  gender: string;
  birth: string;
  refreshToken?: string;
}

interface PayloadI {
  [key: string]: number | string;
}

export { UserInfo, PayloadI };