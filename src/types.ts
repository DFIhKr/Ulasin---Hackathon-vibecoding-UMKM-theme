export interface QRCodeData {
  businessName: string;
  url: string;
}

export type StepProps = {
  onNext: (data?: Partial<QRCodeData>) => void;
  onPrev?: () => void;
  data: Partial<QRCodeData>;
};
