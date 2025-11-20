import "./SectionTwo.scss";
import ScrollStack, {
  ScrollStackItem,
} from "../components/scrollStack/ScrollStack";

export default function SectionTwo() {
  return (
    <ScrollStack>
      <ScrollStackItem>
        <h2>Card 1</h2>
      </ScrollStackItem>

      <ScrollStackItem>
        <h2>Card 2</h2>
      </ScrollStackItem>

      <ScrollStackItem>
        <h2>Card 3</h2>
      </ScrollStackItem>
    </ScrollStack>
  );
}
