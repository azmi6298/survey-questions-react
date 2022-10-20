import CardComponent from "./CardComponent";
import { Reorder } from "framer-motion";

export default function CardList({ listData, onReorder, onOpenModal }) {
  return (
    <Reorder.Group axis="y" values={listData} onReorder={onReorder}>
      {listData.map((cardData, index) => (
        <Reorder.Item key={cardData.id} value={cardData}>
          <CardComponent
            cardData={cardData}
            onOpenModal={onOpenModal}
            index={index + 1}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
