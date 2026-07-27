export interface CheckboxControlOptions {
  container: HTMLElement;
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export interface LabControlHandle {
  setChecked(nextChecked: boolean): void;
  remove(): void;
}

export function createCheckboxControl({
  container,
  label,
  checked = false,
  onChange,
}: CheckboxControlOptions): LabControlHandle {
  const control = document.createElement("label");
  control.className = "lab-control lab-control-checkbox";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;

  const text = document.createElement("span");
  text.textContent = label;

  control.append(input, text);
  container.appendChild(control);

  input.addEventListener("change", () => {
    onChange(input.checked);
  });

  return {
    setChecked(nextChecked: boolean): void {
      input.checked = nextChecked;
    },
    remove(): void {
      control.remove();
    },
  };
}
