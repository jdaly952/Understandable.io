fetch("http://127.0.0.1:3000/api/axiom", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({concept: "test"})
}).then(async r => {
  console.log("Status:", r.status);
  console.log("Body:", await r.text());
}).catch(console.error);
