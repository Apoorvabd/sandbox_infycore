import app from "./app.js";

const PORT = process.env.PORT || 4000;
console.log(
    `Mock Bank server is on now`
);
app.listen(PORT, () => {
    console.log(
        `Mock Bank Server Running On Port ${PORT}`
    );
});
