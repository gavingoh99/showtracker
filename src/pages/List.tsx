import ListShows from '../components/ListShows';
export default function List() {
  return (
    <div className='pl-10 pr-10 h-screen w-screen '>
      <div className='text-3xl font-roboto'>Your List</div>
      <ListShows category='Watching' />
      <ListShows category='Watched' />
    </div>
  );
}
