import axios from 'axios';
import moment from 'jalali-moment';

interface Record {
  id: number;
  date: string;
  time: number;
  uniqueid: string;
  call_type: string;
  speaker: string;
  duration: number;
  recordingfile: string;
  src: string;
  dst: string;
}

const API_URL = 'http://192.168.203.13:8000';

export const fetchData = async () => {
  const requestData = {
    from_date: '2023-05-30',
    to_date: '2023-05-31',
    limit: '100',
    offset: '50',
    token: '690a2df92e9f16c5e9e25ed2608aa610b9d8abf5ef995fd12b3352c632c8cb34',
  };

  try {
    const response = await axios.post<any>(`${API_URL}/asr_list`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { rc, records, records_count } = response.data;

    let idCounter = 1;
    const formattedRecords: Record[] = records.map((record: any) => {
      const persianDate = moment(record.date, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');

      return {
        id: idCounter++,
        date: persianDate,
        time: record.time,
        uniqueid: record.uniqueid,
        call_type: record.call_type,
        speaker: record.speaker,
        duration: record.duration,
        recordingfile: record.recordingfile,
        src: record.src,
        dst: record.dst,
      };
    });

    console.log(formattedRecords);

    return {
      rc,
      records: formattedRecords,
      records_count,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
