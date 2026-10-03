"use client";
import { useState } from "react";
import {
  Accordion,
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  Select,
  Textarea,
  ToastView,
  useToast,
} from "@/components/ui";

export function StyleguideDemos() {
  const [chips, setChips] = useState<string[]>(["Leggings"]);
  const [open, setOpen] = useState(false);
  const toast = useToast();
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-3 text-lg font-bold text-plum">Chip (filter toggle)</h3>
        <div className="flex flex-wrap gap-2">
          {["Align Mix", "Leggings", "Lulu Mix"].map((c) => (
            <Chip
              key={c}
              selected={chips.includes(c)}
              onClick={() =>
                setChips((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))
              }
            >
              {c}
            </Chip>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <h3 className="text-lg font-bold text-plum md:col-span-2">Form controls</h3>
        <Input id="sg-name" label="Input" placeholder="Your name" required />
        <Input
          id="sg-error"
          label="Input with error"
          defaultValue="hello@"
          error="Enter an email address like name@example.com."
        />
        <Select
          id="sg-select"
          label="Select"
          placeholder="Choose one"
          options={[
            { value: "a", label: "Vinted" },
            { value: "b", label: "Depop" },
          ]}
        />
        <Checkbox id="sg-check" label="Checkbox" />
        <div className="md:col-span-2">
          <Textarea id="sg-text" label="Textarea" hint="Hints sit under the label." />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-bold text-plum">Accordion</h3>
        <Accordion
          items={[
            {
              title: "How exact bundles work",
              content: <p>The pieces in the video are the pieces you get.</p>,
            },
            { title: "Grading", content: <p>Grade A only.</p> },
          ]}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="w-full text-lg font-bold text-plum">Modal &amp; Toast</h3>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Button variant="secondary" onClick={() => toast("LF-01 added to your quote")}>
          Show toast
        </Button>
        <ToastView message="Static toast preview" />
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Example modal">
        <p className="text-ink">
          Focus is trapped inside. Press Escape or the close button to exit.
        </p>
        <Button className="mt-4" onClick={() => setOpen(false)}>
          Got it
        </Button>
      </Modal>
    </div>
  );
}
