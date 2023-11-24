import { useEffect, useState } from "react";
import Navbar from "./Components/NavbarComponent";
import { GetTenantsQueueRealtime, GetUserQueueRealtime, Queue } from "../model/Queue";
import { useAuth } from "../hooks/AuthContext";
import UserQueueComponent from "./Components/UserQueueComponent";


interface ComponentProps {
  isTenant?: Boolean;
}

export default function QueuePage({ isTenant }: ComponentProps) {
  const [queue, setQueue] = useState<Queue[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = isTenant ?
      GetTenantsQueueRealtime(user!.uid, (newQueue) => {
        setQueue(newQueue);
      }) : GetUserQueueRealtime(user!.uid, (newQueue) => {
        setQueue(newQueue);
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl font-semibold">Queue List</h1>
        <div className="flex flex-col gap-4 w-full justify-center p-10">
          {queue &&
            queue.length > 0 &&
            queue.map((q, i) => {
              return (
                <UserQueueComponent key={q.id} queue={q} i={i + 1} />
              );
            })}
        </div>
      </div>
    </>
  );
}
