import React from "react";
import { Image, ImageProps } from "expo-image";

interface BrandLogoProps extends Partial<ImageProps> {
  size?: number;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 40,
  style,
  ...props
}) => {
  return (
    <Image
      source={require("@/assets/images/Spotify_Primary_Logo_RGB_Green.png")}
      style={[
        {
          width: size,
          aspectRatio: 1,
        },
        style,
      ]}
      contentFit="contain"
      {...props}
    />
  );
};

export default BrandLogo;
