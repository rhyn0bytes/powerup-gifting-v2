import { getWishes } from "../state/wishes";

function Wishes() {
  const {data: wishes, isLoading, isFetching} = getWishes();
  const wishItems = wishes?.length ? wishes.map(wish => <pre>{JSON.stringify(wish, null, 2)}</pre>) : null;
  return (
    <div style={{textAlign: 'left'}}>
      {isFetching ? 'Refreshing...': ''}
      {isLoading ? 'Loading...': ''}
      This be the wishes page...
      {wishItems}
    </div>
  );
}

export default Wishes;