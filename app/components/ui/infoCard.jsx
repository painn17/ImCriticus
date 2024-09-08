function InfoCard({ children, info }) {
  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center w-full px-4 py-10 gap-2 min-w-56 rounded-xl col-span-1 bg-opacity-70">
      <h3 className="text-gray-50 heading-three">{info}</h3>
      <div className="text-gray-400 body-regular">{children}</div>
    </div>
  );
}

export default InfoCard;
