"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { X, Check, ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MultiSelectOption {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxSelections?: number;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  maxSelections = 10,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = useCallback(
    (optionId: string) => {
      if (selected.includes(optionId)) {
        onChange(selected.filter((id) => id !== optionId));
      } else if (selected.length < maxSelections) {
        onChange([...selected, optionId]);
      }
    },
    [selected, onChange, maxSelections]
  );

  const removeOption = useCallback(
    (optionId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(selected.filter((id) => id !== optionId));
    },
    [selected, onChange]
  );

  const selectedOptions = options.filter((o) => selected.includes(o.id));

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <div
        className={cn(
          "min-h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm cursor-pointer transition-colors",
          "hover:border-primary/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30",
          isOpen && "border-primary ring-1 ring-primary/30"
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <div className="flex flex-wrap gap-1.5 items-center">
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.map((option) => (
                <Badge
                  key={option.id}
                  variant="secondary"
                  className="gap-1 pr-1 text-xs font-normal animate-in fade-in-0 zoom-in-95"
                >
                  {option.name}
                  <button
                    type="button"
                    onClick={(e) => removeOption(option.id, e)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 ml-auto shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-lg border bg-popover shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Options */}
          <div className="max-h-56 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No subjects found
              </p>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(option.id)}
                    className={cn(
                      "flex items-center gap-2 w-full rounded-md px-2.5 py-2 text-sm transition-colors text-left",
                      isSelected
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="truncate">{option.name}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {selected.length > 0 && (
            <div className="border-t px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {selected.length} of {maxSelections} selected
              </span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-destructive hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
