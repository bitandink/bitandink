import BeanlogView from "@/world/beanlog/components/BeanlogView";
import { getBeanlogEntries } from "@/world/beanlog/lib/getBeanlogEntries";

export default function BeanlogPage() {
  const entries = getBeanlogEntries();

  return <BeanlogView entries={entries} />;
}