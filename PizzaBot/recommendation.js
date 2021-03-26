const dfd = require("danfojs-node")

let data = dfd.read_csv("./menus.csv");

let df = new dfd.DataFrame(data)

let sub_df = df.head(2);
//iloc({ rows: ["0:5"], columns: ["IdMeal", "Meal"] })
sub_df.print()

/*
let data = { "Name": ["Apples", "Mango", "Banana", "Pear"],
            "Count": [21, 5, 30, 10],
            "Price": [200, 300, 40, 250] }

let df = new dfd.DataFrame(data)
let s_df = df.head(2)
s_df.print()
*/