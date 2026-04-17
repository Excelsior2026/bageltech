import Image from "next/image";

interface MarketingImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function MarketingImage({ src, alt, priority = false }: MarketingImageProps) {
  return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 980px) 100vw, 42vw" />;
}
