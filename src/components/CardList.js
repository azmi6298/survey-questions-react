import CardComponent from "./CardComponent";
import { Reorder } from "framer-motion";

export default function CardList({ listData, onReorder, onOpenModal }) {
  return (
    <Reorder.Group axis="y" values={listData} onReorder={onReorder}>
      {listData.map((q) => (
        <Reorder.Item key={q.id} value={q}>
          <CardComponent cardData={q} onOpenModal={onOpenModal} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
