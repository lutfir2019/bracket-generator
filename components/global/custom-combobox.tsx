"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  options: { label: string; value: string | number }[];
  placeholder?: string;
  clearable?: boolean;
  value?: string | number | null;
  onChange?: (value?: string | number | null) => void;
  onsearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
}

const Combobox = ({
  value,
  options,
  placeholder = "Select",
  clearable = false,
  onChange,
  onsearch,
  onClear,
  disabled = false,
}: ComboboxProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<string>("auto");

  useEffect(() => {
    const updateWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(`${buttonRef.current.offsetWidth}px`);
      }
    };

    // Jalankan saat pertama kali render
    updateWidth();

    // Gunakan ResizeObserver untuk mendeteksi perubahan ukuran tombol
    const resizeObserver = new ResizeObserver(updateWidth);
    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <Popover>
      <PopoverTrigger
        asChild
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="relative w-full">
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            type="button"
            disabled={disabled}
            className={cn(
              "w-full justify-between gap-8",
              !value && "text-muted-foreground"
            )}
          >
            <span className="truncate inline-block">
              {value
                ? options.find((option) => option.value === value)?.label
                : placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
          {value && clearable && (
            <div
              className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center justify-center 
                         h-3 w-3 rounded-full bg-gray-500 text-white cursor-pointer 
                         opacity-70 hover:opacity-100 transition-opacity"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.("");
                onClear?.();
              }}
            >
              <X className="h-[10px] w-[10px]" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{ width: buttonWidth }}
        className="p-0"
      >
        <Command>
          <CommandInput placeholder="Search..." onValueChange={onsearch} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange?.(option.value);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
