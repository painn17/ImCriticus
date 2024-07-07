import Link from "next/link";

function LinkTo({ href, children }) {
  return (
    <Link href={href}>
      <div className="p-2 m-2 text-center rounded bg-blue-300 text-black">
        {children}
      </div>
    </Link>
  );
}

export default LinkTo;
