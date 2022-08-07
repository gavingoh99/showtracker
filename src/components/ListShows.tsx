import '../index.css';
export default function ListShows({ category }: { category: string }) {
  const expandList = (menu: HTMLElement) => {
    menu.classList.toggle('none');
    setTimeout(() => {
      menu.classList.toggle('shrink');
      menu.classList.toggle('grow');
    });
  };
  const shrinkList = (menu: HTMLElement) => {
    menu.classList.toggle('grow');
    menu.classList.toggle('shrink');
    setTimeout(() => {
      menu.classList.toggle('none');
    }, 200);
  };

  return (
    <div className='pt-5 pb-5 border rounded shadow-md pl-10 pr-10'>
      <button
        className='text-2xl font-roboto w-full flex items-center'
        onClick={(event: React.MouseEvent) => {
          const btn = event.target as HTMLElement;
          const dropdown = btn.closest('div');
          const menu = dropdown?.querySelector('#dropdown') as HTMLElement;
          const arrowRight = dropdown?.querySelector(
            '.arrowRight'
          ) as HTMLElement;
          arrowRight.classList.toggle('rotateClockwise');
          menu.classList.contains('none') ? expandList(menu) : shrinkList(menu);
        }}
        onMouseEnter={(event: React.MouseEvent) => {
          const btn = event.target as HTMLElement;
          const dropdown = btn.closest('div');
          const arrowRight = dropdown?.querySelector(
            '.arrowRight'
          ) as HTMLElement;
          arrowRight.classList.toggle('none');
          setTimeout(() => {
            arrowRight.classList.toggle('startLeft');
            arrowRight.classList.toggle('moveRight');
          });
        }}
        onMouseLeave={(event: React.MouseEvent) => {
          const btn = event.target as HTMLElement;
          const dropdown = btn.closest('div');
          const arrowRight = dropdown?.querySelector(
            '.arrowRight'
          ) as HTMLElement;
          arrowRight.classList.toggle('moveRight');
          arrowRight.classList.toggle('startLeft');
          setTimeout(() => {
            arrowRight.classList.toggle('none');
          }, 200);
        }}
      >
        <span className='w-32'>{category}</span>
        <span className='material-symbols-outlined arrowRight startLeft none'>
          chevron_right
        </span>
      </button>
      <div
        id='dropdown'
        className='none shrink dropdown grid grid-cols-4 gap-5 h-full w-full'
      >
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
        <div className='aspect-video bg-black'></div>
      </div>
    </div>
  );
}
