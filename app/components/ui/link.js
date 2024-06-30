import Link from "next/link";

function LinkTo({ href, text }) {
  return (
    <Link href={href}>
      <div className="p-2 m-2 text-center rounded bg-blue-300 text-black">
        {text}
      </div>
    </Link>
  );
}

export default LinkTo;
