let a = [
  {
    id: 1,
    title: "만두",
    picture: "url",
    gps: "21,22",
    content: "만두찐빵",
    write_date: "2022-12-01 09:00:00",
    createdAt: "2022-05-05 22:25:16",
    updatedAt: "2022-05-05 22:25:16",
    trip_id: 1,
    hashtags: ["맛있다"],
  },
  {
    id: 2,
    title: "과자",
    picture: "url",
    gps: "21,22",
    content: "새우깡",
    write_date: "2022-12-01 09:00:00",
    createdAt: "2022-05-05 22:25:33",
    updatedAt: "2022-05-05 22:25:33",
    trip_id: 1,
    hashtags: ["맛있다", "새우새우"],
  },
  {
    id: 3,
    title: "과자는새우깡",
    picture: "url",
    gps: "21,22",
    content: "새우깡은갈매기꺼",
    write_date: "2022-12-01 09:00:00",
    createdAt: "2022-05-05 22:26:02",
    updatedAt: "2022-05-05 22:26:02",
    trip_id: 1,
    hashtags: ["맛있다", "새우새우", "냠"],
  },
  {
    id: 4,
    title: "새우깡은과자",
    picture: "url",
    gps: "21,22",
    content: "새우깡은갈매기꺼",
    write_date: "2022-12-01 09:00:00",
    createdAt: "2022-05-06 10:41:22",
    updatedAt: "2022-05-06 10:41:22",
    trip_id: 1,
    hashtags: ["맛있다", "새우새우", "냠"],
  },
  {
    id: 5,
    title: "과일먹자",
    picture: "url",
    gps: "21,22",
    content: "새우깡은갈매기꺼",
    write_date: "2022-12-01 09:00:00",
    createdAt: "2022-05-06 10:41:48",
    updatedAt: "2022-05-06 10:41:48",
    trip_id: 1,
    hashtags: ["맛있다", "새우새우", "냠"],
  },
];
console.log(a.map((ele) => ele.id));
