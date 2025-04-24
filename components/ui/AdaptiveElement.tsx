import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp } from "react-native";

export interface AdaptiveElementProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export default function AdaptiveElement({
  children,
  style,
}: AdaptiveElementProps) {
  const color = useThemeColor({}, "text");

  const clonedChildren = React.Children.map(children, (child) =>
    React.isValidElement<{ style?: React.CSSProperties }>(child)
      ? React.cloneElement(child, {
          style: {
            ...(child.props.style || {}),
            color: color,
            ...style,
          },
        })
      : child
  );
  return <>{clonedChildren}</>;
}
