import { SendingAnimation } from "@/components/SendingAnimation";

export default function SendingLetter() {
  return (
    <SendingAnimation
      sendingMessage="편지 전달중"
      doneMessage1="000님의 따듯한 한마디가"
      doneMessage2="000님에게 전달되었어요!"
      doneExtraMessage={`00님에게 큰 힘이 되어줄꺼예요.\n다음에도 찾아와주세요.`}
    />
  );
}