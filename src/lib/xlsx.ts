import xlsx, { IJsonSheet } from "json-as-xlsx";
import { people } from "@/people";

export function downloadToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Person ID", value: "id" },
        { label: "شماره مبدا", value: "src" },
        { label: "شماره مقصد", value: "dst" },
        { label: "مدت زمان مکالمه", value: "duration" },
        { label: "تاریخ", value: "date" },
       
      ],
      content: people,
    },
  ];

  let settings = {
    fileName: "People Excel",
  };

  xlsx(columns, settings);
}
