import { SendingAnimation } from "@/components/SendingAnimation";

export default function SendingLetter() {
  return (
    <SendingAnimation
      sendingMessage="편지 전달중"
      doneMessage1="따듯한 한마디가"
      doneMessage2="전달되었어요!"
      doneExtraMessage={`큰 힘이 되어줄꺼예요.\n다음에도 찾아와주세요.`}
      headerbarMessage1="편지를 보낼게요."
      headerbarMessage2="편지를 전달했어요."
    />
  );
}
