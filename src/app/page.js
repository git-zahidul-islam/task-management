import Skeleton from "@/components/Skeleton";
import dynamic from "next/dynamic";

const TaskCreate = dynamic(()=> import('@/components/TaskCreate'),{
  loading: ()=> <Skeleton/>,
  ssr: true,
})

export default function Home() {
  return (
   <section>
    <TaskCreate/>
   </section>
  );
}


// mongodb://localhost:27017/
