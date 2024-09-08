import LinkTo from "./link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "./icons/icons";
function BackButton({ url = "" }) {
  const router = useRouter();
  return (
    <div className="w-fit">
      <LinkTo href={url}>
        <div
          className="text-[var(--primary)] w-fit"
          onClick={
            url
              ? ""
              : () => {
                  router.back();
                }
          }
        >
          <div className="flex gap-2">
            <div className="rotate-180">
              <ArrowRightIcon strokeColor="var(--primary)"></ArrowRightIcon>
            </div>
            <div className="link-regular">Go back</div>
          </div>
        </div>
      </LinkTo>
    </div>
  );
}

export default BackButton;
