import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MonitoringClient } from "./components/client";

const Monitoring = async ({
  params
}: {
  params: { labId: string }
}) => {

  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const lab = await db.labaratory.findFirst({
    where: {
      id: params.labId,
      userId: session.user.id,
    }
  });


  if (!lab) {
    redirect('/');
  };

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <MonitoringClient />
      </div>
    </div>
  );
}

export default Monitoring;