import { useEffect, useState } from "react";
import Navbar from "./Components/NavbarComponent";
import { GetUserQueueRealtime, Queue } from "../model/Queue";
import { useAuth } from "../hooks/AuthContext";
import UserQueueComponent from "./Components/UserQueueComponent";

export default function QueuePage() {
  const [queue, setQueue] = useState<Queue[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = GetUserQueueRealtime(user!.uid, (newQueue) => {
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
                <>
                  <UserQueueComponent queue={q} i={i + 1} />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
