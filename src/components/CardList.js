import CardComponent from "./CardComponent";
import { Reorder } from "framer-motion";

export default function CardList({ listData, onReorder, onEdit, onDelete }) {
  return (
    <Reorder.Group axis="y" values={listData} onReorder={onReorder}>
      {listData.map((q) => (
        <Reorder.Item key={q.id} value={q}>
          <CardComponent cardData={q} onEdit={onEdit} onDelete={onDelete} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
