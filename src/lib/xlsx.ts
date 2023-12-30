import xlsx, { IJsonSheet } from "json-as-xlsx";
import { people } from "@/people";

export function downloadToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Person ID", value: "id" },
        { label: "شماره مبدا", value: "source_number" },
        { label: "شماره مقصد", value: "des_number" },
        { label: "مدت زمان مکالمه", value: "call_duration" },
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
