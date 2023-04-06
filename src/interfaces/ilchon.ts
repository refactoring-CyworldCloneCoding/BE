interface IlchonInfo {
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  senderIlchonName: string;
  recipientIlchonName: string;
  state?: string;
}

export { IlchonInfo };
