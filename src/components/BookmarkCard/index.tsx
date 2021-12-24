import { BookmarkCardProps } from "./types";
import { BookmarkCardDesktop } from "./BookmarkCardDesktop";
import { BookmarkCardMobile } from "./BookmarkCardMobile";

export const BookmarkCard: React.FC<BookmarkCardProps> = (props) => {
  return (
    <>
      <div className="hidden md:block">
        <BookmarkCardDesktop {...props} />
      </div>
      <div className="block md:hidden">
        <BookmarkCardMobile {...props} />
      </div>
    </>
  );
};
