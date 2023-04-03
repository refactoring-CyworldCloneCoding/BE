interface UserInfo {
  email: string;
  name: string;
  password?: string;
  gender: string;
  birth: string;
  snsId?: string;
  provider?: string;
}

interface PayloadI {
  [key: string]: number | string;
}

export { UserInfo, PayloadI };
