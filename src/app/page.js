import Skeleton from "@/components/skeleton/Skeleton";
import dynamic from "next/dynamic";

const TaskCreate = dynamic(()=> import('@/components/TaskCreate/TaskCreate'),{
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
