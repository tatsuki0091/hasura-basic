import { graphql } from "msw";
export const handlers = [
  graphql.query("GetUsers", (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3",
            name: "Test user A",
            created_at: "2021-12-03T19:59:56.094014+00:00",
          },
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d2",
            name: "Test user B",
            created_at: "2021-12-03T19:58:56.094014+00:00",
          },
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d1",
            name: "Test user C",
            created_at: "2021-12-03T19:57:56.094014+00:00",
          },
        ],
      })
    );
  }),

  graphql.query("GetUserIDs", (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3",
          },
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d2",
          },
          {
            __typenamd: "users",
            id: "9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d1",
          },
        ],
      })
    );
  }),
];
