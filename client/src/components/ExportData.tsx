import React, { useState, useRef, useEffect } from "react";
import { Download, FileSpreadsheet, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

interface ExportDataProps {
  data: any[];
  headers: { key: string; label: string }[];
  filename: string;
  formatData?: (item: any) => any[];
}

export const ExportData = ({
  data,
  headers,
  filename,
  formatData,
}: ExportDataProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = async (type: "excel" | "csv") => {
    try {
      const headerRow = headers.map((h) => h.label);
      const formattedData = data.map((item) =>
        formatData ? formatData(item) : headers.map((h) => item[h.key]),
      );

      if (type === "csv") {
        const csvContent = [
          headerRow.join(","),
          ...formattedData.map((row) =>
            row
              .map((cell) => `"${String(cell).replace(/"/g, '""')}" `)
              .join(","),
          ),
        ].join("\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}_${new Date().toLocaleDateString()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const worksheet = XLSX.utils.aoa_to_sheet([
          headerRow,
          ...formattedData,
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        const max_width = headerRow.map((h, i) =>
          Math.max(
            h.length,
            ...formattedData.map((row) => String(row[i]).length),
          ),
        );
        worksheet["!cols"] = max_width.map((w) => ({ wch: w + 2 }));

        XLSX.writeFile(
          workbook,
          `${filename}_${new Date().toLocaleDateString()}.xlsx`,
        );
      }
      toast.success(`Successfully exported as ${type.toUpperCase()}`);
      setIsOpen(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50"
      >
        <Download className="w-4 h-4" /> Export{" "}
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
          <div className="py-1">
            <button
              onClick={() => handleExport("excel")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export as Excel
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export as CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
