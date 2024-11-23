import { SendingAnimation } from "@/components/SendingAnimation";

export default function SendingSchedule() {
  return (
    <SendingAnimation
      sendingMessage="일정 등록중"
      doneMessage1="일정이 등록되었어요!"
      doneMessage2="오늘도 화이팅입니다."
      doneExtraMessage={`가족들의 일정도 확인해보세요.\n오늘도 사랑 가득한 하루 되세요.`}
      headerbarMessage1="일정을 등록할게요."
      headerbarMessage2="일정을 등록했어요."
    />
  );
}
