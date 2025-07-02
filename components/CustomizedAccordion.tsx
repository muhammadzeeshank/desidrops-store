import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the type for each item
interface AccordionItemType {
  title: string;
  content: string;
}

// Define props for the component
interface AccordionOutlineDemoProps {
  items: AccordionItemType[];
}

export default function CustomizedAccordion({
  items,
}: AccordionOutlineDemoProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg my-4 w-full space-y-2"
    >
      {items.map(({ title, content }, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border rounded-md px-4"
        >
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
