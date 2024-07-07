import LinkTo from "./components/ui/link";
function NotFound() {
  return (
    <div className="">
      <div className="text-red-500 text-center text-4xl">Not Found</div>
      <div className="w-fit mx-auto">
        <LinkTo href={"/home"}>Return to home Page</LinkTo>
      </div>
    </div>
  );
}

export default NotFound;
