import { SendingAnimation } from "@/components/SendingAnimation";

export default function SendingMemo() {
  return (
    <SendingAnimation
      sendingMessage="메모 전달중"
      doneMessage1="00님의 마음을 담은 메모를"
      doneMessage2="전달했어요!"
      doneExtraMessage={`오늘도 고생 많았어요. 지금의 고민과 노력이\n빛이 되는 날이 곧 올꺼예요`}
    />
  );
}
