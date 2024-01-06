import xlsx, { IJsonSheet } from "json-as-xlsx";
import { fetchData, Record } from '../api';

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
      content: fetchData,
    },
  ];

  let settings = {
    fileName: "People Excel",
  };

  xlsx(columns, settings);
}
