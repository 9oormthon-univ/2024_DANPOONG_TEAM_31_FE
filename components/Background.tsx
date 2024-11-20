import BackgroundImg from "@/assets/images/background.svg";

export const Background = () => {
  return (
    <BackgroundImg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
};
