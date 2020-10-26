import request from "@/utils/request";

export const test = (params) => request.get("/api/users/test", params);

export const test_post = (params) =>
    request.post("/api/users/test/post", params, {
        header: {
            "Content-Type": "application/json",
        },
    });
