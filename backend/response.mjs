export default function response(statusCode, data, message, res) {
    res.json({
        status: statusCode,
        data: [{
            data,
            message,
            metadata: {
                prev: "",
                next: "",
                current: ""
            },
        }],
    });
}
