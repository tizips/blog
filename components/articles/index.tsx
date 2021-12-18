import { Props } from 'service/props';
import dynamic from 'next/dynamic';

const List = dynamic(() => import('@/components/list'));
const Paginate = dynamic(() => import('@/components/paginate'));
const Empty = dynamic(() => import('@/components/empty'));

function Articles(props: Props.Articles) {
  return (
    props.items && props.items.length > 0 ?
      <>
        <div>
          {
            props.items?.map(item => <List key={item.id} name={item.name} summary={item.summary} id={item.id}
                                           category={item.category} created_at={item.created_at} />)
          }
        </div>
        {
          props.paginate && props.paginate.total && props.paginate.size && props.paginate?.total > props.paginate?.size ?
            <Paginate size={props.paginate.size} page={props.paginate.page} total={props.paginate.total} /> : <></>
        }
      </> : <Empty />
  );
}

export default Articles;