import Navbar from "./Components/NavbarComponent";
import { useAuth } from "../hooks/AuthContext";
import { useEffect, useState } from "react";
import { GetTenantsQueueRealtime, Queue } from "../model/Queue";
import UserQueueComponent from "./Components/UserQueueComponent";

export default function TenantQueuePage() {
    const { user } = useAuth();
    const [queue, setQueue] = useState<Queue[] | null>([]);


    useEffect(() => {
        const unsubscribe = GetTenantsQueueRealtime(user!.uid, (newQueue) => {
            setQueue(newQueue);
        });
        console.log(queue);

        return () => unsubscribe();
    }, [])



    return (
        <>
            <Navbar />
            <div className="p-10">
                <h1 className="text-2xl font-semibold">All Queues</h1>
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
