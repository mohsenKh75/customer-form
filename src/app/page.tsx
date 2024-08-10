import Image from "next/image";
import { CustomerForm } from "./components/CustomerForm";
import data from "../mock/data.json";
import { pageData } from "@/mock/mockReq";

export default async function Home() {
  const res = await pageData(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center min-h-screen w-full">
        <CustomerForm data={res} />
      </div>
    </main>
  );
}
