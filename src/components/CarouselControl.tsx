export default function CarouselControl({
  onClick,
  isLeft,
}: {
  onClick: (event: React.MouseEvent) => void;
  isLeft: boolean;
}) {
  return (
    <button
      className={`${
        isLeft ? 'left-0' : 'right-0'
      } z-10 w-10 h-full absolute text-white bg-black cursor-pointer flex-none material-symbols-outlined opacity-0 transition ease-in-out hover:scale-110 hover:opacity-60 duration-300`}
      onClick={onClick}
    >
      {isLeft ? 'chevron_left' : 'chevron_right'}
    </button>
  );
}
